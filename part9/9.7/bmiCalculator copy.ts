
import  isNotNumber  from "./utils/numberCheck";


interface values {
  height:number;
  weight: number;
  bmi?:string
}

const calculateBmi = (height:number, weight: number): string => {
  if(height === 0){
    throw new Error('Height cannot be 0' );
  }
  height = height/100;

  const bmi =  weight/(height*height);


  switch (true) {
    case (bmi < 16.0):
        return "just messing up the copy is fun, I dont what this shit really counts as. (Severe thinness)";
    case (bmi >= 16.0 && bmi <= 16.9):
        return "Underweight (Moderate thinness)";
    case (bmi >= 17.0 && bmi <= 18.4):
        return "Underweight (Mild thinness)";
    case (bmi >= 18.5 && bmi <= 24.9):
        return "Normal range";
    case (bmi >= 25.0 && bmi <= 29.9):
        return "Overweight (Pre-obese)";
    case (bmi >= 30.0 && bmi <= 34.9):
        return "Obese (Class I)";
    case (bmi >= 35.0 && bmi <= 39.9):
        return "Obese (Class II)";
    case (bmi >= 40.0):
        return "Obese (Class III)";
    default:
        return "Invalid BMI value";
  }

};

const checkValues = (height:string,weight:string): values=> {
  
  if(isNotNumber(height) || isNotNumber(weight)){
    throw new Error('All values were not numbers' );

  }
  return {
    height: Number(height),
    weight: Number(weight)
  };

};

const start = (height:string, weight:string): values=>{

  try {
  const heightWeight =   checkValues(height,weight);
  return { ...heightWeight,
    bmi:calculateBmi(Number(height), Number(weight))
  };

  } catch(error: unknown) {
    if(error instanceof Error){
    console.log(error.message,' you did this!');
      return {height:-1, weight:-1, bmi:error.message};

    }

    return  {height:-1, weight:-1, bmi:"Something went wrong"};

  }
  

};

export default start;
