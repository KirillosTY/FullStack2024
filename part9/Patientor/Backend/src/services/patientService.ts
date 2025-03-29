import data from '../data/patients';
import { newPatient, patientNotSSN } from '../types';
import {v1 as uuid} from 'uuid'


let memory = data
const getPatients = ():patientNotSSN[] => {
  return memory.map(({id,name,dateOfBirth,gender,occupation})=> ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  

  }))
};


const addPatient = (newPatient:newPatient): patientNotSSN => {

  const patientToAdd = {id:uuid(),...newPatient}

  memory = memory.concat(patientToAdd)

  const {ssn, ...rest} = patientToAdd;



  return {...rest}
}


export default {getPatients: getPatients, addPatient};