import { getProductsList } from '../../handlers/products-list';
import { getList } from '../../utils/vehicle';
import { createJsonResponse } from '../../utils/create-json-response.js';
import { handleError } from '../../utils/error-handler.js'

jest.mock('../../utils/vehicle.js');
jest.mock('../../utils/create-json-response.js');
jest.mock('../../utils/error-handler.js');

const callback = jest.fn();

it('should pass obtained data to the callback', async () => {
  getList.mockResolvedValue('testValue');
  await getProductsList({}, {}, callback);

  expect(getList).toHaveBeenCalled();
  expect(callback.mock.calls[0][0]).toBe(null);
  expect(createJsonResponse).toHaveBeenCalledWith('testValue');
});

it('should pass error to the callback', async () => {
  getList.mockRejectedValue({ error: 'test' });
  await getProductsList({}, {}, callback);

  expect(getList).toHaveBeenCalled();
  expect(handleError).toHaveBeenCalledWith({ error: 'test' }, callback);
});

afterEach(() => {
  callback.mockReset();
});