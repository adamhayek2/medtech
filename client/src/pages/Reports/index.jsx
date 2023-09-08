import React from 'react'
import NavBar from '../../component/NavBar'
import SideNav from '../../component/SideNav'
import ReportsComponent from '../../component/ReportsComponent'

const Reports = () => {

  return (
    <div className='flex flex-col font-futur'>
      <NavBar/> 
      <div className='flex flex-row'>
        <SideNav/>
        <ReportsComponent/>
      </div>
    </div>
  )
}

export default Reports