#!/usr/bin/env tsx
/**
 * Uploads penny-assets to S3 bucket using AWS SDK
 *
 * Usage:
 *   yarn run upload-assets --version 1.2.3 --bucket penny-static
 *   yarn run upload-assets --version 1.2.3 --bucket penny-static --asset-dir src/assets
 *   yarn run upload-assets --version 1.2.3 --bucket penny-static --asset-dir src/assets --region us-west-2
 *   yarn run upload-assets --version 1.2.3 --bucket penny-static --asset-dir src/assets --profile my-aws-profile
 *   tsx scripts/upload-assets.ts --version 1.2.3 --bucket penny-static --asset-dir src/assets --region us-west-2 --profile my-aws-profile
 *
 * Required arguments:
 *   --version: Version number for the assets
 *   --bucket: S3 bucket name
 *
 * Optional arguments:
 *   --asset-dir: Path to the assets directory (defaults to "src/assets")
 *   --region: AWS region (defaults to "us-east-1")
 */

/* eslint-disable no-console, import/no-extraneous-dependencies */

import { PutObjectCommandInput } from '@aws-sdk/client-s3';
import { existsSync } from 'fs';
import * as mime from 'mime-types';
import path from 'path';
import { S3SyncClient } from 's3-sync-client';

import { CommonOptions, createS3Client, parseCommonArguments, verifyBucketAccess } from './utils';

type UploadOptions = CommonOptions & {
  assetDir: string;
};

/**
 * Parse arguments for upload-assets script
 */
const parseUploadArguments = (): UploadOptions => {
  const args = process.argv.slice(2);
  const commonOptions = parseCommonArguments(args);
  const options: Partial<UploadOptions> = { ...commonOptions };

  for (let i = 0; i < args.length; i += 2) {
    const flag = args[i];
    const value = args[i + 1];

    switch (flag) {
      case '--asset-dir':
        options.assetDir = value;
        break;
      case '--version':
      case '--bucket':
      case '--region':
      case '--profile':
      case '--dry-run':
        // Already handled by parseCommonArguments
        if (flag === '--dry-run') i -= 1;
        break;
      default:
        console.error(`❌ Unknown flag: ${flag}`);
        process.exit(1);
    }
  }

  if (!options.version || !options.bucket) {
    console.error('❌ Missing required arguments');
    console.error(
      'Usage: tsx scripts/upload-assets.ts --version 1.2.3 --bucket penny-static [--asset-dir src/assets] [--region us-east-1] [--profile my-profile]'
    );
    process.exit(1);
  }

  return {
    version: options.version,
    bucket: options.bucket,
    region: options.region || 'us-east-1',
    assetDir: options.assetDir || 'src/assets',
    profile: options.profile,
    dryRun: options.dryRun || false,
  };
};

/**
 * Sync assets directory to S3
 */
const syncToS3 = async (options: UploadOptions, assetsDir: string): Promise<void> => {
  const S3_PATH = `s3://${options.bucket}/assets/${options.version}`;

  console.log(`📁 Syncing ${assetsDir} to ${S3_PATH}`);
  console.log('');

  if (options.dryRun) {
    console.log('🔍 Dry run - would sync assets directory to S3');
    console.log(`   Local: ${assetsDir}`);
    console.log(`   S3: ${S3_PATH}`);
    console.log('');
    console.log('✅ Dry run completed successfully');
    return;
  }

  // Initialize S3 client
  const s3Client = createS3Client(options.region, options.profile);

  // Verify bucket access
  await verifyBucketAccess(s3Client, options.bucket);

  // Initialize S3 sync client
  const s3SyncClient = new S3SyncClient({ client: s3Client });

  try {
    console.log('🚀 Starting sync...');

    // Sync directory to S3
    await s3SyncClient.sync(assetsDir, S3_PATH, {
      dryRun: options.dryRun,
      del: true, // Delete files in S3 that don't exist locally
      commandInput: (input: Partial<PutObjectCommandInput>): Partial<PutObjectCommandInput> => {
        const s3Key = input.Key || '';
        let contentType: string | undefined = undefined;

        if (s3Key.endsWith('.svg')) {
          contentType = 'image/svg+xml';
        } else {
          // For other files, let mime-types try to determine or fallback to aws default
          contentType = mime.lookup(s3Key) || 'application/octet-stream';
        }

        return {
          ...input,
          ContentType: contentType,
        };
      },
    });

    console.log('');
    console.log('✅ Assets synced successfully!');
    console.log(`📍 S3 location: ${S3_PATH}`);
  } catch (error) {
    console.error('❌ Sync failed:', error);
    process.exit(1);
  }
};

/**
 * Main upload function
 */
const main = async (): Promise<void> => {
  const options = parseUploadArguments();

  const assetDir = path.resolve(options.assetDir);

  console.log('🚀 Starting asset upload...');
  console.log(`📋 Configuration:`);
  console.log(`   Version: ${options.version}`);
  console.log(`   Bucket: ${options.bucket}`);
  console.log(`   Region: ${options.region}${options.region === 'us-east-1' ? ' (default)' : ''}`);
  console.log(`   Assets Dir: ${assetDir}`);
  console.log(`   Profile: ${options.profile || '(profile)'}`);
  console.log(`   Dry run: ${options.dryRun ? 'Yes' : 'No'}`);
  console.log('');

  if (!existsSync(assetDir)) {
    console.error(`❌ Assets directory '${assetDir}' does not exist`);
    process.exit(1);
  }

  await syncToS3(options, assetDir);
};

// Run the script
main().catch((error) => {
  console.error('❌ Upload failed:', error);
  process.exit(1);
});
