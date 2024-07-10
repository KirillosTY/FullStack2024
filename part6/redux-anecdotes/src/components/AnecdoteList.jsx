
import { useSelector, useDispatch } from 'react-redux'
import anecdoteReducer,{updateAnec, vote} from '.././reducers/anecdoteReducer'
import filterReducer, {filterList} from '../reducers/filterReducer'
import {addNotification, popNotification} from '../reducers/notificationReducer'


const Anecdote = ({anecdote}) => {

    const dispatch = useDispatch()

    const upvote = (anecdote) => {
        dispatch(updateAnec(anecdote))
        const notificationMessage = `Succesfully voted "${anecdote.content}"`
        dispatch(popNotification(notificationMessage,10))
    
      }

    return (<div>
        <div>
          {anecdote.content}
        </div>
        <div>
          has {anecdote.votes}
          <button onClick={() => upvote(anecdote)}>vote</button>
        </div>
      </div>)

}

const AnecdoteList = () => {

    const anecdotes = useSelector(state =>{
        console.log(state, 'this++')

          return state.anecdotes.filter(m => m.content.toLowerCase().match(state.filter.toLowerCase()))
      })

    


    return(<div>
        <h2>Anecdotes</h2>
        {anecdotes.sort((first,second) => second.votes - first.votes).map(anecdote =>
        <Anecdote key ={anecdote.id} anecdote={anecdote}></Anecdote>
      ).sort((first,second) => first.votes - second.votes)}
    </div>)
}

export default AnecdoteList