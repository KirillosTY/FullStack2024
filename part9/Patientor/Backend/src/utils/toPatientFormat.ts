import {  Entry, Gender, HealthCheckRating} from "../types";

import z from 'zod';



export const newPatientSchema = z.object({
  id:z.string().optional(),
  name: z.string(),
  dateOfBirth:  z.string(),
  ssn: z.string(),
  gender: z.nativeEnum(Gender),
  occupation: z.string(),
});



export const newEntry = z.object({
  id:z.string().optional(),
  description:z.string(),
  date: z.string(),
  specialist: z.string(),
  diagnosisCodes: z.string().array().optional(),

});

 export const newOccupationalEntry = newEntry.extend({
  type:z.literal("OccupationalHealthcare"),
  employerName: z.string(),
  sickLeave:z.object({
    startDate: z.string(),
    endDate: z.string()

})
});



export const newHealthcheckEntry = newEntry.extend({
  type:z.literal('HealthCheck'),
  HealthCheckRating: z.nativeEnum(HealthCheckRating)

});


export const newHospitalEntry = newEntry.extend({
  type:z.literal('Hospital'),
  discharge: z.object( {
    date: z.string(),
    criteria: z.string()
  })

});


export const newEntrySchema = z.discriminatedUnion("type",[
  newOccupationalEntry||
  newHealthcheckEntry||
 newHospitalEntry

]);


export default newPatientSchema;


export const parseEntry = (object:unknown): Entry=> {
  
  if (!object || typeof object !== 'object' ) {
      throw new TypeError("object not found");

  } 

  newEntry.parse(object);

  if('type' in object){
      
    newEntrySchema.parse(object);

     return object as Entry;

      
  } else {
    throw new TypeError('Type not recognized');
  }



};


/*
const validateEntryType = (entry: Entry): Entry => {
  
  if('type' in entry){
    switch (entry.type){
      case 'Hospital':
        return validateEntryHospital(entry);
      case 'OccupationalHealthcare':

      
  
    }
  }

}
 
const validateEntryHospital = (entry: Entry): Entry => {

  if('discharge' in entry){
    if('date' in entry.discharge && 'criteria' in entry.discharge){
      z.date().parse(entry.discharge.date)
      z.string().parse(entry.discharge.criteria)
    }
  }
  
}

const validateEntryOccupational = (entry: Entry): Entry => {

  occupationalEntry.parse(entry)

  return entry
  
}


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