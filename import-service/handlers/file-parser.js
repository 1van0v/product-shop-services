import csv from 'csv-parser';

import { s3 } from '../services/s3.service';

export const importFileParser = async (event) => {
  for (const record of event.Records) {
    // const s3 = new AWS.S3({ region: 'eu-west-1' });
    const uploadedFile = decodeURIComponent(record.s3.object.key);
    const parsedFile = uploadedFile.replace('uploaded', 'parsed');
    const bucketName = record.s3.bucket.name;

    console.log('copying', uploadedFile, 'to', parsedFile, '...');

    const s3File = s3.getObject({
      Bucket: bucketName,
      Key: uploadedFile
    });

    await new Promise((resolve, reject) => {
      s3File.createReadStream()
        .on('error', reject)
        .pipe(csv())
        .on('data', data => console.log('record =', data))
        .on('end', () => {
          console.log('parsed', uploadedFile);
          resolve();
        });
      });

    await s3
      .copyObject({
        Bucket: bucketName,
        CopySource: bucketName + '/' + uploadedFile,
        Key: parsedFile,
      })
      .promise();

    console.log('copied', uploadedFile, 'to', parsedFile);
    console.log('deleting', uploadedFile, '...');

    await s3
      .deleteObject({
        Bucket: bucketName,
        Key: uploadedFile,
      })
      .promise();

    console.log('deleted', uploadedFile)
  }

  return { statusCode: 204 };
}
