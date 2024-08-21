import React, { useState } from 'react'
import PropTypes from 'prop-types'
import {Button } from 'react-bootstrap'

const Togglable = React.forwardRef((props, ref) => {
  const [shown, setShown] = useState(false)

  const shouldShow = { display: shown ? 'none' : '' }
  const shouldHide = { display: shown ? '' : 'none' }

  const toggleShow = shown => {
    setShown(shown)
  }

  Togglable.propTypes = {
    buttonLabel: PropTypes.string.isRequired,
  }

  return (
    <div>
      <div style={shouldShow}>
        <Button variant="primary" onClick={() => toggleShow(true)}>New blog</Button>
      </div>
      <div style={shouldHide} >
      {props.children} 
       <Button variant="secondary" onClick={() => toggleShow(false)}>cancel</Button>
      </div>
    </div>
  )
})

Togglable.displayName = 'Togglable'

export default Togglable
