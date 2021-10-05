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

    console.log('processed', Records.length);
    return createJsonResponse({});
  } catch (e) {
    return e;
  }
}