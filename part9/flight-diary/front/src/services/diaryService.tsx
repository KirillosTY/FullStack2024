import {NewDiaryEntry, NonSensitiveDiaryEntry} from '../../../src/types'
import axios from 'axios'
import toNewDiaryEntry from '../../../src/utils'


const base = 'http://localhost:3000/api/diaries'

const getDiaries = async () => {
 const response = await axios.get<NonSensitiveDiaryEntry[]>(base)
   return response.data


}


const createEntry = async (entry:NewDiaryEntry)=> {
   
   const entryToAdd = toNewDiaryEntry(entry)
   console.log(entryToAdd)
  const response = await axios.post<NonSensitiveDiaryEntry>(base, entryToAdd)

   return response.data
}

export default {getDiaries, createEntry}