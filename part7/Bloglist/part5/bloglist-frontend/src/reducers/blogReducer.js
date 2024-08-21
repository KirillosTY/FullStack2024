import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";
const blogs = []


const manageBlogs = createSlice({
    name: 'blogManager',
    initialState: blogs,
    reducers: {
        initBlogs(state,action){
            return action.payload
        },
        addBlog(state,action){
            return state.concat(action.payload)
        },
        updateBlog(state, action){
            return state.map(blogOnList => blogOnList.id !== action.payload.id ? blogOnList : action.payload)
        },
        removeBlog(state,action){
            state = state.filter(blog => blog.id !== action.payload)
            return state
        },
        
    }
})


export const {initBlogs, addBlog,removeBlog, updateBlog} = manageBlogs.actions

export default manageBlogs.reducer