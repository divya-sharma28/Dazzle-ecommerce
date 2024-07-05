import {createSlice} from "@reduxjs/toolkit"
import {addUser, getAllUsers, login, deleteUser, updateUser, getUser} from '../actions/userAction'

const userSlice = createSlice({
    name:"user",
    initialState:{
        users:[],
        currentUser:JSON.parse(localStorage.getItem("currentUser")) || {},
        pending: false,
        error: null,
        registeredUser:{},
        singleUser:{},
        message:''
    },
    reducers:{
        logout:(state)=>{
            state.currentUser = null
            localStorage.removeItem('currentUser')
            localStorage.removeItem('token')
        }
    },
    extraReducers:{
        [addUser.pending]:(state)=>{
            state.loading = true;
            state.error = null ;
            state.message= ''
        },
        [addUser.fulfilled]:(state,action)=>{
            state.loading = false;
            state.registeredUser = action.payload
            state.error=false
            state.message = 'no error'
        },
        [addUser.rejected]: (state, action) =>{
            state.loading = false;
            state.error = action.payload;
            state.message = 'error'


        },
        [login.pending]:(state)=>{
            state.pending = true
            state.error = null
        },
        [login.fulfilled]:(state,action)=>{
            state.pending = false;
            console.log(action.payload,"red")
            state.currentUser = action.payload
            state.error = null
        },
        [login.rejected]:(state,action)=>{
            state.pending = false;
            state.error= action.payload
        },
        [getAllUsers.pending]:(state)=>{
            state.pending = true;
            state.error= null

        },
        [getAllUsers.fulfilled]:(state,action)=>{
            state.pending = false;
            state.users = action.payload
            state.error= null
        },
        [getAllUsers.rejected]:(state,action)=>{
            state.pending = false;
            state.error= action.payload
        },
        [getUser.pending]:(state)=>{
            state.pending = true;
            state.error= null
            


        },
        [getUser.fulfilled]:(state,action)=>{
            state.pending = false;
            state.singleUser = action.payload
            state.error= null
        },
        [getUser.rejected]:(state,action)=>{
            state.pending = false;
            state.error= action.payload
        },

        [deleteUser.pending]:(state)=>{
            state.pending = true;
            state.error= null

        },
        [deleteUser.fulfilled]:(state,action)=>{
            state.pending = false;
            const id = action.payload._id
            state.users = state.users.filter(val => val._id !== id);
            state.error= null
        },
        [deleteUser.rejected]:(state,action)=>{
            state.pending = false;
            state.error= action.payload
        },

        [updateUser.pending]:(state)=>{
            state.pending = true;
            state.error= null
        },
        [updateUser.fulfilled]:(state,action)=>{
            // console.log(action.payload,"action.payload")
            state.pending = false;
            state.users[
                state.users.findIndex(item => item._id === action.payload.id)
            ] = action.payload.user;
            state.error= null;
        },

        [updateUser.rejected]:(state,action)=>{
            state.pending = false;
            state.error= action.payload
        },
    }
})

export const {logout} = userSlice.actions;
export default userSlice.reducer;