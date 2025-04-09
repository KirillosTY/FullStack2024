import { z } from "zod";
import { newEntry, newEntrySchema } from "./utils/toPatientFormat";


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
  "gender": Gender;
  "occupation": string;
  "entries": Entry[];
}

export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other'

}


interface EntryBase {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnose['code']>;
}

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3
}

interface HealthCheckEntry extends EntryBase {
  type: "HealthCheck";
  healthCheckRating: HealthCheckRating;
}

interface OccupationalHealthcareEntry extends EntryBase {
  type:"OccupationalHealthcare";
  employerName: string;
  sickLeave?: {
    startDate: string,
    endDate: string
  }
}

interface HospitalEntry extends EntryBase {
  type: "Hospital";
  discharge: {
    date: string;
    criteria: string
  }
}


export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;


export type NonSensitivePatient = Omit<patientNotSSN, 'entries'>;
export type newEntry = z.infer<typeof newEntry> | z.infer<typeof newEntrySchema>; 
export type newPatient = Patient;
export type patientNotSSN = Omit<Patient, 'ssn'>;