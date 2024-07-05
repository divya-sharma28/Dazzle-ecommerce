import { createSlice } from "@reduxjs/toolkit";
import { addtocart, updatecart, deletecart, getcart, checkout } from "../actions/cartAction";
// import axios from "axios";

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cartItems: [],
        cartTotal: 0,
        loading: false,
        error: null
    },
    reducers: {},
    extraReducers: {
        [addtocart.pending]: (state) => {
            state.loading = true
            state.error = null
        },
        [addtocart.fulfilled]: (state, action) => {
            state.loading = false;
            state.cartItems.push(action.payload);
            state.cartTotal += action.payload.price;
            state.error = null


        },
        [addtocart.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload
        },
        [getcart.pending]: (state) => {
            state.loading = true
            state.error = null
        },
        [getcart.fulfilled]: (state, action) => {
            state.loading = false;
            // console.log(action.payload, "get get")
            state.cartItems = action.payload
            const priceArr = state.cartItems.map(val => val.price)
            const sum = priceArr.reduce((a,b)=>a+b,0)
            state.cartTotal = sum
            // state.cartTotal = action.payload.total
            state.error = null

        },
        [getcart.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        [deletecart.pending]: (state) => {
            state.loading = true
            state.error = null

        },
        [deletecart.fulfilled]: (state, action) => {
            console.log(action.payload)
            state.loading = false;
            const cartID = action.payload._id
            console.log(cartID, "out delete process")
            state.error = null


            if (cartID) {
                console.log(cartID, "in delete process")
                state.cartItems = state.cartItems.filter(item => item._id !== cartID)
                state.cartTotal -= action.payload.price
            }
        },
        [deletecart.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload
        },

        [updatecart]: (state) => {
            state.loading = true
            state.error = null

        },
        [updatecart.fulfilled]: (state, action) => {
            state.loading = false;
            // console.log(action.payload, "uc")
            const id = action.payload._id

            state.cartItems = state.cartItems?.map(item => (
                item._id === id ? action.payload : item
            ));
            const priceArr = state.cartItems.map(val => val.price)
            // console.log(priceArr,"priceArr")
            const sum = priceArr.reduce((a,b)=>a+b,0)
            state.cartTotal = sum

            state.error = null

        },
        [updatecart.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload
        },

        [checkout.pending]: (state) => {
            state.loading = true
            state.error = null

        },
        [checkout.fulfilled]: (state, action) => {
            state.loading = false
            state.error = null
        },
        [checkout.rejected]: (state, action) => {
            state.loading = false
            state.error = action.payload
        },
    }
})

export default cartSlice.reducer
