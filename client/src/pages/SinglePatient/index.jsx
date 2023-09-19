import React from 'react'
import SinglePatientComponent from '../../component/SinglePatientCompnent'
import NavBar from '../../component/NavBar'
import SideNav from '../../component/SideNav'

const SinglePatient = () => {
  return (
    <div className='flex flex-col font-futur'>
      <NavBar/> 
      <div className='flex flex-row'>
        <SideNav active={'Dashboard'}/>
        <SinglePatientComponent/>
      </div>
    </div>
  )
}

export default SinglePatient