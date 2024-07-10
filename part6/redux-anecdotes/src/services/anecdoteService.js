import axios from 'axios'

const dbUrl = 'http://localhost:3001/anecdotes'

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
    return {
      content: anecdote,
      id: getId(),
      votes: 0
    }
  }

const getAll = () =>  {

    return  axios.get(dbUrl).then(response => response.data)
}

const addAnec = (anecdote) => {
    const newAnec = asObject(anecdote)
    return axios.post(dbUrl,newAnec).then(response=> response.data)
}

const updateAnec = (anecdote) => {
   return axios.put(`${dbUrl}/`+anecdote.id, anecdote)
}


export default {getAll, addAnec, updateAnec}