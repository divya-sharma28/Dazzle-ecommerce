import { createAsyncThunk } from "@reduxjs/toolkit";
import { userRequest } from "../../requestMethods";


export const getProducts = createAsyncThunk("getproducts",async(args, {rejectWithValue})=>{
    const response = await userRequest('/product/all');
    
    try {
        const result = response.data.data;
        return result
    } catch (error) {
        return rejectWithValue(error)
    }

}); 