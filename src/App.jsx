import { useState } from 'react'
import Button from '@mui/material/Button';


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1>Library app frontend</h1>
      <Button variant="contained" color="primary">
        Click Me
      </Button>
    </>
  )
}

export default App
