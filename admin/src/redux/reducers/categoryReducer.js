import { addCategory, updateCat, deleteCat, getCategories, getCategory } from "../actions/categoryAction";
import {createSlice} from "@reduxjs/toolkit"

const productSlice = createSlice({
    name:"category",
    initialState:{
        categories: [],
        pending: false,
        error: null,
        singleCategory:{}
    },
    reducers:{},
    extraReducers:{
        [getCategories.pending]:(state)=>{
            state.pending = true;
            state.error= null
        },
        [getCategories.fulfilled]:(state,action)=>{
            state.pending = false;
            state.categories = action.payload
            state.error= null
        },
        [getCategories.rejected]:(state,action)=>{
            state.pending = false;
            state.error= action.payload
        },
        [getCategory.pending]:(state)=>{
            state.pending = true;
            state.error= null
        },
        [getCategory.fulfilled]:(state,action)=>{
            state.pending = false;
            state.singleCategory = action.payload
            state.error= null
        },
        [getCategory.rejected]:(state,action)=>{
            state.pending = false;
            state.error= action.payload
        },

        [deleteCat.pending]:(state)=>{
            state.pending = true;
            state.error= null

        },
        [deleteCat.fulfilled]:(state,action)=>{
            // console.log(action.payload,"action.payload")
            state.pending = false;
            const id = action.payload._id
            state.categories = state.categories.filter(val => val._id !== id);
            state.error= null
        },
        [deleteCat.rejected]:(state,action)=>{
            state.pending = false;
            state.error= action.payload
        },
        
        [updateCat.pending]:(state)=>{
            state.pending = true;
            state.error= null
        },
        [updateCat.fulfilled]:(state,action)=>{
            // console.log(action.payload,"action.payload")
            state.pending = false;
            state.categories[
                state.categories.findIndex(item => item._id === action.payload.id)
            ] = action.payload.category; //check where is the entire updated cat
            state.error= null;
        },

        [updateCat.rejected]:(state,action)=>{
            state.pending = false;
            state.error= action.payload
        },
 
        [addCategory.pending]:(state)=>{
            state.pending = true;
            state.error= null

        },
        [addCategory.fulfilled]:(state,action)=>{
            // console.log(action.payload,"action.payload")
            state.pending = false;
            state.categories.push(action.payload);
            state.error= null


        },
        [addCategory.rejected]:(state,action)=>{
            state.pending = false;
            state.error= action.payload
        },
    }
})


export default productSlice.reducer;