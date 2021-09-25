import { createJsonResponse } from '../utils/create-json-response';
import { handleError } from '../utils/error-handler.js';
import * as productsService from '../services/products.service';

export const getProductsList = async (event, context, callback) => {
  try {
    const data = await productsService.getProducts();
    callback(null, createJsonResponse(data));
  } catch(e) {
    handleError(e, callback);
  }
};
