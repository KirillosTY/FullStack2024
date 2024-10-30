import { ALL_BOOKS } from "../queries/queries"
import { useQuery } from "@apollo/client"

const Books = (props) => {
  const getBooks = useQuery(ALL_BOOKS)
  if (!props.show) {
    return null
  }

  
  
  console.log('books', getBooks)

  if(!getBooks.data || getBooks.loading){
    return (<div>
      Results are loading...
    </div>)
  }

  const books = getBooks.data.allBooks

  return (
    <div>
      <h2>books</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Books
