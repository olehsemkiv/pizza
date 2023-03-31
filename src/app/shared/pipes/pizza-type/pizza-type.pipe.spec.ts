import { PizzaTypePipe } from './pizza-type.pipe';

describe('PizzaTypePipe', () => {
  it('create an instance', () => {
    const pipe = new PizzaTypePipe();
    expect(pipe).toBeTruthy();
  });
});
