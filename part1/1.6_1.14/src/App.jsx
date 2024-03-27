import { useState } from 'react'



const Button = ({text,handler}) => {

  return (<button onClick={handler}>{text}</button>)
}

const ValueDisplayer = ({side, value}) => {
  return (<tr>
    <td>{side}</td>
    <td>{value}</td>
  </tr>)
}

const Average = ({total, valuecombined}) => {
  return (<div>Average  {valuecombined/total}</div>)
}
const Percentage = ({good, total}) => {

  return (<div>Positive {good*100/total}%</div>)
}

const Statistics =({good,bad,neutral}) => {
  
  if(good+bad+neutral===0){
    return <>
      <h1>Statistics</h1>
      <p>No feedback given</p>          
    </>
  }

  return (<>
      <h1>Statistics</h1>
      <table>
        <tbody>
          <ValueDisplayer side={'Good'} value={good}></ValueDisplayer>
          <ValueDisplayer side={'Neutral'} value={neutral}></ValueDisplayer>
          <ValueDisplayer side={'Bad'} value={bad}></ValueDisplayer>
          <ValueDisplayer side={'All'} value={bad+neutral+good}></ValueDisplayer>
      </tbody>
      </table>
      <Average total={(good+bad+neutral)} valuecombined={good-bad} ></Average>
      <Percentage total={good+bad+neutral} good={good}></Percentage>
  </>)
}

function App() {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)


  const handleGood = () =>  {
    setGood(good+1)
  }
  const handleNeutral = () =>  {
    setNeutral(neutral+1)
  }
  const handleBad = () =>  {
    setBad(bad+1)
  }

  return (
    <>
     <h1>Give feedback</h1>
      <p><Button text={'Good'} handler={handleGood}></Button>
      <Button text={'Neutral'} handler={handleNeutral}></Button>
      <Button text={'Bad'} handler={handleBad}></Button>
      </p>
      <Statistics good={good} bad={bad} neutral={neutral}></Statistics>
      
    </>
  )
}

export default App
