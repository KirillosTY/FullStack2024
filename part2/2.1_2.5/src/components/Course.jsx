
const Course = ({course}) => {

  return (
    <div>
      <Header course ={course.name}/> 
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
      <div key={'Content'}>
        {parts.parts.map(c => <p key={c.id}>{c.name} {c.exercises}</p>)}
      </div>
  ]
}
  
  
  const Total = (parts) => {
    const values = parts.parts
  
    return [
      <div key={'total'}>
        <p >
          Total of {values.map(exercises => exercises.exercises).reduce((total, currentValue) => total + currentValue)} exercises 
        </p>
      </div>
    ]
  
  }
  
  export default Course