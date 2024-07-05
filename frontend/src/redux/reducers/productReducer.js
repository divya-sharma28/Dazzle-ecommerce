import { createSlice } from "@reduxjs/toolkit";
import { getProducts } from "../actions/productAction";


const productSlice = createSlice({
    name:"product",
    initialState:{
        loading: false,
        error: null,
        products:[],
        searched:''
    },
    reducers:{
        searchProduct: (state,action)=>{
            state.searched = action.payload
           }
    },
    extraReducers:{
        [getProducts.pending]:(state)=>{
            state.loading = true
        },
        [getProducts.fulfilled]:(state, action)=>{
            state.loading = false;
            state.products = action.payload
        },
        [getProducts.rejected]:(state, action)=>{
            state.loading = false,
            state.error = action.payload
        },
    }
})

export const { searchProduct } = productSlice.actions
export default productSlice.reducer;