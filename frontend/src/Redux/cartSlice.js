import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cartSlice",
  initialState: {
    cart: [],
  },
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload.attributes;
    //   console.log(product, "add to cart called");
      const curItem = product? {
        title: product.title,
        key: product.key,
        price: product.price,
        image: product.image.data.attributes.url,
      }:action.payload;
      console.log(curItem);
      const index = state.cart.findIndex((item) => item.key === curItem.key);
      console.log(index);
      if (index === -1) {
        state.cart.push({ ...curItem, quantity: 1 });
      } else {
        state.cart[index].quantity += 1;
        console.log(state.cart[index].quantity);
      }
      // console.log(state.cart);
    },
    removeFromCart: (state, action) => {
      const product = action.payload.attributes;
      console.log(product, "remove from cart called");
      const curItem = product?{
        title: product.title,
        key: product.key,
        price: product.price,
        image: product.image.data.attributes.url,
      }:action.payload;
      console.log(curItem);
      const index = state.cart.findIndex((item) => item.key === curItem.key);
      console.log(index);
      if(index!==-1){
        if(state.cart[index].quantity===1){
            state.cart = state.cart.filter((item) => item.key !== curItem.key);
        }
        else{
            state.cart[index].quantity -= 1;
            console.log(state.cart[index].quantity);
        }
      }

    },
    //remove cartItems
    removeCartItems:(state,action)=>{
      const product=action.payload
      
      state.cart=state.cart.filter((item)=>item.key!==product.key)
    },
    resetCart:(state,action)=>{
      state.cart=[]
    }
  },
});

export default cartSlice.reducer;

export const { addToCart, removeFromCart,resetCart,removeCartItems } = cartSlice.actions;
