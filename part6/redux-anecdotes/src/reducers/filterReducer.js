    import {createSlice} from '@reduxjs/toolkit'
const startState = ''


 const filterSlice = createSlice({
    name: 'anecdotes',
    initialState: startState,
    reducers: {
        
        filterList(state, action){
        return action.payload
        }

    }
})


export const {filterList} = filterSlice.actions
 
export default filterSlice.reducer
