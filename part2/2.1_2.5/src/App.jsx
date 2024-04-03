import './components/Course.jsx' 
import Course from './components/Course.jsx'

const App = () => {

  const course = [ {
    name:'Half Stack application development',
    id:0,
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id:1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id:2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id:3
      }
      
    ]},
    { 
      name:'muumi',
      id:1,
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id:1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id:2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id:3
      }
      
    ]

  }
  ]

  
return (
  <>
  {course.map(course => 
    <div key={course.id}>
      <Course course={course}></Course>
    </div>)}
 </>
)
  }



export default App