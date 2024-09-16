import { useState } from "react"
import { ALL_Authors, ALL_BOOKS, EDIT_AUTHOR } from "../queries/queries"
import { useMutation, useQuery } from "@apollo/client"
import { useEffect } from "react"

const Authors = (props) => {
  if (!props.show) {
    return null
  }
  const [name, setName] = useState('')
  const [year, setYear] = useState('')
  
  const [editAuth] = useMutation(EDIT_AUTHOR,
    { refetchQueries: [
      {query: ALL_Authors},
      {query:ALL_BOOKS}
      ]
    })

  const authors = useQuery(ALL_Authors)


  if(!authors.data || authors.loading){
    return (<div> 
      We are still loading authors!
    </div>)

    }

 
  const editName = (event)=>{
    event.preventDefault()
    setName(event.target.value)
  }

  const editYear = (event)=>{
    event.preventDefault()
    setYear(event.target.value)
  }

  const submit = async (event) =>{
    event.preventDefault()
    
    
    await editAuth({variables: {name,born:Number(year)}})
    setYear('') 

  }
  useEffect(()=> {
    setName(authors.data.allAuthors[0].name)
  },[authors])
  

 

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.data.allAuthors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Set birthyear</h2>
      <form onSubmit={submit}>
        <select value={name}  onChange={editName}>
          {authors.data.allAuthors.map((author)=> {
            return <option key={author.id} value={author.name}>{author.name}</option>
          })}
        </select>
        <br/>
        Year: <input
        name="year"
        value={year}
        onChange={editYear}
        />  <button type="submit">Edit</button>
      </form>
    </div>
  )
}

export default Authors
