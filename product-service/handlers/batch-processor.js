import { SNS } from 'aws-sdk';
import * as productService from '../services/products.service';
import { createJsonResponse } from '../utils/create-json-response';

export const catalogBatchProcess = async ({ Records }) => {
  console.log('processing', Records.length, 'records ...');

  try {

    for (const record of Records) {
      const product = JSON.parse(record.body);
      console.log('creating product', product);
      await productService.createProduct(product);
    }

    const sns = new SNS({ region: 'eu-west-1' });

    const isSent = await sns.publish({
      Subject: 'Bulk product creation',
      Message: `Created ${Records.length} products.`,
      TopicArn: process.env.SNS_ARN
    }).promise()

    console.log('email was sent', isSent);
    console.log('processed', Records.length);
    return createJsonResponse({});
  } catch (e) {
    console.log('batch processor error', e);
    return e;
  }
}