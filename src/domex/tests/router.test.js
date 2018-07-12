import Router from '../src/Router';

describe('Testing router', () => {
  test('Routing', () => {
    const router = new Router();
    router.get('/test', () => null, () => null);
    expect(router.hasRoute('get', '/test')).toBe(true);
    expect(router.getHandlers('get', '/test').length).toBe(1);
  });
});
