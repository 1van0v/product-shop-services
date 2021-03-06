import { createJsonResponse } from '../utils/create-json-response.js';
import * as productsService from '../services/products.service.js';
import { handleError } from '../utils/error-handler.js'

export const getProductsById = async (event, context, callback) => {
  try {
    const { productId } = event.pathParameters;
    const data = await productsService.getProductById(productId);
    if (!data.length) {
      throw { statusCode: 404, message: `${productId} was not found`};
    }
    callback(null, createJsonResponse(data));
  } catch(e) {
    handleError(e, callback);
  }
};
