import express from 'express'
import { Response } from 'express'
import { patientNotSSN } from '../types'
import patientService from '../services/patientService'


const router = express.Router()


router.get('/', )

router.get('/', (_req, res: Response<patientNotSSN[]> ) => {
  res.send(patientService.getPatients())
});


export default router;