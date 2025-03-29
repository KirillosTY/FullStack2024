import express from 'express'
import { Request, Response } from 'express'
import { patientNotSSN, newPatient } from '../types'
import patientService from '../services/patientService'
import { errorMiddleware, newPatientParser } from '../middleware/patientParser'

const router = express.Router()


router.get('/', )

router.get('/', (_req, res: Response<patientNotSSN[]> ) => {

  res.send(patientService.getPatients())
});


router.post('/',newPatientParser,(_req:Request<unknown,unknown, newPatient>, res:Response<patientNotSSN>) => {
  
  const updatedPatients:patientNotSSN = patientService.addPatient(_req.body);

  res.json(updatedPatients);


  
})

router.use(errorMiddleware)

export default router