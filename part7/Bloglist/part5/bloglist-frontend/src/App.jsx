import { useState, useEffect } from 'react'
import {BrowserRouter as Router,
  Routes,Route,Link,
  useMatch,
  useNavigate
} from 'react-router-dom'

import blogService from './services/blogs'
import loginService from './services/login'
import userService from './services/user'
import SuccessMessage from './components/SuccessMessage'
import FailureMessage from './components/FailureMessage'
import Login from './components/Login'
import Users from './components/Users'
import {setNotifications} from './reducers/notificationRedu'
import { useDispatch, useSelector } from 'react-redux'
import { addBlog, initBlogs,removeBlog,updateBlog } from './reducers/blogReducer'
import { setUserLogged, setUserLoggedOut } from './reducers/userReducer'
import { setUsers } from './reducers/userListReducer'
import LoggedDefault from './components/LoggedDefault'
import Blog from './components/Blog'
import UserList from './components/UserList'
import Menu from './components/Menu'
import Comments from './components/Comments'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')


  const matchUserBlogs = useMatch('/users/:id')
  const matchSingleBlog = useMatch('/blogs/:id')

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const userList = useSelector(state => state.userList)
  const user = useSelector(state => state.user)
  const notification = useSelector(state=> state.notification)
  const blogMan = useSelector(state=> state.blogMan)
  const blog = matchSingleBlog? blogMan.find(blog => blog.id === matchSingleBlog.params.id):null


  useEffect(() => {
    const userToJSON = window.localStorage.getItem('loggedInUser')
    if (userToJSON) {
      const userLogged = JSON.parse(userToJSON)
      dispatch(setUserLogged(userLogged))
      userService.setToken(userLogged.token)
      blogService.setToken(userLogged.token)
    } else {
      console.log('nullia')
      //add error feedback
    }
  }, [])

  useEffect(() => {
    blogService.getAll(user).then(blogs => {
    
      dispatch(initBlogs(blogs))
    })
    userService.getAll().then(users => {
      dispatch(setUsers(users))
    })
  }, [user])

  const handleLogin = event => {
    event.preventDefault()
    console.log('Logging in, please be patient!')

    try {
      loginService
        .login({ username, password })
        .then(response => {
          const userLogged = response
          window.localStorage.setItem(
            'loggedInUser',
            JSON.stringify(userLogged)
          )
          setUsername('')
          setPassword('')
          blogService.setToken(userLogged.token)

          dispatch(setUserLogged(userLogged))
        })
        .catch(() => {

         dispatch(setNotifications('Wrong username or password, probably',5))
        })
    } catch (exception) {
      console.log(exception.message)
      dispatch(setNotifications('Wrong username or password, probably',5))
    }
  }

  const handleLogout = event => {
    event.preventDefault()
    window.localStorage.clear()
    setUsername('')
    setPassword('')
    dispatch(setUserLoggedOut())
    navigate('/')
  }

  const handleCreation = ({ blog }) => {
    blogService.create(blog).then(response => {
      console.log(response)
      response.user = user
      dispatch(addBlog(response))
      dispatch(setNotifications(`Created succesfully blog: ${blog.title} by ${blog.author}`,5))
      
    })
  }

  const handleUpvote = blog => {
    blogService.put(blog).then(response => {
      dispatch(updateBlog(response))

      dispatch(setNotifications(`${blog.title} by ${blog.author} successfully upvoted`,5))

    })
  }
  const handleComment = (blog,comment) =>{
   blogService.updateComment(comment).then(response => {
      const updatedBlog = {...blog,
        comments: blog.comments.concat(response)
      }
      dispatch(updateBlog(updatedBlog))
      dispatch(setNotifications(`
        ${blog.title} by ${blog.author} successfully commented: ${response.comments}`,5))

    })
  }

  const deleteBlog = async blog => {
    
    blogService.removeBlog(blog).then(response => {
      dispatch(removeBlog(blog.id))

      dispatch(setNotifications(`${blog.title} by ${blog.author} successfully deleted`,5))
      
    
    })
   
  }

  const updateUsername = event => {
    event.preventDefault()
    setUsername(event.target.value)
  }

  const updatePassword = event => {
    event.preventDefault()
    setPassword(event.target.value)
  }


  return (
    <div className="container">
      {user.token === ''? <div>
        <h2>Log in to application</h2>
        <FailureMessage failureMessage={notification}></FailureMessage>
        <Login
          submit={handleLogin}
          username={username}
          password={password}
          setUsername={updateUsername}
          setPassword={updatePassword}
        />
      </div> :
       <div>
        <Menu user={user} handleLogout={handleLogout}></Menu>
        <h1>Blogs</h1>
       <SuccessMessage successMessage={notification}></SuccessMessage>
     
      
     
      <Routes>
        <Route path='/' element={
          <LoggedDefault handleCreation={handleCreation} 
          handleUpvote={handleUpvote} 
          deleteBlog={deleteBlog}
          blogMan={blogMan}
            user={user}>
            </LoggedDefault>}/>
      
        <Route path='/users' element={<Users users={userList}></Users>}/>
        <Route path='/users/:id' element={<UserList
         matchUserBlogs={matchUserBlogs} 
         blogMan={blogMan}
          user={user}/>

        }/>
       <Route path='/blogs/:id' element={blog?
        (<div>
          <Blog
          key={blog.id}
          blog={blog}
          updateUpvote={handleUpvote}
          removeBlog={deleteBlog}
          user={user}
          show={true}
          comments={blog.comments}
          />
      
         <Comments comments={blog.comments} handleComment={handleComment} blog={blog}></Comments>
         
        

        </div>): <p>Something went wrong</p>
       }
      />
       </Routes>
    </div>}
    </div>
  )
}

export default App
