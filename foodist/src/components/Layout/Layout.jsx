import React from 'react'
import Header from '../Header'
import Body from '../Body'
import Footer from '../Footer'
import Routers from '../../Routers/Routes'
const Layout = () => {
  return (
    <div className='overflow-x-hidden'>
        <Header/>
        <Routers/>
        <Footer/>
    </div>
  )
}

export default Layout