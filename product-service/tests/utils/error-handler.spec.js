import { handleError } from '../../utils/error-handler.js';
import { createJsonResponse } from '../../utils/create-json-response.js';
jest.mock('../../utils/create-json-response');

const callback = jest.fn();

beforeEach(() => {
  createJsonResponse.mockClear();
  
});

it('should call createJsonResponse function with error text and status code returned by server', () => {
  handleError({
    response: { 
      statusCode: 404,
      statusText: 'not found'
    }
  },
  callback);

  expect(callback.mock.calls[0][0]).toBe(null);
  expect(createJsonResponse).toHaveBeenCalledWith({ message: 'not found' }, 404);
});

it('should pass unknown error to the next callback', () => {
  handleError({}, callback);

  expect(callback).toHaveBeenCalledWith({ 'message': 'something terribly wrong has happened' });
});