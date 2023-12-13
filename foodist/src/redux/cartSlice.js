import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
  totalAmount: 0,
  totalQty: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.cartItems.find(
        (item) => item.id === newItem.id
      );
      state.totalQty++;
      if (!existingItem) {
        state.cartItems.push({
          id: newItem.id,
          name: newItem.name,
          price: newItem.price,
          quantity: 1,
          image: newItem.image,
        });
      } else {
        existingItem.quantity++;
        existingItem.totalPrice =
          Number(existingItem.Price) + Number(newItem.price);
      }
      state.totalAmount = state.cartItems.reduce((total, item) => {
        return total + Number(item.price) * Number(item.quantity);
      }, 0);
    },
    deleteItem: (state, action) => {
      const id = action.payload;
      const exist = state.cartItems.find((item) => item.id === id);

      if (exist) {
        state.cartItems = state.cartItems.filter((item) => item.id !== id);
        state.totalAmount = state.cartItems.reduce((total, item) => {
          return total + Number(item.price) * Number(item.quantity);
        }, 0);
        state.totalQty = state.totalQty - exist.quantity;
      }
    },
  },
});

export const cartActions = cartSlice.actions;

export default cartSlice.reducer;
