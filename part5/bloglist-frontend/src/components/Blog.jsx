import { useState } from 'react'
import styles from '.././styles/blogs.css'

const Blog = ({ blog, updateUpvote, removeBlog, user }) => {

  const [show,setShow] = useState(false)

  const displayAll = { display: show? '':'none' }
  const displayTitle = { display: show? 'none':'' }

  const toggleShow = () => {

    setShow(!show)
  }

  const upvoted = (event) => {
    event.preventDefault()

    const blogCreated = {
      'title':blog.title,
      'author':blog.author,
      'likes': blog.likes+1,
      'url': blog.url,
      'id':blog.id,
      'user':blog.user.id
    }
    updateUpvote(blogCreated)

  }

  const blogToRemove = (event) => {
    event.preventDefault()

    removeBlog(blog)
  }
  const showButtonToOwner = { display: blog.user.username === user.username? '': 'none' }



  if(show){
    return <div style={displayAll} data-testid="blog">
      <p>Title:{blog.title} <button onClick={() => toggleShow()}>hide</button></p>
      <p>likes: {blog.likes} <button onClick={upvoted}>vote</button></p>
      <p>Author: {blog.author}</p>
      <p>Url: {blog.url}</p>
      <p><button  onClick={blogToRemove} style={showButtonToOwner}>remove</button></p>
    </div>
  }

  return (<div className='blogStyle' style={displayTitle} data-testid="blog" >
    {blog.title} <button onClick={() => toggleShow()}>view</button>
  </div>)
}

export default Blog