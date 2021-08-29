import { afterEach, beforeEach, expect, it, jest } from '@jest/globals'
import axios from 'axios'

import { urlToId } from '../../utils/url-to-id.js'
import { getById, getList } from '../../utils/vehicle.js';
jest.mock('../../utils/url-to-id');

let spyGet;

beforeEach(() => {
  spyGet = jest.spyOn(axios, 'get');
});

it('should add specified id to request URL', () => {
  spyGet.mockResolvedValue({ data: { url: '' } });
  getById(191);
  
  expect(spyGet).toHaveBeenCalledWith('https://swapi.dev/api/vehicles/191')
});

it('should send a request to products endpoint', () => {
  spyGet.mockResolvedValue({ data: { results: [] } });
  getList();

  expect(spyGet).toHaveBeenCalledWith('https://swapi.dev/api/vehicles');
});

afterEach(() => {
  spyGet.mockRestore();
  urlToId.mockReset();
})