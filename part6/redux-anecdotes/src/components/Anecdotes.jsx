import AnecdoteForm from './AnecdoteForm'
import AnecdoteList from './AnecdoteList'
import AnecdoteFilter from './AnecdoteFilter'
import Notification from "./Notification.jsx"
import anecdoteService from '../services/anecdoteService.js'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import anecdoteReducer, { initAnecdotes } from '../reducers/anecdoteReducer.js'

const Anecdotes = () => {

  

  return (
    <div>
      <AnecdoteFilter></AnecdoteFilter>
      <AnecdoteList></AnecdoteList>
      <AnecdoteForm></AnecdoteForm>
      <Notification></Notification>

    </div>
  )
}

export default Anecdotes