import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./reducers/cartReducer";
import userReducer from "./reducers/userReducer";
import wishReducer from "./reducers/wishReducer";
import productReducer from "./reducers/productReducer";


  
export const store = configureStore({
  reducer:{
      cart: cartReducer,
      user: userReducer,
      wish: wishReducer,
      product: productReducer
  },


})