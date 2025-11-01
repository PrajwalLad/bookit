import react from 'react'
import Homepage from './pages/Homepage'
import { Routes, Route } from 'react-router-dom'
import Details from './pages/Details'
import Checkout from './pages/Checkout'
import Success from './pages/Success'

function App() {

  return (
    <Routes>
      <Route path='/' element={<Homepage/>}/>
      <Route path='/details/:id' element={<Details/>} />
      <Route path='/checkout/:id' element={<Checkout/>} />
      <Route path='/success' element={<Success/>} />
    </Routes>
  )
}

export default App
