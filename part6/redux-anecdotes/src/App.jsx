import Anecdotes from "./components/Anecdotes.jsx"
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import anecdoteReducer, { initAnecdotes } from './reducers/anecdoteReducer.js'

const App = () => {

  
  const dispath = useDispatch()
   useEffect(()=>{
    dispath(initAnecdotes())
   })

  return (
    <div>
      <Anecdotes></Anecdotes>
    </div>
  )
}

export default App 