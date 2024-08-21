import blogStyles from '.././styles/blogs.css?inline'
import { Link } from 'react-router-dom'
import Comments from './Comments'

const Blog = ({ blog, updateUpvote, removeBlog, user, show }) => {
  const upvoted = event => {
    event.preventDefault()

    const blogCreated = {
      title: blog.title,
      author: blog.author,
      likes: blog.likes + 1,
      url: blog.url,
      id: blog.id,
      user: blog.user.id,
    }
    updateUpvote(blogCreated)
  }

  const blogToRemove = event => {
    event.preventDefault()

    removeBlog(blog)
  }


  const showButtonToOwner = {
    display: blog.user.username === user.username ? '' : 'none',
    
}

  if (show) {
    return (
      <div
        className="blogs"
        data-testid={'blog' + blog.title + blog.author}
      >
        <p>
          Title:{blog.title} 
        </p>
        <p>
          likes: {blog.likes} <button onClick={upvoted}>vote</button>
        </p>
        <p>Author: {blog.author}</p>
       
        <Link to={`https://${blog.url}`}>Url: {blog.url}  </Link>
          
        <p>
          <button onClick={blogToRemove} style={showButtonToOwner}>
            remove
          </button>
        </p>
      </div>
    ) 
  }

  return (
    <Link key={blog.id}to={`/blogs/${blog.id}`}>
      <p className="blogs" data-testid="blog">
      {blog.title}
    </p>

  </Link>
  )
}

export default Blog
