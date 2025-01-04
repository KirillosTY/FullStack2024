import { useState } from "react"
import { ALL_BOOKS, BOOK_SAVED } from "../queries/queries"
import { useQuery,useApolloClient, useSubscription } from "@apollo/client"
import Select from "react-select"


const Books = (props) => {

  if (!props.show) {
    return null
  }
  
  const [genre, setGenre] = useState({label:'No filter', value:''})


  
  const getBooks =  useQuery(ALL_BOOKS)

      
  useSubscription(BOOK_SAVED, {
    onData: ({data})=> {
      const savedBook = data.data.addedBook
      alert(`${savedBook.title} added`)
      console.log('we visited',SVGAElement );
     
      props.client.cache.updateQuery({query:ALL_BOOKS}, 
        ({
          allBooks
        }) => {
          return  {
            allBooks: allBooks.concat(savedBook)
          }
        }
      )
    }  
  })



  if(!getBooks.data || getBooks.loading){
    return (<div>
      Results are loading...
    </div>)
  }
  
  const books = getBooks.data.allBooks
  const bookShown = genre.value === ''? books :books.filter((b=> b.genres.includes(genre.value)))


  const genreOptions = [{label:'No filter', value:''},...Array.from(new Set(books.flatMap(b => b.genres))).map(genreOption => {
  
   return {value:genreOption,
      label: genreOption
    }
  })]
  



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
