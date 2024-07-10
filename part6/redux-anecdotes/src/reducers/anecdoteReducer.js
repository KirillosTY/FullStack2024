import {createSlice} from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdoteService';




const reduceAnec = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    vote(state, action){
      const modifiedContent = state.find(anec => anec.id === action.payload)
      modifiedContent.votes += 1;
    },
    createAnec(state, action){
      state.push(action.payload)
    },
    setAnecdotes(state,action){
      return action.payload;
    }



  }
})

export const updateAnec = (anecdoteToUpdate)=> {
  return async dispatch => {
    const updated = {...anecdoteToUpdate,
      votes:anecdoteToUpdate.votes +1}
      const anecdote = await anecdoteService.updateAnec(updated)
    dispatch(vote(updated.id))
  }
}
  

export const addAnecdote = (anecdoteToAdd)=> {
return async dispatch => {
    
  const anecdote = await anecdoteService.addAnec(anecdoteToAdd)
  dispatch(createAnec(anecdote))
}

}
 export const initAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()

    dispatch(setAnecdotes(anecdotes))
  }
}

export const {vote,createAnec,setAnecdotes} = reduceAnec.actions



export default reduceAnec.reducer