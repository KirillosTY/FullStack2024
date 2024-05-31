import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import SuccessMessage from './components/SuccessMessage'
import FailureMessage from './components/FailureMessage'
import Togglable from './components/Togglable'
import CreateBlog from './components/CreateBlog'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState('')


  const [successMessage, setSuccessMessage]= useState('')
  const [failureMessage, setfailureMessage]= useState('')



  useEffect(() => {

    const userToJSON = window.localStorage.getItem('loggedInUser')
    console.log('Käydään ja ')
    if(userToJSON){
      const userLogged = JSON.parse(userToJSON)
      setUser(userLogged)
      blogService.setToken(userLogged.token)
    } else {
      console.log('nullia')
    }
  },[])

  useEffect(() => {
    blogService.getAll(user).then(blogs => {
      setBlogs( blogs )
    }
    )
  }, [user])

  const handleLogin = (event) =>  {
    event.preventDefault()
    console.log('Logging in, please be patient!')

    try {
      loginService.login({ username,password }).then((response) => {

        const userLogged = response
        window.localStorage.setItem('loggedInUser',JSON.stringify(userLogged))
        setUsername('')
        setPassword('')
        blogService.setToken(userLogged.token)

        setUser(userLogged)


      }).catch(() => {
        setfailureMessage('Wrong username or password, probably')

        setTimeout(() => {
          setfailureMessage('')
        }, 5000)
      })
    }catch(exception) {
      console.log(exception.message)
      setfailureMessage('Wrong username or password, probably')

      setTimeout(() => {
        setfailureMessage('')
      }, 5000)
    }

  }

  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.clear()
    setUsername('')
    setPassword('')
    setUser('')
  }

  const handleCreation = ({ blog }) => {

    blogService.create(blog).then((response) => {
      console.log(response)
      setBlogs(blogs.concat(response))
      setSuccessMessage(`Created succesfully blog: ${blog.title} by ${blog.author}`)
      setTimeout(() => {
        setSuccessMessage('')
      },5000)

    })

  }

  const handleUpvote = (blog)  => {
    blogService.put(blog).then((response) => {

      blogService.getAll(user).then(blogs => {
        setBlogs( blogs )
      }
      )
      setSuccessMessage(`${blog.title} by ${blog.author} successfully upvoted`)
      setTimeout(() => {
        setSuccessMessage('')
      },5000)
    })



  }

  const removeBlog = (blog) => {
    blogService.removeBlog(blog).then((response) => {

      blogService.getAll(user).then(blogs => {
        setBlogs( blogs )
      })

      setSuccessMessage(`${blog.title} by ${blog.author} successfully deleted`)
      setTimeout(() => {
        setSuccessMessage('')
      },5000)
    })

  }



  if (user === '') {
    return (
      <div>
        <h2>Log in to application</h2>
        <FailureMessage failureMessage = {failureMessage}></FailureMessage>
        <form onSubmit={handleLogin}>
          <div>
            Username: <input
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>

          <div>
            Password: <input
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type="submit">login</button>
        </form>
      </div>
    )
  }

  return (
    <div>

      <h1>Blogs</h1>
      <SuccessMessage successMessage = {successMessage}></SuccessMessage>

      <p>{user.name} logged in <button onClick={handleLogout}>logout</button> </p>
      <h2></h2>
      <Togglable  buttonLabel="new Blog">
        <CreateBlog handleCreation= {handleCreation}></CreateBlog>
      </Togglable>

      {blogs.sort((first,second) => first.likes - second.likes).map(blog =>
        <Blog key={blog.id} blog={blog} updateUpvote={handleUpvote} removeBlog={removeBlog}  user={user}/>
      )}
    </div>
  )
}

export default App