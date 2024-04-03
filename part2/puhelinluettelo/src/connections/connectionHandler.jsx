import axios from 'axios'

const dbUrl = 'http://localhost:3001/persons'

const getPersons = () => {

    return axios.get(dbUrl)
    .then(result =>  result.data)
}


const addPerson = (personO) => {
    console.log(personO)
   return axios.post(dbUrl,personO)
    .then(response => {
        console.log(response.data)
        console.log(response,'this')
        return response.data})


}

const deletePerson = (id) => {
   
    return axios.delete(dbUrl+`/${id}`)
     .then(response => response.data)
 
 
}

const editPerson = (id, person) => {

    return axios.put(dbUrl+`/${id}`, person)
        .then(response => response.data)
}

export default {
    editPerson,
    deletePerson,
    addPerson,
    getPersons
}
