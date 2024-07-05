import {createAsyncThunk} from '@reduxjs/toolkit'
import { userRequest } from '../../requestMethods'

export const getCategories = createAsyncThunk("getcategories", async(args,{rejectWithValue})=>{
    try {
        const response = await userRequest.get("/category/all")
        const result = response.data.data;
        // console.log(result)
        return result
    } catch (error) {
        return rejectWithValue(error)
    }
})
export const getCategory = createAsyncThunk("getcategory", async(ID,{rejectWithValue})=>{
    try {
        const response = await userRequest.get(`/category/single/${ID}`)
        const result = response.data.data;
        return result
    } catch (error) {
        return rejectWithValue(error)
    }
})

export const deleteCat = createAsyncThunk("deletecategory", async(ID,{rejectWithValue})=>{
    try {
        const response = await userRequest.delete(`/category/delete/${ID}`)
        const result = response.data.data;
        return result
    } catch (error) {
        return rejectWithValue(error)
    }
})
export const updateCat = createAsyncThunk("updatecategory", async(payload,{rejectWithValue})=>{
    try {
        const response = await userRequest.patch(`/category/update/${payload._id}`,payload)
        const result = response.data.data;
        return result
    } catch (error) {
        return rejectWithValue(error)
    }
})
export const addCategory = createAsyncThunk("addcategory", async(payload,{rejectWithValue})=>{
    try {
        const response = await userRequest.post("/category/add", payload)
        const result = response.data.data;
        return result
    } catch (error) {
        return rejectWithValue(error)
    }
})