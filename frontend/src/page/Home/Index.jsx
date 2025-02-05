import Home from './Home'
import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Profile from './Profile'
import Navbar from '@/components/shared/Navbar'

const Index = () => {
  return (
    <>
    <Navbar />
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/profile' element={<Profile />} />
      <Route path='/*' element={<>404 Not Found</>} />
    </Routes>
    </>
  )
}

export default Index