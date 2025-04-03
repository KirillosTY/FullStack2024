import { JSX } from "react"

interface ErrorInfoMessage {
  info: string;
}

const ErrorInfo = ({info}:ErrorInfoMessage) :JSX.Element => {

  if(info){
    return <div><p>{info}</p></div>

  }

  return <div> <p>test</p></div>
  

}

export default ErrorInfo