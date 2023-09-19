import React from 'react'
import NavBar from '../../component/NavBar'
import SideNav from '../../component/SideNav'
import Patients from '../../component/Patients'

const Home = () => {

  return (
    <div className='flex flex-col font-futur'>
      <NavBar/> 
      <div className='flex flex-row'>
        <SideNav active={'Patients'}/>
        {/* <PatienCard name={"Adam Hayek"} illness={"Normal"} status={"free to go"}/> */}
        <Patients/>
      </div>
    </div>
  )
}

export default Home