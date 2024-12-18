import { useState } from "react"
import { ALL_BOOKS } from "../queries/queries"
import { useQuery } from "@apollo/client"
import Select from "react-select"

const Books = (props) => {

  const [genre, setGenre] = useState({label:'No filter', value:''})
    
  const getBooks =  useQuery(ALL_BOOKS)
  if (!props.show) {
    return null
  }

  if(!getBooks.data || getBooks.loading){
    return (<div>
      Results are loading...
    </div>)
  }

  const books = getBooks.data.allBooks
  console.log(genre,'');
  const bookShown = genre.value === ''? books :books.filter((b=> b.genres.includes(genre.value)))


  const genreOptions = [{label:'No filter', value:''},...Array.from(new Set(books.flatMap(b => b.genres))).map(genreOption => {
  
   return {value:genreOption,
      label: genreOption
    }
  })]
  

  console.log(genreOptions,'this ehre');


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
      <Select
          defaultValue={genreOptions[0]}
          onChange={setGenre}
          options={genreOptions}
          />
    </div>
  )
}

export default Books
