import { configureStore} from "@reduxjs/toolkit";
import productReducer from './reducers/productReducer'
import userReducer from "./reducers/userReducer";
import orderReducer from "./reducers/orderReducer";
import categoryReducer from "./reducers/categoryReducer";

export const store = configureStore({
    reducer:{
      user: userReducer,
      product: productReducer,
      order: orderReducer,
      category: categoryReducer
    },
})

