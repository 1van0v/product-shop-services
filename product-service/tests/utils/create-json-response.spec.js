import { createJsonResponse } from '../../utils/create-json-response';

it('should return 200 status code', () => {
  expect(createJsonResponse({ test: 'test' })).toEqual({
    body: JSON.stringify({ test: "test" }),
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
      'Content-Type': 'application/json'
    },
    statusCode: 200,
  })
})

it('should set specified status code', () => {
  expect(createJsonResponse({ test: 123 }, 404)).toEqual({
    body: JSON.stringify({ test: 123 }),
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
      'Content-Type': 'application/json'
    },
    statusCode: 404,
  })
})