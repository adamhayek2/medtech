import React from 'react'
import NavBar from '../../component/NavBar'
import SideNav from '../../component/SideNav'
import EmployeeProfileComponent from '../../component/EmployeeProfileComponent'

const EmployeeProfile = () => {
  return (
    <div className='flex flex-col font-futur'>
      <NavBar/> 
      <div className='flex flex-row'>
        <SideNav/>
        <EmployeeProfileComponent/>
      </div>
    </div>
  )
}

export default EmployeeProfile