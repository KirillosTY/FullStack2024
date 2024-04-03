

const App = () => {

  const course = {
    name:'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]

  }

  return (
    <div>
      <Header course ={course.name}> </Header>
      <Content parts ={course.parts}/>
      <Total parts ={course.parts}/>
    </div>
  )
}

const Header = (props) => {
  return <h1>{props.course}</h1>
}

const Content= (parts) => {

  return [
      <div>
        {parts.parts.map(c => <p>{c.name} {c.exercises}</p>)}
      </div>
  ]
}




const Total = (parts) => {
  const values = parts.parts

  return [
    <>
      <p>
        Number of exercises   {values[0].exercises + values[1].exercises +values[2].exercises}
      </p>
    </>
  ]

}
export default App