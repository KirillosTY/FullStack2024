import { useMutation } from '@apollo/client'
import { useState } from 'react'
import { ALL_BOOKS, NEW_BOOK, ALL_Authors, FAVOURITE_GENRE } from '../queries/queries'
import FavouriteGenre from './FavouriteGenre'

const NewBook = (props) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [published, setPublished] = useState('')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])

  const [addBook] = useMutation(NEW_BOOK,  
    { refetchQueries: [
    {query: ALL_Authors},
    {query: ALL_BOOKS},
    ]
  })

  if (!props.show) {
    return null
  }

  const submit = async (event) => {
    event.preventDefault()
    
    console.log(title, author,published,genres)
    
    addBook({ variables: { title, published: Number(published), author, genres } })
    setTitle('')
    setPublished('')
    setGenres('')
    setAuthor('')
  }

  const addGenre = () => {

    setGenres(genres.concat(genre))
    setGenre('')
   
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          title 
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author 
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          published 
          <input
            type="number"
            value={ published}
            onChange={({ target }) => setPublished(target.value)}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">
            add genre
          </button>
        </div>
        {genres.length>0? <div>genres: {genres.join(' ')}</div>: <div>genres: None added</div>}
        <button type="submit">create book</button>
      </form>
    </div>
  )
}

export default NewBook