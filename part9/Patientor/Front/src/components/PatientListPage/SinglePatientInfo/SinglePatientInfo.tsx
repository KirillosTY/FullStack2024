
import { Diagnosis, Entry, Patient, PatientFormValues } from "../../../types";
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import { Transgender } from "@mui/icons-material";
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import AtmIcon from '@mui/icons-material/Atm';
import HeartBrokenIcon from '@mui/icons-material/HeartBroken';
import SvgIcon from "@mui/icons-material/Male";
import CheckIcon from '@mui/icons-material/Check';
import React from "react";
import patientService from '../../../services/patients';

import NewEntryForm from "./newEntry/NewEntryForm";
import axios from "axios";
import { redirect } from "react-router-dom";

interface PatientFound {
  patient: Patient
  setPatient: React.Dispatch<React.SetStateAction<Patient>>
  diagnoses: Diagnosis[]
}


const SinglePatientInfo = ({patient,setPatient,diagnoses}: PatientFound): JSX.Element => {

  console.log(patient);

  if(patient.name === ''){
     (redirect('/'));
  }

  console.log(diagnoses);
  const icon = patient.gender === 'male'? MaleIcon : (patient.gender === 'female'? FemaleIcon: Transgender);


  const checkEntryType = (entry:Entry) => {

    switch (entry.type){
      case 'Hospital':
        return MonitorHeartIcon;
      case 'HealthCheck':
        return AtmIcon;
      case 'OccupationalHealthcare':
        return HeartBrokenIcon;
      default:
        return CheckIcon;

    }
    
  };
  const submitNewEntries = async (entry:Entry) => {
    try {
      console.log(entry);
      
      const patientUpSuccess = await patientService.addPatientEntry(patient.id,entry);
      console.log('päästiin tänne');
      
      setPatient(patientUpSuccess);
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        if (e?.response?.data && typeof e?.response?.data === "string") {
          const message = e.response.data.replace('Something went wrong. Error: ', '');
          console.error(message);
        } else {
        }
      } else {
        console.error("Unknown error", e);
      }
    }
    
  };



  return (<div key={patient.id}>

    <h2>{patient.name} <SvgIcon component={icon}/></h2>
    <p>ssn: {patient.ssn}</p>
    <p>occupation: {patient.occupation}</p>
     
    <h2>Entries</h2>
  
    <NewEntryForm diagnoses={diagnoses} submitEntry={submitNewEntries}/>
    <br/>
    <br/>
    <br/>

    <ol>{ patient.entries?.map(entry => {


      return <div>
        <h3>{entry.date}</h3><SvgIcon component={checkEntryType(entry)}></SvgIcon>
         <p>{entry.description}</p>
        <ul>{entry.diagnosisCodes?.map(code=> diagnoses?
         <li key={code+entry.date}>{code +" "+ diagnoses.find(listCode => listCode.code === code)?.name} </li> : <li key={code}>{code}</li>)} </ul>
        </div>; 

        
    })}
    </ol>

  </div>);



};

export default SinglePatientInfo;