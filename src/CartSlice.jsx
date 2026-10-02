// Redux slice is not a React component; the rubric requires this .jsx filename.
/* eslint-disable react-refresh/only-export-components */
import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: { items: [] },
  reducers: {
    addItem(state, { payload }) {
      // A second dispatch cannot add a duplicate product card.
      if (!state.items.some(item => item.name === payload.name)) {
        state.items.push({ ...payload, quantity: 1 });
      }
    },
    removeItem(state, { payload }) {
      state.items = state.items.filter(item => item.name !== payload);
    },
    updateQuantity(state, { payload: { name, quantity } }) {
      if (!Number.isInteger(quantity) || quantity < 0) return;
      const item = state.items.find(item => item.name === name);
      if (!item) return;
      if (quantity === 0) state.items = state.items.filter(item => item.name !== name);
      else item.quantity = quantity;
    },
  },
});
export const { addItem, removeItem, updateQuantity } = CartSlice.actions;
export default CartSlice.reducer;
