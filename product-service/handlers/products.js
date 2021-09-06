import { createJsonResponse } from '../utils/create-json-response.js';
import { getById } from '../utils/vehicle.js';
import { handleError } from '../utils/error-handler.js'

export const getProductsById = async (event, context, callback) => {
  try {
    const { productId } = event.pathParameters;
    const data = await getById(productId);
    callback(null, createJsonResponse(data));
  } catch(e) {
    handleError(e, callback);
  }
};
