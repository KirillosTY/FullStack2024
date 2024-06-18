import { useSelector, useDispatch } from 'react-redux'
import {upvote, createAnec} from './reducers/anecdoteReducer'

const App = () => {
  const anecdotes = useSelector(state => state)
  const dispatch = useDispatch()

  const vote = (id) => {
    console.log('vote', id)
    dispatch(upvote(id))
  }

  const create = (event) => {
    event.preventDefault()
    const newAnec = event.target.create.value
    dispatch(createAnec(newAnec))
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.sort((first,second) => second.votes - first.votes).map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ).sort((first,second) => first.votes - second.votes)}
      <h2>create new</h2>
      <form onSubmit={create}>
        <div><input name="create" /></div>
        <button type='submit '>create</button>
      </form>
    </div>
  )
}

export default App