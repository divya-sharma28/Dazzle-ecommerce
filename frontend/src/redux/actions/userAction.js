import { createAsyncThunk } from "@reduxjs/toolkit";
import { publicRequest } from "../../requestMethods";



export const login = createAsyncThunk("login", async(payload, {rejectWithValue})=>{

    try {
        const response = await publicRequest.post('/user/login',payload);
        const result = response.data
        localStorage.setItem("currentUser", JSON.stringify(response.data))
        return result
    } catch (error) {
        return rejectWithValue(error.response.data.message)
    }
})


export const register = async (user) => {
    try {
        // console.log(user,"user")
        await publicRequest.post('/user/register', user);

        // window.location.href = '/login';
        // return null
    } catch (error) {
        
        console.log(error,"error")
        return error.response.data.message;
    }
}
