import { gender } from "../types"

import z from 'zod'



export const newPatientSchema = z.object({
  id:z.string().optional(),
  name: z.string(),
  dateOfBirth:  z.string(),
  ssn: z.string(),
  gender: z.nativeEnum(gender),
  occupation: z.string()
});

export default newPatientSchema

/*
const parseSsn = (ssn:unknown): string =>  {

  if(!ssn || !isString(ssn)){
    throw new Error('name is missing')
  }

  return ssn

}


const parseName = (name:unknown): string =>  {

  if(!name || !isString(name)){
    throw new Error('name is missing')
  }

  return name

}

const parseBirth = (date:unknown): string => {
  if(!date || !isString(date) || isDate((date))){
    throw new Error('date is wrong')

  }
  return date
}

const isDate = (date:string): boolean =>{

  if(Object.prototype.toString.call(date) === '[object Date]'){
    return true
  
  
  }

  return false
}

const parseOccupation = (occupation:unknown): string =>  {
  if(!occupation || !isString(occupation)){
    throw new Error('occupation is missing')
  }

  return occupation

}

const parseGender = (gender:unknown): string =>  {

  if(!gender || !isString(gender) || !isGender(gender)){
    throw new Error('gender is missing')
  }

  return gender

}

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
}

const isGender = (gend:string): gend is gender =>{
  return Object.values(gender).map(g => g.toString()).includes(gend)
}*/