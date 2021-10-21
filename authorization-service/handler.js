import dotenv from 'dotenv';

dotenv.config();

const isAllowed = (username, password) => {
  return username === process.env.username && password === process.env.password;
};

export const basicAuthorizer = (event, context, callback) => {
  if (event.type !== 'REQUEST') {
    callback('Unauthorized');
  }

  try {
    const credentials = event.headers.authorization.split(' ')[1];
    const [username, password] = Buffer.from(credentials, 'base64').toString('utf-8').split(':');
    const effect = isAllowed(username, password) ? 'Allow' : 'Deny';

    console.log(effect, 'access for', username);
    console.log('event', JSON.stringify(event));
    const policy = {
      principalId: username,
      policyDocument: {
        Version: '2012-10-17',
        Statement: [
          {
            Action: 'execute-api:Invoke',
            Effect: effect,
            Resource: event.routeArn
          }
        ]
      }
    };

    console.log('policy', JSON.stringify(policy));

    return callback(null, policy)
  } catch (e) {
    console.log('error', e);
    callback(`Unauthorized: ${e.message}`);
  }
};
