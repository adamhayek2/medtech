import React from 'react'
import NavBar from '../../component/NavBar'
import SideNav from '../../component/SideNav'
import Patients from '../../component/Patients'

const Home = () => {

  return (
    <div className='flex flex-col font-futur'>
      <NavBar/> 
      <div className='flex flex-row'>
        <SideNav/>
        <Patients/>
      </div>
    </div>
  )
}

export default Home