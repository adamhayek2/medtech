import React from 'react'
import NavBar from '../../component/NavBar'
import SideNav from '../../component/SideNav'
import DashboardComponent from '../../component/DashboardComponent'

const Dashboard = () => {
  return (
    <div className='flex flex-col font-futur'>
      <NavBar/> 
      <div className='flex flex-row'>
        <SideNav active={'Dashboard'}/>
        <DashboardComponent/>
      </div>
    </div>
  )
}

export default Dashboard