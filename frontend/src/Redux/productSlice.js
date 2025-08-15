import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosClient } from "../utils/axiosClient";
import { getProductFilters } from "./productHelper";

export const fetchProducts = createAsyncThunk("api/products", async (payload) => {
  try {
    const filters = getProductFilters(payload);
    const res = await axiosClient.get("/products", { params: filters });
    return res?.data?.data || {};
  } catch (e) {
    return Promise.reject(e);
  }
});

const productSlice = createSlice({
  name: "productSlice",
  initialState: {
    products: [],
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.products = action.payload;
    });
  },
});
export default productSlice.reducer;
