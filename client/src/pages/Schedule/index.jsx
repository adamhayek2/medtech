import React from 'react'
import NavBar from '../../component/NavBar'
import SideNav from '../../component/SideNav'
import CalenderComponent from '../../component/CalenderComponent'

const Schedule = () => {
  return (
    <div className='flex flex-col font-futur'>
      <NavBar/> 
      <div className='flex flex-row'>
        <SideNav/>
        <CalenderComponent/>
      </div>
    </div>
  )
}

export default Schedule