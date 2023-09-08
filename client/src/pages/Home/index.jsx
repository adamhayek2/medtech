import React from 'react'
import NavBar from '../../component/NavBar'
import SideNav from '../../component/SideNav'
import PatienCard from '../../component/PatientCard'

const Home = () => {

  return (
    <div className='flex flex-col font-futur'>
      <NavBar/> 
      <div className='flex flex-row'>
        <SideNav/>
        <PatienCard name={"Adam Hayek"} illness={"Normal"} status={"free to go"}/>
      </div>
    </div>
  )
}

export default Home