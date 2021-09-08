export const createJsonResponse = (data, statusCode = 200) => (
  {
    statusCode,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
      'Access-Control-Allow-Methods': 'OPTIONS,POST,GET',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }
)