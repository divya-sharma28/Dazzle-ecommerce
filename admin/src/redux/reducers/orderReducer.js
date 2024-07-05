import { createSlice } from "@reduxjs/toolkit";
import { getOrders, updateOrder } from "../actions/orderAction";

export const orderSlice = createSlice({
    name:'order',
    initialState:{
        orders:[],
        userOrders:[],
        loading: false,
        error: null
    },
    reducers:{},
    extraReducers:{
        [getOrders.pending]:(state)=>{
            state.loading = true
        },
        [getOrders.fulfilled]:(state,action)=>{
            console.log(action.payload,"aaa")
            state.loading = false
            state.orders = action.payload
        },
        [getOrders.rejected]:(state, action)=>{
            state.loading = false
            state.error = action.payload
        },
    
        [updateOrder.pending]:(state)=>{
            state.loading = true
        },
        [updateOrder.fulfilled]:(state,action)=>{
            state.loading = false
            const updatedOrder = action.payload;
                
            // Find the index of the updated order in userOrders
            const updatedOrderIndex = state.userOrders.findIndex(order => order._id === updatedOrder._id);
            
            if (updatedOrderIndex !== -1) {
                // Update the order in userOrders
                state.userOrders[updatedOrderIndex] = updatedOrder;
            }
        },
        [updateOrder.rejected]:(state, action)=>{
            state.loading = false
            state.error = action.payload
        },
        
    }

})

export default orderSlice.reducer;