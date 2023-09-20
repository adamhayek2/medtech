import React from 'react'
import NavBar from '../../component/NavBar'
import SideNav from '../../component/SideNav'

const Employees = () => {
  return (
    <div className='flex flex-col font-futur'>
      <NavBar/> 
      <div className='flex flex-row'>
        <SideNav/>
      </div>
    </div>
  )
}

export default Employees