import { useEffect, useState } from 'react'
import axios from 'axios'

function App() {
  const [message, setMessage] = useState('')

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/test/')
      .then(response => {
        setMessage(response.data.message)
      })
      .catch(error => {
        console.error('Error fetching message:', error)
      })
  }, [])

  return (
    <div>
      <h1>DocuNow</h1>
      <p>{message}</p>
    </div>
  )
}

export default App