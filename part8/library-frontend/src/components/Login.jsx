import { useMutation } from "@apollo/client"
import { useEffect, useState } from "react"
import { LOGIN } from "../queries/queries"


const Login =({setToken}) => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [login, result] = useMutation(LOGIN, {
    onError: (error) => {
      console.log('käydään logiiiiii','');
      console.log(error.graphQLErrors[0].message)
    }

  })

  useEffect(()=> {
    if(result.data) {
      const token = result.data.login.value
      setToken(token)
      localStorage.setItem('user-token', token)
    }
  }, [result.data])


  const submit = async (event) => {
    event.preventDefault()
    console.log('pressed','');
    login({variables:{username,password}})
  
  }


  return (
    <div>
      <form onSubmit={submit}>
        <div>
          username: <input value={username} onChange={({target}) => setUsername(target.value)}></input>
        </div>
        <div>
          password: <input value={password} onChange={({target}) => setPassword(target.value)}></input>
        </div>

      <button type="submit">cliiick</button>
      </form>
    </div>
  )

}

export default Login