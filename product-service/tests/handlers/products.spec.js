import { getProductsById } from '../../handlers/products';
import { getById } from '../../utils/vehicle';
import { createJsonResponse } from '../../utils/create-json-response.js';
import { handleError } from '../../utils/error-handler.js'

jest.mock('../../utils/vehicle.js');
jest.mock('../../utils/create-json-response.js');
jest.mock('../../utils/error-handler.js');

const callback = jest.fn();

it('should pass obtained data to the callback', async () => {
  getById.mockResolvedValue('testValue');
  await getProductsById({ pathParameters: { productId: 1 } }, {}, callback);

  expect(getById).toHaveBeenCalledWith(1);
  expect(callback.mock.calls[0][0]).toBe(null);
  expect(createJsonResponse).toHaveBeenCalledWith('testValue');
});

it('should pass error to the callback', async () => {
  getById.mockRejectedValue({ error: 'test' });
  await getProductsById({ pathParameters: { productId: 2 } }, {}, callback);

  expect(getById).toHaveBeenCalledWith(2);
  expect(handleError).toHaveBeenCalledWith({ error: 'test' }, callback);
});

afterEach(() => {
  callback.mockReset();
});