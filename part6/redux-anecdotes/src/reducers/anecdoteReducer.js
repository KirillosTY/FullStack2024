import { act } from "react"

const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(asObject)

const reducer = (state = initialState, action) => {
  console.log('state now: ', state)
  console.log('action', action)
  switch(action.type){
    case 'vote': {
      const modifiedContent = state.find(anec => anec.id === action.payload.id)
      const newAnec =  {
        ...modifiedContent,
        votes: modifiedContent.votes+1
      }
    return  state.map(anec => anec.id !== action.payload.id? anec : newAnec)
    }
    case 'create': {
      const newAnec =  asObject(action.payload.content)
      return state.concat(newAnec)
    }
    default: return state
  }
}

export const upvote = (id)=>{
  return  {
    type: 'vote',
    payload :{
      id:id
    }
  }
}

export const createAnec = (newAnec) => {
  return {
    type: 'create',
    payload: {
      content:newAnec}
  }
}

export default reducer