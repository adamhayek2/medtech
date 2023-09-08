import React from 'react'
import NavBar from '../../component/NavBar'
import SideNav from '../../component/SideNav'

const Home = () => {

  return (
    <div className='flex flex-col font-futur'>
      <NavBar/> 
      <div>
        <SideNav/>
      </div>
    </div>
  )
}

export default Home