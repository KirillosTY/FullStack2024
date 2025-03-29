import { z } from "zod";
import { newPatientSchema } from "./utils/toPatientFormat";

export interface Diagnose {
  code: string;
  name: string;
  latin?: string;
}

export interface Patient {
  "id": string;
  "name": string;
  "dateOfBirth": string;
  "ssn": string;
  "gender": string;
  "occupation": string;
}

export enum gender {
  male = 'male',
  female = 'female',
  other = 'other'

}

export type newPatient = z.infer<typeof newPatientSchema>
export type patientNotSSN = Omit<Patient, 'ssn'>