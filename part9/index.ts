import express  from "express";
import start from "./bmiCalculator";
import startCalc from "./exerciseCalculator"

const app = express();

app.use(express.json())


app.get('/bmi',(req, res)=> {

  const height =req.query.height as string;
  const weight = req.query.weight as string; 

  const message = start(height,weight); 


  res.send(message);
});

app.post('/exercises', (req,res) => {
  if(req.body === undefined){
    console.log('Still ',req.body);
    res.send("Not found")
  }
  const  daily_exercises: string[] = req.body.daily_exercises
  const target:string = req.body.target


  const message = startCalc(daily_exercises, target);

  res.send(message)
})


app.get('/hello', (_req,res) => {
  res.send("Hello full stack");
});


app.listen(4000,()=> {
  console.log("Listening on port 4000");
});