import  isNotNumber  from "./utils/numberCheck";

interface trainingAssessment {
  periodLenght: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}



const exerciseCheck = (hoursTrained:number[], target:number):trainingAssessment => {
  if( hoursTrained.length === 0){
    throw new Error('parameters missing')
  }

  let trainedDays: number = 0;

  let hours: number = 0;


  for(let i:number=0; i<hoursTrained.length;i++ ){
    if (hoursTrained[i]!== 0){
      trainedDays++
      hours+= hoursTrained[i]
    }
  }

  const average: number  = hours/hoursTrained.length
  const success: boolean = average/target >= 1

  let description: string =""
  let rating: number  = 0
  if(average/target >= 1){
    description= "Well done!"
    rating = 3;
  } else if(average/target >= 0.5){
    description= "Do better"
    rating = 2;
  } else if(average/target >= 0.25){
    description= "Neighbours son is much better"
    rating = 1;
  }


  return {
    periodLenght:hoursTrained.length,
    trainingDays: trainedDays,
    success: success,
    rating: rating,
    ratingDescription: description,
    target: target,
    average: average
  }
}



const startCalc =(exercises: string[], target:string): trainingAssessment | {error?: string}=> {

  try {

    for(let i=0; i< exercises.length;i++){
      if(isNotNumber(exercises[i])){
        throw new Error("malformatted parameters")
      }
    }
  
    const trained =exercises.map(Number)
    return exerciseCheck(trained,Number(target))
  
  } catch(error) {
    if(error instanceof Error){
      console.log(error.message,' lol');
      return {error: error.message}
    }
  
    return {error: "unaccounted error, seek immediate help"}

  }

}
/*

try {

  for(let i=2; i< process.argv.length;i++){
    if(isNotNumber(process.argv[i])){
      throw new Error("Dear trusted user, there were NaNs on the list.")
    }
  }

  const trained =process.argv.splice(3).map(Number)
  console.log(process.argv.splice(3).map(Number).length,' this here', Number(process.argv[2]));
  console.log(exerciseCheck(trained,Number(process.argv[2])))

} catch(error) {
  if(error instanceof Error){
    console.log(error.message,' lol');
  }


}
*/
export default startCalc