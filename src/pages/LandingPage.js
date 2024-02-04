import React from 'react'
import Nav from '../components/Navbar'
import { Outlet } from 'react-router-dom'
import { Footer, Sidebar } from '../components'

const LandingPage = () => {
  return (
    <div>
      <Nav />
      <Sidebar />
      <Outlet />
      <Footer />
    </div>
  )
}

export default LandingPage