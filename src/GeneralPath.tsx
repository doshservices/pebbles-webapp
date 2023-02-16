import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from './components/General/Footer'
import Header from './components/General/Header'

const GeneralPath = () => {
  return (
    <>
      <Header />
      <div>
        <Outlet />
      </div>
      <Footer />
    </>
  )
}

export default GeneralPath
