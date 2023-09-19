import React from 'react'
import NavBar from '../../component/NavBar'
import SideNav from '../../component/SideNav'
import SingleReportComponent from '../../component/SingleReportComponent'

const SingleReport = () => {
  return (
    <div className='flex flex-col font-futur'>
      <NavBar/> 
      <div className='flex flex-row'>
        <SideNav/>
        <SingleReportComponent/>
      </div>
    </div>
  )
}

export default SingleReport