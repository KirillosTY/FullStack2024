import  {addAnecdote, createAnec} from '.././reducers/anecdoteReducer'
import {popNotification} from '../reducers/notificationReducer'
import { useDispatch } from 'react-redux'
import anecdoteService from '../services/anecdoteService'

const AnecdoteForm = () => {
    const dispatch = useDispatch()


    const create = async(event) => {
      event.preventDefault()
        const newAnec = event.target.create.value
        event.target.create.value = ''
        dispatch(addAnecdote(newAnec))
        const notificationMessage = `Succesfully added "${newAnec}" to the list`
        dispatch(popNotification(notificationMessage,10))
    }
    
      


  return (<div>
    <h2>create new</h2>
      <form onSubmit={create}>
        <div><input name="create" /></div>
        <button type='submit '>create</button>
      </form>
  </div>)

}

export default AnecdoteForm