import { dataAccessProducts } from './data-access-products';

describe('dataAccessProducts', () => {
  it('should work', () => {
    expect(dataAccessProducts()).toEqual('data-access-products');
  });
});
