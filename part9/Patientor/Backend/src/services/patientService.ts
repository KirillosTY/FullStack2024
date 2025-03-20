import patients from '../data/patients';
import { patientNotSSN } from '../types';


const getPatients = ():patientNotSSN[] => {
  return patients.map(({id,name,dateOfBirth,gender,occupation})=> ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  

  }))
};


export default {getPatients: getPatients};