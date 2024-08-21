import { createSlice } from "@reduxjs/toolkit";
import { act, useReducer } from "react";


const userList = []


const userListReducer = createSlice({
    name: 'user',
    initialState: userList,
    reducers: {
        setUsers(state,action){
            return action.payload
        }
    }
})



export const {setUsers} = userListReducer.actions

export default userListReducer.reducer