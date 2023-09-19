import React from 'react'
import SinglePatientComponent from '../../component/SinglePatientCompnent'

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