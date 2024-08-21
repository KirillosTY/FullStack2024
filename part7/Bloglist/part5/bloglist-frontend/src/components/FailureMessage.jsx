import failureStyles from '.././styles/failurePopup.css'

const FailureMessage = ({ failureMessage }) => {
  if (failureMessage) {
    return <div className="container">
    {(failureMessage &&
      <Alert variant="success">
        {failureMessage}
      </Alert>
    )}
    
  </div>
  }
}

export default FailureMessage
