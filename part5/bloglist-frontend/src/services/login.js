import axios from 'axios'
const baseUrl = '/api/login'

let token = null

const login = ({username,password}) => {

    const request = axios.post(baseUrl,{username, password})

    return request.then(response => response.data)
}




export default {login}