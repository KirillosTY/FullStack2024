import { ALL_BOOKS } from "../queries/queries"
import { useQuery } from "@apollo/client"

const Books = (props) => {
  if (!props.show) {
    return null
  }

  const getBooks = useQuery(ALL_BOOKS)

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
              <td>{a.author}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Books
