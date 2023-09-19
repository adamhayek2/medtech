import React from 'react'

const SinglePatient = () => {
  return (
    <div className='flex flex-col font-futur'>
      <NavBar/> 
      <div className='flex flex-row'>
        <SideNav active={'Dashboard'}/>
      </div>
    </div>
  )
}

export default SinglePatient