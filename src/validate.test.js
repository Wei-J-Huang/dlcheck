const { validProtocol } = require('./validate');

describe('ignore url tests', () => {
  test('url with http or https protocol should return true', () => {
    const link = 'https://randomurl.com';
    expect(validProtocol(link)).toBe(true);
  });

  test('url with non-http and non-https protocol should return false', () => {
    const link = 'www.randomurl.com';
    expect(validProtocol(link)).toBe(false);
  });
});
