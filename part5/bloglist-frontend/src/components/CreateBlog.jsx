import { useState } from 'react'


const CreateBlog = ({ handleCreation }) => {


  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')


  const createBlog = (event) => {
    event.preventDefault()
    const blog ={
      title,
      author,
      url
    }

    handleCreation({ blog })
    setTitle('')
    setAuthor('')
    setUrl('')
  }


  return(<div>

    <form onSubmit={createBlog}>
                    Title: <input
        type='text'
        value={title}
        name = 'Title'
        onChange={({ target }) => setTitle(target.value)}
      /> <br/>
                    Author: <input
        type='text'
        value={author}
        name = 'Author'
        onChange={({ target }) => setAuthor(target.value)}
      /><br/>
                    Url: <input
        type='text'
        value={url}
        name = 'Url'
        onChange={({ target }) => setUrl(target.value) }
      /><br/>
      <button type='submit'>Create</button>

    </form>

  </div>)
}

export default CreateBlog