import { configureStore } from "@reduxjs/toolkit";
import auth from "./AUTH/Auth";
import ProductReducer from "./PRODUCT/ProductSlice";
import FilterReducer from "./PRODUCT/FilterSlice";
export const store = configureStore({
  reducer: {
    auth: auth,
    product: ProductReducer,
    filter: FilterReducer,
  },
});
