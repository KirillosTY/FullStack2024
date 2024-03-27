const App = () => {
    
  const course = {
      name:'Half Stack application development',
      'parts': [
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
    <>
    
        <Header course={course}/>
   
        <Content course={course.parts}/>
    
        <Total course={course.parts}/>
    </>
  )
}

const Header = (course) => {

console.log("Käydään")
  return [<h1>{course.course.name}</h1>]
}

const Content = (course) => {
   console.log(course)
  return (<div>
    {course.course.map(c => <p key={c.name} >{c.name}</p>)}
  </div>)
}

const Total = (course) => {
    
  let total = 0;
  course.course.map(c => c.exercises).forEach(exercise => total+=exercise)
  return [<div>
    Number of exercises: {total}
  </div>]
}
export default App