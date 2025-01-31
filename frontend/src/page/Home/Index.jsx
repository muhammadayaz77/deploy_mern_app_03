import Home from './Home'
import React from 'react'
import { Route, Routes } from 'react-router-dom'

const Index = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/*' element={<>404 Not Found</>} />
    </Routes>
  )
}

export default Index