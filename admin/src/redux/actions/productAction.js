import {createAsyncThunk} from '@reduxjs/toolkit'
import { publicRequest, userRequest } from '../../requestMethods'

export const getproducts = createAsyncThunk("getproducts", async(args,{rejectWithValue})=>{
    try {
        const response = await userRequest.get("/product/all")
        const result = response.data.data;
        // console.log(result)
        return result
    } catch (error) {
        return rejectWithValue(error)
    }
})
export const getproduct = createAsyncThunk("getproduct", async(ID,{rejectWithValue})=>{
    try {
        const response = await userRequest.get(`/product/single/${ID}`)
        const result = response.data.data;
        return result
    } catch (error) {
        return rejectWithValue(error)
    }
})

export const deleteProducts = createAsyncThunk("deleteproducts", async(ID,{rejectWithValue})=>{
    try {
        const response = await userRequest.delete(`/product/delete/${ID}`)
        const result = response.data.data;
        return result
    } catch (error) {
        return rejectWithValue(error)
    }
})
export const updateProducts = createAsyncThunk("updateproducts", async(payload,{rejectWithValue})=>{
    try {
        const response = await userRequest.patch(`/product/update/${payload._id}`,payload)
        const result = response.data.data;
        return result
    } catch (error) {
        return rejectWithValue(error)
    }
})
export const addProducts = createAsyncThunk("addproducts", async(payload,{rejectWithValue})=>{
    try {
        const response = await userRequest.post("/product/add", payload)
        const result = response.data.data;
        return result
    } catch (error) {
        return rejectWithValue(error)
    }
})