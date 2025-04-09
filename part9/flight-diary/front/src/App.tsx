import React, { useEffect, useState } from 'react'
import {Visibility,Weather, NonSensitiveDiaryEntry} from '../../src/types'
import DiaryEntries from './components/DiaryEntries'
import diaryService from './services/diaryService'
import axios from 'axios'
import ErrorInfo from './components/ErrorInfo'




const App = () => {


  const [weather, setWeather] = useState(Weather.Cloudy)

  const [Visibil, setVisibil] = useState(Visibility.Good)

  const [diariesFetched, setDiaries] = useState<NonSensitiveDiaryEntry[]>()

  const [date, setDate]  = useState('2018-01-01') 

  const [comment, setComment]  = useState('') 

  const [error,setError]  = useState('') 


  useEffect(()=> {
    diaryService.getDiaries().then(data => {
      setDiaries(data)
    })
  })
    

  
   
  const handleVisibility= (event: React.ChangeEvent<HTMLSelectElement>) => {
    event.preventDefault()
    setVisibil(event.target.value as Visibility)
    
  }

  const handleWeather= (event: React.ChangeEvent<HTMLSelectElement>) => {
    event.preventDefault()
    setWeather(event.target.value as Weather)
    
  }

  const handledate = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault()
    setDate(event.target.value)
  }

  const handleComment = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault()
    setComment(event.target.value)
  }

  const handleSubmition= (event:React.SyntheticEvent) =>{
    event.preventDefault()
    const diaryToAdd  = {
      weather: weather,
      visibility: Visibil,
      date:date,
      comment: comment
      
    }
    try {
    const addedDiary = diaryService.createEntry(diaryToAdd)
    console.log(addedDiary)
    setDiaries(diariesFetched?.concat())
    } catch (e: unknown) {
      if(axios.isAxiosError(e)) {
        setError(e.message)
        
      } else if(e instanceof Error){
        setError("Data error: "+e.message)
      }
    }
    
  } 

  return (
  <div>
    <h1>Diary Entries</h1>

    <form onSubmit={handleSubmition}>
    <ErrorInfo info={error}></ErrorInfo>

    <div> Date: <input
  type="date"
  id="start"
  name="trip-start"
  min="2018-01-01"
  max="2030-12-31" value={date}  onChange={handledate} ></input></div>
    <div>  Visibility:<select value={Visibil} 
    onChange={handleVisibility} >
    {Object.values(Visibility).map((v) => (
          <option key={v} value={v}>
            {v}
          </option>
        ))}</select></div>
    <div>  Weather:<select value={weather} onChange={handleWeather} >
    {Object.values(Weather).map((v) => (
          <option key={v} value={v}>
            {v}
          </option>
        ))}</select></div>
      comment: <input value={comment} onChange={handleComment} ></input>
      
      <div><button type="submit">Add</button></div>
    </form>


    <DiaryEntries entries={diariesFetched as NonSensitiveDiaryEntry[]}></DiaryEntries>

</div>

  ) 
}

export default App
