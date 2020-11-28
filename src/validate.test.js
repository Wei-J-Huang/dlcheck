const { validProtocol, validComment } = require('./validate');

describe('ignore url tests', () => {
  test('url with http or https protocol should return true', () => {
    const link = 'https://randomurl.com';
    expect(validProtocol(link)).toBe(true);
  });

  test('url with non-http and non-https protocol should return false', () => {
    const link = 'www.randomurl.com';
    expect(validProtocol(link)).toBe(false);
  });

  test('empty line should result the validComment to return false', () => {
    const emptyLine = '';
    expect(validComment(emptyLine)).toBe(false);
  });

  test(`line which does not start with '#' should result the validComment to return false`, () => {
    const invalidLine = 'random text that does not start with #';
    expect(validComment(invalidLine)).toBe(false);
  });

  test(`line which start with '#' should result the validComment to return true`, () => {
    const validLine = '#random text that starts with #';
    expect(validComment(validLine)).toBe(true);
  });
});
