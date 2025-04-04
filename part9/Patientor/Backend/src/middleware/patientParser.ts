import { NextFunction } from "express";
import { newPatientSchema } from "../utils/toPatientFormat";
import { z } from "zod";
import {Request, Response} from 'express';


export const newPatientParser = (req: Request, _res: Response, next: NextFunction)=> {
  try {
    newPatientSchema.parse(req.body);
    next();
  } catch (error :unknown) {

      next(error)
    
  }
}


export const errorMiddleware = (error: unknown, _req:Request, res:Response, next: NextFunction)=> {

  if(error instanceof z.ZodError){
    res.status(400).send({error: error.issues})
  } else {
    next(error)
  }
}


