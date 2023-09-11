import React from 'react'

const Schedule = () => {
  return (
    <div className='flex flex-col font-futur'>
      <NavBar/> 
      <div className='flex flex-row'>
        <SideNav/>
        <CalenderComponent/>
      </div>
    </div>
  )
}

export default Schedule