import { createSlice } from "@reduxjs/toolkit";
import { getImageUrl } from "../utils/imageUtils";

const cartSlice = createSlice({
  name: "cartSlice",
  initialState: {
    cart: [],
  },
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload.attributes;

      const curItem = product
        ? {
            title: product.title,
            key: product.key,
            price: product.price,
            image: getImageUrl(product.image),
          }
        : action.payload;

      const index = state.cart.findIndex((item) => item.key === curItem.key);

      if (index === -1) {
        state.cart.push({ ...curItem, quantity: 1 });
      } else {
        state.cart[index].quantity += 1;
      }
    },
    removeFromCart: (state, action) => {
      const product = action.payload.attributes;

      const curItem = product
        ? {
            title: product.title,
            key: product.key,
            price: product.price,
            image: getImageUrl(product.image),
          }
        : action.payload;

      const index = state.cart.findIndex((item) => item.key === curItem.key);

      if (index !== -1) {
        if (state.cart[index].quantity === 1) {
          state.cart = state.cart.filter((item) => item.key !== curItem.key);
        } else {
          state.cart[index].quantity -= 1;
        }
      }
    },

    removeCartItems: (state, action) => {
      const product = action.payload;

      state.cart = state.cart.filter((item) => item.key !== product.key);
    },
    resetCart: (state, action) => {
      state.cart = [];
    },
  },
});

export default cartSlice.reducer;

export const { addToCart, removeFromCart, resetCart, removeCartItems } =
  cartSlice.actions;
