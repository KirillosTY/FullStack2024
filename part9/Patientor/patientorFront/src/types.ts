export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other"
}

interface EntryBase {
  id?: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnosis['code']>;
}

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3
}

interface HealthCheckEntry extends EntryBase {
  type: "HealthCheck";
  HealthCheckRating: HealthCheckRating;
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

export interface Patient {
  id: string;
  name: string;
  occupation: string;
  gender: Gender;
  ssn?: string;
  dateOfBirth?: string;
  entries?:Entry[]
}

export type PatientFormValues = Omit<Patient, "id">;


export const placeholderPatient = {
  id: '',
  name:'',
  occupation: '',
  gender: 'female' as Gender,
  ssn:''};