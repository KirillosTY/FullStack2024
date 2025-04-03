import {NonSensitiveDiaryEntry} from '../../../src/types'
import { JSX } from "react";


interface DiaryEntryList {
  entries: NonSensitiveDiaryEntry[]
}

const DiaryEntries = ({entries}: DiaryEntryList): JSX.Element => {


  if(entries == null ){
    return (<div></div>)
  }
  return (<div>
    {entries.map(entry => {
      
      return <div key={entry.id}><h3 >{entry.date}</h3>
      <p>Visibility: {entry.visibility}</p>
      <p>Weather: {entry.weather}</p>
      <p>{entry.id}</p>


      </div>
    })}
    
  </div>)

} 


export default DiaryEntries