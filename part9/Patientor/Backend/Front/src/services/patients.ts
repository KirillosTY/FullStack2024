import axios from "axios";
import { Entry, Patient, PatientFormValues } from "../types";

import { apiBaseUrl } from "../constants";

const getAll = async () => {
  const { data } = await axios.get<Patient[]>(
    `${apiBaseUrl}/patients`
  );

  return data;
};

const create = async (object: PatientFormValues) => {

  const patient = object as Patient;

  const { data } = await axios.post<Patient>(
    `${apiBaseUrl}/patients`,
    patient
  );

  return data;
};

const getPatientById = async (id: string) => {

 const {data} = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`
  );

  return data;
};

const addPatientEntry = async (id: string, object: Entry) => {
  
  const entry = object as Entry; 

 const {data} = await axios.put<Patient>(`${apiBaseUrl}/patients/${id}`,entry);

  return data;
};

export default {
  getAll, create,getPatientById, addPatientEntry
};

