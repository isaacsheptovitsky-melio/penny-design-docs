import axios, { AxiosRequestConfig, HttpStatusCode } from 'axios';
import axiosRetry from 'axios-retry';
import { readFileSync } from 'fs';

import type { PennyMetadata } from '@/types';

type HeadersRecord = Record<string, string>;

interface CacheEntry {
  data: PennyMetadata;
  timestamp: number;
}

interface GithubRelease {
  name: string;
  published_at: string;
  tag_name: string;
  assets: { name: string; url: string }[];
}

const PENNY_GITHUB_BASE_URL = 'https://api.github.com/repos/melio/penny';
const GITHUB_LIST_RELEASES_URL = `${PENNY_GITHUB_BASE_URL}/releases`;

let cache: CacheEntry | null = null;

const CACHE_TTL_MS = 5 * 60 * 1000;
const REQUEST_TIMEOUT_MS = 10000;
const REQUEST_MAX_REDIRECTS = 5;
const REQUEST_RETRIES = 3;

function isCacheValid(): boolean {
  if (!cache) {
    return false;
  }
  return Date.now() - cache.timestamp < CACHE_TTL_MS;
}

function getGhToken(): string | undefined {
  return process.env['GITHUB_ACCESS_TOKEN'];
}

function getGhHeaders(extra?: HeadersRecord): HeadersRecord {
  const token = getGhToken();
  const headers: HeadersRecord = {
    'User-Agent': 'penny-mcp',
    Accept: 'application/vnd.github+json',
  };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return { ...headers, ...(extra || {}) };
}

const axiosInstance = axios.create({
  timeout: REQUEST_TIMEOUT_MS,
  maxRedirects: REQUEST_MAX_REDIRECTS,
});

axiosRetry(axiosInstance, {
  retries: REQUEST_RETRIES,
  retryDelay: (retryCount) => {
    const baseDelay = Math.min(1000 * Math.pow(2, retryCount - 1), 10000);
    const jitter = Math.random() * 1000;
    return baseDelay + jitter;
  },
  retryCondition: (error: unknown) => {
    if (error && typeof error === 'object' && 'response' in error) {
      const response = (error as { response: { status: number } }).response;
      if (response?.status) {
        const status = response.status;
        return (
          status >= HttpStatusCode.InternalServerError ||
          status === HttpStatusCode.RequestTimeout ||
          status === HttpStatusCode.TooManyRequests
        );
      }
    }
    return true;
  },
});

async function makeRequest<T>(url: string, headers: HeadersRecord = {}): Promise<T> {
  try {
    const config: AxiosRequestConfig = {
      method: 'GET',
      url,
      headers,
    };

    const response = await axiosInstance.request<T>(config);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const status = error.response?.status;
      let message = error.message;

      if (error.response?.data) {
        if (typeof error.response.data === 'string') {
          message = error.response.data;
        } else if (typeof error.response.data === 'object') {
          message = JSON.stringify(error.response.data);
        }
      }
      throw new Error(`HTTP ${status || 'Network Error'} for ${url}: ${message}`);
    }
    throw error;
  }
}

async function fetchRemoteMetadata(): Promise<PennyMetadata> {
  const releases = await makeRequest<GithubRelease[]>(GITHUB_LIST_RELEASES_URL, getGhHeaders());

  if (!Array.isArray(releases) || releases.length === 0) {
    throw new Error('No releases found in melio/penny repository');
  }

  const pennyReleases = releases.filter(
    (release) =>
      release.name.startsWith('@melio/penny@') && release.assets.some((asset) => asset.name === 'metadata.json')
  );

  if (pennyReleases.length === 0) {
    throw new Error('No @melio/penny releases found with metadata.json asset');
  }

  const latestPennyRelease = pennyReleases.sort((a, b) => Date.parse(b.published_at) - Date.parse(a.published_at))[0];

  if (!latestPennyRelease) {
    throw new Error('Failed to find the latest @melio/penny release');
  }

  const metadataAsset = latestPennyRelease.assets.find((asset) => asset.name === 'metadata.json');
  if (!metadataAsset) {
    throw new Error(`No metadata.json asset found in release ${latestPennyRelease.tag_name}`);
  }

  return await makeRequest(metadataAsset.url, getGhHeaders({ Accept: 'application/octet-stream' }));
}

export async function getPennyMetadata(): Promise<PennyMetadata> {
  const overridePath = process.env['METADATA_PATH'];
  if (overridePath && overridePath.length > 0) {
    try {
      const text = readFileSync(overridePath, 'utf8');
      return JSON.parse(text) as PennyMetadata;
    } catch (error) {
      throw new Error(
        `Failed to read metadata from ${overridePath}: ${error instanceof Error ? error.message : String(error)}`
      );
    }
  }

  if (isCacheValid() && cache) {
    return cache.data;
  }

  try {
    const metadata = await fetchRemoteMetadata();

    cache = {
      data: metadata,
      timestamp: Date.now(),
    };

    return metadata;
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    throw new Error(`Failed to fetch Penny metadata from GitHub. Error: ${message}`);
  }
}
