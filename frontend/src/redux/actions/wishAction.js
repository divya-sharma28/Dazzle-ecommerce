import { createAsyncThunk } from "@reduxjs/toolkit";
import {userRequest} from '../../requestMethods'

export const addwish = createAsyncThunk("addwish", async (payload, {rejectWithValue})=>{
    const response = await userRequest.post('/wishlist/add',payload)

    try {
        const result = response.data.data
        return result
    } catch (error) {
        return rejectWithValue(error)
    }
})
export const deletewish = createAsyncThunk("deletewish", async (wishID, {rejectWithValue})=>{
    const response = await userRequest.delete(`/wishlist/delete/${wishID}`)
    try {
        const result = response.data.data
        return result
    } catch (error) {
        return rejectWithValue(error)
    }
})
export const getwishByUser = createAsyncThunk("getwishByUser", async (userID, {rejectWithValue})=>{

    const response = await userRequest.get(`/wishlist/user/${userID}`)
    try {
        const result = response.data.data
        return result
    } catch (error) {
        return rejectWithValue(error)
    }
})