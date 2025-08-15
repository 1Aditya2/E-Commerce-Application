import { combineReducers, configureStore } from "@reduxjs/toolkit";
import categoryReducer from "./categorySlice";
import cartReducer from "./cartSlice";
import productReducer from './productSlice';
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import thunk from "redux-thunk";
const rootReducer = combineReducers({
  categoryReducer,
  cartReducer,
  productReducer
});
const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
});

export const persistor = persistStore(store);
