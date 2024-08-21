import { useState } from 'react'
import { Table, Form, Button } from 'react-bootstrap'

const CreateBlog = ({ handleCreation }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const createBlog = event => {
    event.preventDefault()
    const blog = {
      title,
      author,
      url,
    }

    handleCreation({ blog })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <Form onSubmit={createBlog}>
        <Form.Group>
        <Form.Label>Title:</Form.Label>
        <Form.Control
          className="title"
          data-testid="title"
          type="text"
          value={title}
          name="Title"
          onChange={({ target }) => setTitle(target.value)}
        />{' '}
        </Form.Group>
        <br />
        <Form.Group>
        <Form.Label>Author:</Form.Label>
        <Form.Control
          className="author"
          data-testid="author"
          type="text"
          value={author}
          name="Author"
          onChange={({ target }) => setAuthor(target.value)}
        />
         </Form.Group>
        <br />
        <Form.Group>
        <Form.Label>Url:</Form.Label>
        <Form.Control
          className="url"
          data-testid="url"
          type="text"
          value={url}
          name="Url"
          onChange={({ target }) => setUrl(target.value)}
        />
         </Form.Group>
        <br />
        <Button variant="primary" type="submit">Create</Button>
      </Form>
    </div>
  )
}

export default CreateBlog
