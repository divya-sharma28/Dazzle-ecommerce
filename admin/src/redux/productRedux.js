import {createSlice} from "@reduxjs/toolkit"

const productSlice = createSlice({
    name:"product",
    initialState:{
        products: [],
        pending: false,
        error: false
    },
    reducers:{
        getProductStart:(state)=>{
            state.pending = true;
            state.error= false

        },
        getProductSuccess:(state,action)=>{
            state.pending = false;
            state.products = action.payload

        },
        getProductFailure:(state)=>{
            state.pending = false;
            state.error= true
        },

        deleteProductStart:(state)=>{
            state.pending = true;
            state.error= false

        },
        deleteProductSuccess:(state,action)=>{
            console.log(action.payload,"action.payload")
            state.pending = false;
            state.products.splice(
                state.products.findIndex((item)=>item._id === action.payload), 1
            )

        },
        deleteProductFailure:(state)=>{
            state.pending = false;
            state.error= true
        },
        
        updateProductStart:(state)=>{
            state.pending = true;
            state.error= false

        },
        updateProductSuccess:(state,action)=>{
            console.log(action.payload,"action.payload")
            state.pending = false;
            state.products[
                state.products.findIndex(item => item._id === action.payload.id)
            ] = action.payload.product

        },
        updateProductFailure:(state)=>{
            state.pending = false;
            state.error= true
        },

        addProductStart:(state)=>{
            state.pending = true;
            state.error= false

        },
        addProductSuccess:(state,action)=>{
            console.log(action.payload,"action.payload")
            state.pending = false;
            state.products.push(action.payload)

        },
        addProductFailure:(state)=>{
            state.pending = false;
            state.error= true
        },
    }
})

export const {  
    getProductStart,
    getProductSuccess,
    getProductFailure,
    deleteProductStart,
    deleteProductSuccess,
    deleteProductFailure,
    updateProductStart,
    updateProductSuccess,
    updateProductFailure,
    addProductFailure,
    addProductSuccess,
    addProductStart
    }
    = productSlice.actions;
export default productSlice.reducer;