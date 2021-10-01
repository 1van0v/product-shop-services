import AWS from 'aws-sdk';

export const s3 = new AWS.S3({ region: 'eu-west-1' });