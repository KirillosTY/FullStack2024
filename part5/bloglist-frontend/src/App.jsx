import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import failureStyles from './styles/failurePopup.css'
import SuccessStyles from './styles/successPopup.css'



const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState('') 

  const [title, setTitle] = useState('') 
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')


  const [successMessage, setSuccessMessage]= useState('')
  const [failureMessage, setfailureMessage]= useState('')

  useEffect(() => {
    blogService.getAll(user).then(blogs =>{
      setBlogs( blogs )
    }
    )  
  }, [user])


  useEffect(()=> {

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
  const handleLogin = (event) =>  {
    event.preventDefault()
    console.log('Logging in, please be patient!')

    try {
      loginService.login({username,password}).then((response)=>{
      
        const userLogged = response
        window.localStorage.setItem('loggedInUser',JSON.stringify(userLogged))
        setUsername('')
        setPassword('')
        blogService.setToken(userLogged.token)
        
        setUser(userLogged)

      
      }).catch((error)=>{
        setfailureMessage('Wrong username or password, probably')
  
        setTimeout(()=>{
          setfailureMessage('')
        }, 5000)
      })
    }catch(exception) {
      console.log(exception.message)
      setfailureMessage('Wrong username or password, probably')

      setTimeout(()=>{
        setfailureMessage('')
      }, 5000)
    }
  
  }

  const handleLogout = (event) =>{
    event.preventDefault()
    window.localStorage.clear()
    setUsername('')
    setPassword('')
    setUser('')
  }

  const handleCreation = (event) =>{
    event.preventDefault()
    const blog ={
      title,
      author,
      url
    }

    console.log(user)
    blogService.create(blog).then((response) => {
      console.log(response)
      setBlogs(blogs.concat(response))
      setSuccessMessage(`Created succesfully blog: ${blog.title} by ${blog.author}`)
      setTimeout(()=> {
        setSuccessMessage('')
      },5000)
    })

  }

  const SuccessMessage = () => {
    
    if(successMessage){
      return (<div className='success'>{successMessage}</div>)
    }
  }

  const FailureMessage = () => {
    
    if(failureMessage){
      return <div className='failure'>{failureMessage}</div>
    }
  }

  if (user === '') {
    return (
      <div>
        <h2>Log in to application</h2>
        <FailureMessage>{failureMessage}</FailureMessage>
        <form onSubmit={handleLogin}>
          <div>
            Username: <input
            type="text"
            value={username}
            name="Username"
            onChange={({target}) => setUsername(target.value)}
            />
          </div>

          <div>
            Password: <input
            type="password"
            value={password}
            name="Password"
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
      <h1>Blogs</h1>
      <SuccessMessage>{successMessage}</SuccessMessage>

      <p>{user.name} logged in <button onClick={handleLogout}>logout</button> </p>
      <h2></h2>
      <form onSubmit={handleCreation}>
        Title: <input 
        type='text'
        value={title}
        name = 'Title'
        onChange={({target})=> setTitle(target.value)}
        /> <br/>
        Author: <input 
        type='text'
        value={author}
        name = 'Author'
        onChange={({target})=> setAuthor(target.value)}
        /><br/>
        Url: <input 
        type='text'
        value={url}
        name = 'Url'
        onChange={({target})=> setUrl(target.value)}
        /><br/>
        <button type='submit'>Create</button>

      </form>

      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App