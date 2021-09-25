import { createJsonResponse } from '../utils/create-json-response.js';
import * as productsService from '../services/products.service.js';
import { handleError } from '../utils/error-handler.js'

export const createProduct = async (event, context, callback) => {
  try {
    const { image, ...product } = JSON.parse(event.body);
    product.image_url = image;
    const data = await productsService.createProduct(product);
    console.log('product created', data);
    callback(null, createJsonResponse(data));
  } catch(e) {
    handleError(e, callback);
  }
};