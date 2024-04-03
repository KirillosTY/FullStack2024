import { useEffect, useState } from 'react'
import connectionHandler from './connections/connectionHandler'
import './app.css'
const Filterer = ({nameFiltered,nameFilterHandler}) => {


  return ( <div>
    find person: <input 
    value={nameFiltered} 
    onChange={nameFilterHandler}/>
  </div>)
}


const Persons = ({persons,filter, setPersons, deletePerson}) => {  
  return  persons.filter(person =>  person.name.toLocaleLowerCase().match(filter.toLocaleLowerCase()))
    .map(person => 
    <p key={person.name}>{`${person.name} ${person.number} `} <button key={person.id} onClick={() => deletePerson(person)}>Delete</button></p>)
    
}

const AddPerson = ({addPerson, name, number, handleName, handleNumber}) => {

  return (
  <form onSubmit={addPerson}>
    <div>
      name: <input 
      value={name}
      onChange={handleName}/>
    </div>
    <div>
      number: <input 
      value={number}
      onChange={handleNumber}/>
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>)

  
}



const DeleteMessage = ({message}) => {
  if(message=== null){
    return null
  }
  
  return <div className='delete'>
          {message}
  </div>
}

const SuccessMessage = ({message}) => {
  if(message=== null){
    return null
  }
  
  return <div className='success'>
          {message}
  </div>
}

const App = () => {
  const [persons, setPersons] = useState([])

  useEffect(()=>{
    connectionHandler.getPersons().then(people=> {
      setPersons(people)})
  },[])


  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterValue, setFilter] = useState('')
  const [deleteMessage, setDeleteMsg] = useState('')
  const [successMessage, setSuccessMsg] = useState('')

  const handleNewNameChange = (event) =>{
    setNewName(event.target.value)
  }

  const handleNewNumberChange = (event) =>{
    setNewNumber(event.target.value)
  }
  
  const handleFilterChange = (event) =>{
    setFilter(event.target.value)
  }


  const deletePerson = (person) => {

  if(window.confirm(`Would you like to delete ${person.name}?`)){
    connectionHandler.deletePerson(person.id).then( response => {
      setPersons(persons.filter(p => p.name !== person.name))
      setDeleteMsg(`Deleted ${person.name}`)
      setTimeout(()=> {
  
        setDeleteMsg(null)
      },5000)
        


    }).catch((error) => {

            setDeleteMsg(`${person.name} was already deleted`)
            setTimeout(()=> {
        
              setDeleteMsg(null)
            },5000)
              
          })
  } 
  
}

  const addNewName =(event) => {
    const person = {
      name:newName,
      number: newNumber
      }
    event.preventDefault()
    const wasFound = persons.filter(person => person.name === newName)[0]
    if(!wasFound){
    
    connectionHandler.addPerson(person)
    .then(response => {
      setPersons(persons.concat(response))
      setNewName('')
      setNewNumber('')
      setSuccessMsg(`Added ${response.name}`)
      setTimeout(()=> {

        setSuccessMsg(null)
      },5000)
    })

   
    } else {
      
      if(window.confirm(`${newName} is already on list. Would you like to edit their number?`)){
          console.log(wasFound.id)
          connectionHandler.editPerson(wasFound.id, person)
          .then(response => {
            setPersons(persons.filter(p => p.name !== wasFound.name).concat(response))
            
            setSuccessMsg(`Edited ${response.name}´s phonenumber to ${response.number}`)
          setTimeout(()=> {
    
            setSuccessMsg(null)
          },5000)
          }).catch((error) => {

            setDeleteMsg(`${person.name} was not found`)
            setTimeout(()=> {
        
              setDeleteMsg(null)
            },5000)
              
          })
          

      }
    }
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <DeleteMessage message={deleteMessage}></DeleteMessage>
      <SuccessMessage message={successMessage}></SuccessMessage>
      <Filterer filter={filterValue} nameFilterHandler={handleFilterChange}/>
      <h2>Add a new person</h2>
      <AddPerson
       addPerson={addNewName}
       name={newName}
       number={newNumber}
       handleName={handleNewNameChange}
       handleNumber={handleNewNumberChange}
       />
       
      
      <h2>Numbers</h2>
      <Persons persons={persons} filter={filterValue} setPersons={setPersons} deletePerson={deletePerson}/>
    </div>
  )

}

export default App