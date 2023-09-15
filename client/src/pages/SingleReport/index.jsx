import React from 'react'
import NavBar from '../../component/NavBar'
import SideNav from '../../component/SideNav'

const SingleReport = () => {
  return (
    <div className='flex flex-col font-futur'>
      <NavBar/> 
      <div className='flex flex-row'>
        <SideNav/>
        
      </div>
    </div>
  )
}

export default SingleReport