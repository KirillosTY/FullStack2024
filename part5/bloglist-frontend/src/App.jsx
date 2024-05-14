import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'



const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null) 

  useEffect(() => {
    blogService.getAll().then(blogs =>{
      setBlogs( blogs )
      console.log("nyt päivittyy")
    }
    )  
  }, [])

  const handleLogin = async (event) =>  {
    event.preventDefault()
    console.log('Logging in, please be patient!')

    try {
      const userToken = await loginService.login({username,password})
      setUser(userToken)
      console.log(userToken)
    }catch(exception) {
      console.log(exception.message)
    }


  }


  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <form onSubmit={handleLogin}>
          <div>
            Username: <input
            type="text"
            value={username}
            onChange={({target}) => setUsername(target.value)}
            />
          </div>

          <div>
            Password: <input
            type="password  "
            value={password}
            onChange={({target}) => setPassword(target.value)}
            />
          </div>
          <button type="submit">login</button>
        </form>
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App