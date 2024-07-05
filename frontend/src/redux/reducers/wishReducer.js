import { addwish, getwishByUser, deletewish } from "../actions/wishAction";
import { createSlice } from "@reduxjs/toolkit";

const wishSlice = createSlice({
    name:'wishlist',
    initialState:{
        list:[],
        wishSize:0,
        loading: false,
        error: null
    },
    reducers:{},
    extraReducers:{
        [addwish.pending]:(state)=>{
            state.loading = true;
        },
        [addwish.fulfilled]:(state,action)=>{
            state.loading = false;
            state.list.push(action.payload)

        },
        [addwish.rejected]:(state,action)=>{
            state.loading = false;
            state.error = action.payload
        },

        [getwishByUser.pending]:(state)=>{
            state.loading = true;
        },
        [getwishByUser.fulfilled]:(state,action)=>{
            state.loading = false;
            state.list = action.payload
            state.wishSize = state.list.length


        },
        [getwishByUser.rejected]:(state,action)=>{
            state.loading = false;
            state.error = action.payload
        },

        [deletewish.pending]:(state)=>{
            state.loading = true;
        },
        [deletewish.fulfilled]:(state,action)=>{
            state.loading = false;
            const wishID = action.payload._id;
            if(wishID){
                state.list = state.list.filter(val => val._id !== wishID)
            }
        },
        [deletewish.rejected]:(state,action)=>{
            state.loading = false;
            state.error = action.payload
        },
    }
})

export default wishSlice.reducer

// wish reducer
// get product action
// search product reducer
// import all to store
// token from localstorage ? headers
// render and make corrections based on new action and reducers
