import {createAsyncThunk} from '@reduxjs/toolkit'
import {userRequest } from '../../requestMethods'

export const getOrders = createAsyncThunk("getOrders", async(args,{rejectWithValue})=>{
    try {
        const response = await userRequest.get("/order/all")
        const result = response.data.data;
        console.log(result)
        return result
    } catch (error) {
        return rejectWithValue(error)
    }
})


export const updateOrder = createAsyncThunk("updateOrder", async(payload,{rejectWithValue})=>{
    try {
        const response = await userRequest.patch(`/order/update/${payload._id}`, payload)
        const result = response.data.data;
        console.log(result,"dfgdfgdgdgd")
        return result
    } catch (error) {
        return rejectWithValue(error)
    }
})


