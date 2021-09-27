import { BUCKET } from '../constants';
import { s3 } from '../services/s3.service';

export const importProductsFile = async (event) => {
  const fileName = event.queryStringParameters.name;
  const uploadPath = `uploaded/${fileName}`;

  console.log('file to upload', fileName);

  const uploadParameters = {
    Bucket: BUCKET,
    Key: uploadPath,
    Expires: 60,
    ContentType: 'text/csv'
  };

  return new Promise((resolve, reject) => {
    s3.getSignedUrl('putObject', uploadParameters, (error, url) => {
      if (error) {
        console.log('error', error);
        return reject(error);
      }

      console.log('upload url', url);

      resolve({
        statusCode: 202,
        headers: { 'Access-Control-Allow-Origin': '*' },
        body: url
      });
    });
  });
}