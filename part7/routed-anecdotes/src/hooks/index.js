import { useState } from 'react'

export const useField = (name) => {
  const [value, setValue] = useState('test')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  const reset = () => {
    setValue('')
  }

  return {
    name,
    value,
    onChange,
    reset
  }
}