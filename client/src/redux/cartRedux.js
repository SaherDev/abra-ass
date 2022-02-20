import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartId: null,
    isLoading: false,
    error: false,
    products: [],
    quantity: 0,
    total: 0,
  },
  reducers: {
    addProduct: (state, action) => {
      const index = state.products.findIndex(
        (p) => p._id == action.payload._id
      );

      if (index != -1) {
        state.products[index].quantity++;
      } else {
        state.products.push(action.payload);
      }
      state.quantity += 1;
      state.total += action.payload.price * action.payload.quantity;
    },

    refreshCart: (state) => {
      state.quantity = 0;
      state.products = [];
      state.total = 0;
    },

    updateCartStart: (state) => {
      state.isLoading = true;
      state.error = false;
    },
    updateCartSuccess: (state, action) => {
      state.isLoading = false;
      state.products = action.payload.products;
      state.quantity = action.payload.quantity;
      state.total = action.payload.total;
      state.cartId = action.payload._id;
    },
    updateCartFailure: (state) => {
      state.isLoading = false;
      state.error = true;
    },
  },
});

export const {
  addProduct,
  refreshCart,
  updateCartStart,
  updateCartSuccess,
  updateCartFailure,
} = cartSlice.actions;
export default cartSlice.reducer;
