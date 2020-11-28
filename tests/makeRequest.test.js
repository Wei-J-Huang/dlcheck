const nock = require('nock');
const { requestUrl } = require('../src/makeRequest');

describe('makeRequest tests', () => {
  test('active servers should respond with status code of 200', () => {
    const link = 'https://activemockurl.com';
    nock(link).get('/').reply(200);
    return requestUrl(link).then((statusCode) => {
      expect(statusCode).toBe(200);
    });
  });

  test('inactive servers should respond with status code of 404 or 400', () => {
    const link = 'https://inactivemockurl.com';
    nock(link).get('/').reply(404);
    return requestUrl(link).then((statusCode) => {
      expect(statusCode).toBe(404);
    });
  });

  test('server ETIMEOUT should result in a promise reject with ETIMEOUT message', () => {
    const link = 'https://etimeoutmockurl.com';
    nock(link).get('/').replyWithError('ETIMEOUT');
    return requestUrl(link).catch((err) => {
      expect(err).toBe('ETIMEOUT');
    });
  });
});
