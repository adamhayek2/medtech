import React from 'react'
import NavBar from '../../component/NavBar'
import SideNav from '../../component/SideNav'
import EmployeesComponent from '../../component/EmployeesComponent'

const Employees = () => {
  return (
    <div className='flex flex-col font-futur'>
      <NavBar/> 
      <div className='flex flex-row'>
        <SideNav/>
        <EmployeesComponent/>
      </div>
    </div>
  )
}

export default Employees