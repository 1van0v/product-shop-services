import { getList } from '../utils/vehicle.js';
import { createJsonResponse } from '../utils/create-json-response';
import { handleError } from '../utils/error-handler.js';

export const getProductsList = async (event, context, callback) => {
  try {
    const data = await getList();
    callback(null, createJsonResponse(data));
  } catch(e) {
    handleError(e, callback);
  }
};
