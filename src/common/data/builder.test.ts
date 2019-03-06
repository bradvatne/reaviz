import { isNested } from './builder';

describe('Builder', () => {

  it('it should infer nested object', () => {
    const is = isNested({
      key: 1,
      data: []
    });

    expect(is).toBe(true);
  });

});
