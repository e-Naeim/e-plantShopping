import { describe, it, expect } from 'vitest';
import reducer, { addItem, removeItem, updateQuantity } from './CartSlice';
const snake = { name: 'Snake Plant', price: 15 };
describe('cart reducers', () => {
  it('initializes an empty cart', () => expect(reducer(undefined, { type: 'init' })).toEqual({ items: [] }));
  it('adds once even when rapidly dispatched twice', () => {
    const state = reducer(reducer(undefined, addItem(snake)), addItem(snake));
    expect(state.items).toEqual([{ ...snake, quantity: 1 }]);
  });
  it('updates quantities and removes an item at zero', () => {
    let state = reducer(undefined, addItem(snake));
    state = reducer(state, updateQuantity({ name: snake.name, quantity: 3 }));
    expect(state.items[0].quantity).toBe(3);
    state = reducer(state, updateQuantity({ name: snake.name, quantity: 0 }));
    expect(state.items).toEqual([]);
  });
  it('rejects negative, fractional and non-number quantities', () => {
    const state = reducer(undefined, addItem(snake));
    for (const quantity of [-1, 1.5, NaN, '2']) expect(reducer(state, updateQuantity({ name: snake.name, quantity }))).toEqual(state);
  });
  it('deletes only the selected item and permits re-adding it', () => {
    let state = reducer(reducer(undefined, addItem(snake)), addItem({ name: 'Mint', price: 12 }));
    state = reducer(state, removeItem(snake.name));
    expect(state.items.map(i => i.name)).toEqual(['Mint']);
    state = reducer(state, addItem(snake));
    expect(state.items).toHaveLength(2);
  });
});
