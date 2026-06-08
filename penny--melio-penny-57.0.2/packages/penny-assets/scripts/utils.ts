/* eslint-disable no-console, import/no-extraneous-dependencies */

import { HeadBucketCommand, S3Client } from '@aws-sdk/client-s3';

export type CommonOptions = {
  bucket: string;
  region: string;
  version: string;
  profile?: string;
  dryRun?: boolean;
};

/**
 * Verify S3 bucket access
 */
export const verifyBucketAccess = async (s3Client: S3Client, bucket: string): Promise<void> => {
  try {
    console.log(`🔍 Verifying S3 bucket '${bucket}' access...`);
    await s3Client.send(new HeadBucketCommand({ Bucket: bucket }));
    console.log(`✅ S3 bucket '${bucket}' is accessible`);
  } catch (error) {
    console.error(`❌ Cannot access S3 bucket '${bucket}':`, error);
    console.error('Please check your AWS credentials and bucket permissions');
    process.exit(1);
  }
};

/**
 * Create S3 client with region configuration
 */
export const createS3Client = (region: string, profile: string | undefined): S3Client =>
  new S3Client({ region, profile });

/**
 * Parse common command line arguments
 */
export const parseCommonArguments = (args: string[]): Partial<CommonOptions> => {
  const options: Partial<CommonOptions> = {};

  for (let i = 0; i < args.length; i += 2) {
    const flag = args[i];
    const value = args[i + 1];

    switch (flag) {
      case '--version':
        options.version = value;
        break;
      case '--bucket':
        options.bucket = value;
        break;
      case '--region':
        options.region = value;
        break;
      case '--profile':
        options.profile = value;
        break;
      case '--dry-run':
        options.dryRun = true;
        i -= 1; // No value for this flag
        break;
      default:
        // Skip unknown flags - let specific parsers handle them
        break;
    }
  }

  return options;
};
