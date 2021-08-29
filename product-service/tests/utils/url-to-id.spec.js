import { urlToId } from '../../utils/url-to-id';

it('should return id from url', () => {
  expect(urlToId('/test/2/')).toBe('2');
});