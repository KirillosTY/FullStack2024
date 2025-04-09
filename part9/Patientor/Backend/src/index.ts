import express from 'express';
import 'dotenv/config';
import cors from 'cors';

const app = express();

app.use(express.json());

const corsOptions = {
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));

import routerPatients from './routes/routerPatients';
import routerDiagnoses from './routes/routerDiagnoses';


app.get('/api/ping', (_req,res)=> {
  res.send("PONG");
});

app.use('/api/patients',routerPatients);

app.use('/api/diagnoses',routerDiagnoses);

const PORT = process.env.PORT;


app.listen(PORT, ()=> {
  console.log(`Listening on port ${PORT}`);
});