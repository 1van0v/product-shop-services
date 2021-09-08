import { createJsonResponse } from './create-json-response';

export const handleError = (error, callback) => {
  console.error('error', JSON.stringify(error));
  if (error.statusCode) {
    const { statusCode, message } = error;
    callback(null, createJsonResponse({ message }, statusCode));
  } else {
    callback({
      'message': 'something terribly wrong has happened'
    });
  }
}