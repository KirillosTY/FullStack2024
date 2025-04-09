import data from '../data/patients';
import { newPatient,NonSensitivePatient, patientNotSSN, Patient, Entry } from '../types';


let memory = data;
const getPatients = ():NonSensitivePatient[] => {
  return memory.map(({id,name,dateOfBirth,gender,occupation})=>{

    const gendered = gender;
    
    return ({
    id,
    name,
    dateOfBirth,
    gender:gendered,
    occupation
  });
});
};
console.log("we went to add entry");


const addPatient = (newPatient:newPatient): NonSensitivePatient => {



  memory = memory.concat(newPatient);




  return newPatient;
};


const addPatientEntry = (id: string,newPatientEntry:Entry): Patient | undefined=> {
  console.log("we went to add entry", Date.now());

  const foundPatient = memory.find(patient => patient.id === id);

  if(foundPatient){
    
    foundPatient.entries = foundPatient.entries.concat(newPatientEntry);
    memory = memory.concat(foundPatient);

    
    return foundPatient;

  } else {
  //validate here
    
  }

  return undefined;



};


const getPatientById = (idString:string):patientNotSSN | undefined => {
  const foundPatient = {...memory.find(patient => patient.id === idString)} as patientNotSSN;
  
  
  if(foundPatient){

    return foundPatient;
    
  }

  return undefined;
};


export default {getPatients: getPatients, addPatient,getPatientById, 
 addPatientEntry
};