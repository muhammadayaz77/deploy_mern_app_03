import Navbar from '@/components/shared/Navbar'
import React from 'react'
import { useSelector } from 'react-redux'

const Home = () => {
  const {user} = useSelector(store => store.auth)
  return (
    <div>
      <Navbar />
      <div className="text-h1 max-w-screen-xl mx-auto">
        {
          user?.fullname
        }
      </div>
    </div>
  )
}

export default Home