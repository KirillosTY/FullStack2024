import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios'

const Finder = ({countryName, filter}) => {


  return (<div>
    Find country <input 
    value = {countryName}
    onChange={filter}>
     </input>
  </div>)

}

const Languages = ({country})=> {

  return (<>    <h4>Languages</h4>
    <ul>
    { Object.values(country.languages)
    .map((language, index) => <li key={index}>{language}</li> )}
   

    </ul>
  
    </>
)
  
}

const ListOfCountry = ({countries, filteredName, buttonFilterChange}) =>{
  

    const countriesFiltered = countries.filter(country => 
      country.name.common.toLowerCase().match([filteredName.toLowerCase()]));

  console.log(countries)
  if(countriesFiltered.length === 1 ){
   
    const country = countriesFiltered[0];

  return (<div>
      <h1 key={country.name.common}>{country.name.common}</h1>
      <h4>Capital: {country.capital}</h4>
      <h4>area: {country.area}</h4>  
      <Languages country={country}></Languages>
      <img src={country.flags.png} alt={country.flags.alt}></img>

    </div>)
  }
  
  return <div>
    {countriesFiltered.map(country => 
    <p key={country.name.common}>{country.name.common} <button value={country.name.common} onClick={buttonFilterChange}> show </button></p>)}

  </div>
}



 

function App() {


  const [countryName, setCountryName] = useState('')
  const [countries, setCountries] = useState([])

  useEffect(() => {
 
    axios.get("https://studies.cs.helsinki.fi/restcountries/api/all")
    .then(request =>  request.data)
    .then(countryList => setCountries(countryList));
  },[])

  const handleCountryNameChange = (event) => {
    setCountryName(event.target.value);
    
    }
  

  

  return (
    <div>
    <Finder value={countryName} filter = {handleCountryNameChange} ></Finder>
    <ListOfCountry countries={countries} filteredName={countryName} buttonFilterChange={handleCountryNameChange}></ListOfCountry>  
    </div>

  )
}

export default App
