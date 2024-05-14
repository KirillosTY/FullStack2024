import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null



const setToken = (newToken) => {
  token = `Bearer   ${newToken}`
  console.log(token)

}

const getAll = (user) => {
  setToken(user)
  console.log(user)
  const config = {
    headers: { Authorization: token },
  }
  

  const request = axios.get(baseUrl,config, user)
  return request.then(response => response.data)
}


export default { getAll }