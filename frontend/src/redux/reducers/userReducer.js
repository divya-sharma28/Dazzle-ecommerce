import { createSlice } from "@reduxjs/toolkit";
import { login,register } from "../actions/userAction";

const userSlice = createSlice({
    name:"user",
    initialState:{
        error: null,
        loading: false,
        currentUser:JSON.parse(localStorage.getItem("currentUser")) || {},
        registeredUser:{}
    },
    reducers:{
        logout:(state)=>{
            state.currentUser = null
            localStorage.removeItem('currentUser')
            localStorage.removeItem('access_token')
            // window.redirect()
        }
    },
    extraReducers:{
        [register.pending]:(state)=>{
            state.loading = true,
            state.error=null

        },
        [register.fulfilled]:(state,action)=>{
            state.loading = false,
            state.registeredUser = action.payload
            state.error=null
        },
        [register.rejected]: (state, action) =>{
            state.loading = false,
            state.error = action.payload
        },
        [login.pending]:(state)=>{
            state.loading = true
            state.error=null

        },
        [login.fulfilled]:(state, action)=>{
            state.loading = false,
            console.log(action.payload,"login action")
            state.currentUser = action.payload
            // localStorage.setItem('currentUser', JSON.stringify(action.payload))
            localStorage.setItem('access_token', action.payload.token)
            state.error=null

        },
        [login.rejected]: (state, action) =>{
            state.loading = false,
            console.log(action.payload, "error reducer")
            state.error = action.payload
        }
    }
})

export const {logout} = userSlice.actions;
export default userSlice.reducer