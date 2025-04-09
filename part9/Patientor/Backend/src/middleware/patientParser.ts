import { NextFunction } from "express";
import { z } from "zod";
import {Request, Response} from 'express';
import {  newEntry } from "../utils/toPatientFormat";


export const newPatientParser = (req: Request, _res: Response, next: NextFunction)=> {
  try {
    //newPatientSchema.parse(req.body);
    console.log(req.body, 'to keep this abay')
    next();
  } catch (error :unknown) {

      next(error);
    
  }
};





export const newEntryParser = (req: Request, _res: Response, next: NextFunction)=> {
  try {

    newEntry.parse(req.body);
    next();
  } catch (error :unknown) {

      next(error);
    
  }
};

export const errorMiddleware = (error: unknown, _req:Request, res:Response, next: NextFunction)=> {

  if(error instanceof z.ZodError){
    console.log(error);
    res.status(400).send({error: error.message +error});
  } else {
    next(error);
  }
};


