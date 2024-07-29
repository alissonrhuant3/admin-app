import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import customerReducer from "../features/customers/customerSlice";
import productReducer from "../features/product/productSlice";
import brandReducer from "../features/brand/brandSlice";
import pCategoriesReducer from "../features/pcategory/pcategorySlice";
import bCategoriesReducer from "../features/bcategory/bcategorySlice";
import colorReducer from "../features/color/colorSlice";
import blogReducer from "../features/blog/blogSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    customer: customerReducer,
    product: productReducer,
    brand: brandReducer,
    pCategory: pCategoriesReducer,
    bCategory: bCategoriesReducer,
    color: colorReducer,
    blog: blogReducer,
  },
});
