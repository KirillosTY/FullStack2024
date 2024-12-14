import { useEffect, useState } from "react"
import { ALL_Authors, ALL_BOOKS, EDIT_AUTHOR } from "../queries/queries"
import { useMutation, useQuery } from "@apollo/client"
import Select from 'react-select';


const Authors = (props) => {
  if (!props.show) {
    return null
  }
  const [selected, setSelectedOption] = useState('')
  const [year, setYear] = useState('')
  
  const [editAuth] = useMutation(EDIT_AUTHOR,
    { refetchQueries: [
      {query: ALL_Authors},
      {query: ALL_BOOKS}
      ]
    })

  const authors = useQuery(ALL_Authors)

  if(!authors.data || authors.loading){
    return (<div> 
      We are still loading authors!
    </div>)

    }

  const editYear = (event)=>{
    event.preventDefault()
    setYear(event.target.value)
  }

  const submit = async (event) =>{
    event.preventDefault()
    if(!selected.length<4){
      
    }
    await editAuth({variables: {name:selected.value,born:Number(year)}})
    setYear('') 

  }
 
  const authorOptions = authors.data.allAuthors.map((author)=> {
    return {label:author.name, value:author.name}
   })
   console.log(authorOptions,'');
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
        <Select
        defaultValue={authorOptions[0]}
        onChange={setSelectedOption}
        options = {authorOptions}
        />
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
