import express from 'express';
import { Request, Response } from 'express';
import {  Entry, newPatient, NonSensitivePatient, Patient, patientNotSSN } from '../types';
import patientService from '../services/patientService';
import { errorMiddleware, newEntryParser, newPatientParser } from '../middleware/patientParser';

const router = express.Router();


router.get('/:id', (_req, res: Response<patientNotSSN> ) => {

  res.send(patientService.getPatientById(_req.params.id));
});


router.get('/', (_req, res: Response<NonSensitivePatient[]> ) => {

  res.send(patientService.getPatients());
});


router.post('/',newPatientParser,(_req:Request<unknown,unknown, newPatient>, res:Response<NonSensitivePatient>) => {
  
  const updatedPatients:NonSensitivePatient = patientService.addPatient(_req.body);

  res.json(updatedPatients);


  
});



router.put('/:id',newEntryParser,(_req:Request<{id:string}, unknown, Entry>, res:Response<Patient>) => {
  console.log(_req.body, "correct");
  

  const patientId = _req.params.id;
  
  const entry: Entry = _req.body; 

  const updatedPatients = patientService.addPatientEntry(patientId,entry);
  
  res.json(updatedPatients);


  
});

router.use(errorMiddleware);

export default router;