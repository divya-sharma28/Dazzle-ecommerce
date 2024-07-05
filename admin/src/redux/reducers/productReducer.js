import { addProducts, updateProducts, deleteProducts, getproducts, getproduct } from "../actions/productAction";
import {createSlice} from "@reduxjs/toolkit"

const productSlice = createSlice({
    name:"product",
    initialState:{
        products: [],
        pending: false,
        error: null,
        singleProduct:{}
    },
    reducers:{},
    extraReducers:{
        [getproducts.pending]:(state)=>{
            state.pending = true;
            state.error= null
        },
        [getproducts.fulfilled]:(state,action)=>{
            state.pending = false;
            state.products = action.payload
            state.error= null
        },
        [getproducts.rejected]:(state,action)=>{
            state.pending = false;
            state.error= action.payload
        },
        [getproduct.pending]:(state)=>{
            state.pending = true;
            state.error= null
        },
        [getproduct.fulfilled]:(state,action)=>{
            state.pending = false;
            state.singleProduct = action.payload
            state.error= null
        },
        [getproduct.rejected]:(state,action)=>{
            state.pending = false;
            state.error= action.payload
        },

        [deleteProducts.pending]:(state)=>{
            state.pending = true;
            state.error= null

        },
        [deleteProducts.fulfilled]:(state,action)=>{
            // console.log(action.payload,"action.payload")
            state.pending = false;
            const id = action.payload._id
            state.products = state.products.filter(val => val._id !== id);
            state.error= null
        },
        [deleteProducts.rejected]:(state,action)=>{
            state.pending = false;
            state.error= action.payload
        },
        
        [updateProducts.pending]:(state)=>{
            state.pending = true;
            state.error= null
        },
        [updateProducts.fulfilled]:(state,action)=>{
            // console.log(action.payload,"action.payload")
            state.pending = false;
            state.products[
                state.products.findIndex(item => item._id === action.payload.id)
            ] = action.payload.product;
            state.error= null;
        },

        [updateProducts.rejected]:(state,action)=>{
            state.pending = false;
            state.error= action.payload
        },
 
        [addProducts.pending]:(state)=>{
            state.pending = true;
            state.error= null

        },
        [addProducts.fulfilled]:(state,action)=>{
            console.log(action.payload,"action.payload")
            state.pending = false;
            state.products.push(action.payload);
            state.error= null


        },
        [addProducts.rejected]:(state,action)=>{
            state.pending = false;
            state.error= action.payload
        },
    }
})


export default productSlice.reducer;