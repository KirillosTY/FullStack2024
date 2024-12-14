
import { useState } from "react"
import { ALL_BOOKS, FAVOURITE_GENRE } from "../queries/queries"
import { useQuery } from "@apollo/client"
import Select from "react-select"

const FavouriteGenre = (props) => {



  const getGenre = useQuery(FAVOURITE_GENRE)
    
  const getBooks =  useQuery(ALL_BOOKS)
  if (!props.show) {
    return null
  }

  console.log('data',getGenre);


  if(!getBooks.data || getBooks.loading || !getGenre.data || getGenre.loading){
    return (<div>
      Results are loading...
    </div>)
  }
  const genre = getGenre.data.favouriteGenre
  console.log('data',genre);

  const books = getBooks.data.allBooks
  console.log(genre,'');
  const bookShown = genre.value === ''? books :books.filter((b=> b.genres.some(g => g.toLowerCase().includes(genre.toLowerCase()))))




  return (
    <div>
      <h2>books</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
            <th>Genres</th>
          </tr>
          {bookShown.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
              <td>{a.genres.join(' ')}</td>
            </tr>
          ))}
        </tbody>
      
      </table>
    </div>
  )
}
  
export default FavouriteGenre