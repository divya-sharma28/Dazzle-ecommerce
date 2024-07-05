import { createAsyncThunk } from "@reduxjs/toolkit";
import { publicRequest , userRequest} from "../../requestMethods";


export const login = createAsyncThunk("login", async(payload, {rejectWithValue})=>{

    try {
        const response = await publicRequest.post('/user/login',payload);
        const result = response.data
        console.log(result)
        localStorage.setItem("currentUser", JSON.stringify(result))
        localStorage.setItem("token", JSON.stringify(result.token))
        return result
    } catch (error) {
        return rejectWithValue(error.response.data.message)
    }
})

export const addUser = createAsyncThunk("adduser", async(payload, {rejectWithValue})=>{

    try {
        const response = await userRequest.post('/user/register',payload);
        const result = response.data.data
        return result
    } catch (error) {
        return rejectWithValue(error.response.data.message)
    }
})

export const deleteUser = createAsyncThunk("deleteuser", async(ID, {rejectWithValue})=>{

    try {
        const response = await userRequest.delete(`/user/delete/${ID}`);
        const result = response.data.data
        console.log(result,"action delete")
        return result
    } catch (error) {
        return rejectWithValue(error.response.data.message)
    }
})

export const updateUser = createAsyncThunk("updateuser", async(payload, {rejectWithValue})=>{

    try {
        const response = await userRequest.patch(`/user/update/${payload._id}`,payload);
        const result = response.data.data
        return result
    } catch (error) {
        return rejectWithValue(error.response.data.message)
    }
})

export const getAllUsers = createAsyncThunk("allusers", async(args, {rejectWithValue})=>{

    try {
        const response = await userRequest.get(`/user/all`);
        const result = response.data.data
        return result
    } catch (error) {
        return rejectWithValue(error.response.data.message)
    }
})
export const getUser = createAsyncThunk("singleuser", async(ID, {rejectWithValue})=>{

    try {
        console.log(ID)
        const response = await userRequest.get(`/user/single/${ID}`);
        const result = response.data.data
        return result
    } catch (error) {
        return rejectWithValue(error.response.data.message)
    }
})

