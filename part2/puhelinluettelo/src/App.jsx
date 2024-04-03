import { useEffect, useState } from 'react'
import connectionHandler from './connections/connectionHandler'
import axios from 'axios'

const Filterer = ({nameFiltered,nameFilterHandler}) => {


  return ( <div>
    find person: <input 
    value={nameFiltered} 
    onChange={nameFilterHandler}/>
  </div>)
}


const Persons = ({persons,filter, setPersons}) => {  
  return  persons.filter(person =>  person.name.toLocaleLowerCase().match(filter.toLocaleLowerCase()))
    .map(person => 
    <p key={person.name}>{`${person.name} ${person.number} `} <button key={person.id} onClick={() => deletePerson(person,persons,setPersons)}>Delete</button></p>)
    
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

const deletePerson = (person,persons,setPersons) => {
  if(window.confirm(`Would you like to delete ${person.name}?`)){
    connectionHandler.deletePerson(person.id)
    setPersons(persons.filter(p => p.name !== person.name))
    
  } 
  
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

  const handleNewNameChange = (event) =>{
    setNewName(event.target.value)
  }

  const handleNewNumberChange = (event) =>{
    setNewNumber(event.target.value)
  }
  
  const handleFilterChange = (event) =>{
    setFilter(event.target.value)
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
    })
   
    } else {
      
      if(window.confirm(`${newName} is already on list. Would you like to edit their number?`)){
          console.log(wasFound.id)
          connectionHandler.editPerson(wasFound.id, person)
          .then(response => {
            setPersons(persons.filter(p => p.name !== wasFound.name).concat(response))
          })
          

      }
    }
  }

  return (
    <div>
      <h1>Phonebook</h1>
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
      <Persons persons={persons} filter={filterValue} setPersons={setPersons}/>
    </div>
  )

}

export default App