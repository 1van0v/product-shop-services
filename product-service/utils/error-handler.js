import { createJsonResponse } from './create-json-response';

export const handleError = (error, callback) => {
  if (error.response) {
    const { statusCode, statusText } = error.response;
    callback(null, createJsonResponse({ message: statusText }, statusCode));
  } else {
    callback({
      'message': 'something terribly wrong has happened'
    });
  }
}