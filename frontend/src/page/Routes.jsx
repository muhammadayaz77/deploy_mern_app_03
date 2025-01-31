import React from 'react'
import { Route,Routes } from 'react-router-dom'
import Auth from './Auth/Index'
import Home from './Home/Index'

const Index = () => {
  return (
    <Routes>
      <Route path='/*' element={<Home />} />
      <Route path='/auth/*' element={<Auth />} />
    </Routes>
  )
}

export default Index