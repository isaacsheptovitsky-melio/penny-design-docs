#!/usr/bin/env tsx
/**
 * Syncs assets from a versioned S3 directory to the latest directory
 * This script copies assets from s3://bucket/assets/{version} to s3://bucket/assets/latest
 *
 * Usage:
 *   yarn sync-latest-assets --version 1.2.3 --bucket penny-static
 *   yarn sync-latest-assets --version 1.2.3 --bucket penny-static --region us-west-2
 *   tsx scripts/sync-latest-assets.ts --version 1.2.3 --bucket penny-static --region us-west-2
 */

/* eslint-disable no-console, import/no-extraneous-dependencies */

import { S3SyncClient } from 's3-sync-client';

import { CommonOptions, createS3Client, parseCommonArguments, verifyBucketAccess } from './utils';

type SyncOptions = CommonOptions;

/**
 * Parse arguments for sync-latest-assets script
 */
const parseSyncArguments = (): SyncOptions => {
  const args = process.argv.slice(2);
  const commonOptions = parseCommonArguments(args);
  const options: Partial<SyncOptions> = { ...commonOptions };

  for (let i = 0; i < args.length; i += 2) {
    const flag = args[i];

    switch (flag) {
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
      'Usage: tsx scripts/sync-latest-assets.ts --version 1.2.3 --bucket penny-static [--region us-east-1] [--profile my-profile]'
    );
    process.exit(1);
  }

  return {
    version: options.version,
    bucket: options.bucket,
    region: options.region || 'us-east-1',
    profile: options.profile,
    dryRun: options.dryRun || false,
  };
};

/**
 * Sync versioned assets directory to latest directory in S3
 */
const syncVersionToLatest = async (options: SyncOptions): Promise<void> => {
  const SOURCE_S3_PATH = `s3://${options.bucket}/assets/${options.version}`;
  const TARGET_S3_PATH = `s3://${options.bucket}/assets/latest`;

  console.log(`📁 Syncing ${SOURCE_S3_PATH} to ${TARGET_S3_PATH}`);
  console.log('');

  const s3Client = createS3Client(options.region, options.profile);

  await verifyBucketAccess(s3Client, options.bucket);

  const s3SyncClient = new S3SyncClient({ client: s3Client });

  try {
    console.log('🚀 Starting sync from versioned directory to latest...');

    // Sync from versioned directory to latest directory
    await s3SyncClient.sync(SOURCE_S3_PATH, TARGET_S3_PATH, {
      dryRun: options.dryRun,
      del: true, // Delete files in target that don't exist in source
    });

    console.log('');
    console.log('✅ Assets synced to latest successfully!');
    console.log(`📍 Source: ${SOURCE_S3_PATH}`);
    console.log(`📍 Target: ${TARGET_S3_PATH}`);
  } catch (error) {
    console.error('❌ Sync failed:', error);
    process.exit(1);
  }
};

/**
 * Main sync function
 */
const main = async (): Promise<void> => {
  const options = parseSyncArguments();

  console.log('🚀 Starting sync to latest assets...');
  console.log(`📋 Configuration:`);
  console.log(`   Version: ${options.version}`);
  console.log(`   Bucket: ${options.bucket}`);
  console.log(`   Region: ${options.region}${options.region === 'us-east-1' ? ' (default)' : ''}`);
  console.log(`   Profile: ${options.profile || '(profile)'}`);
  console.log(`   Dry run: ${options.dryRun ? 'Yes' : 'No'}`);
  console.log('');

  await syncVersionToLatest(options);
};

// Run the script
main().catch((error) => {
  console.error('❌ Sync to latest failed:', error);
  process.exit(1);
});
