import React,{useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom';
import { ReactComponent as LogoSVG } from "../../resources/svg/logo.svg";
import { ReactComponent as NotificationSVG } from "../../resources/svg/notification-thin.svg";
import { ReactComponent as Profile } from "../../resources/svg/profile.svg";
import UserLogout from '../../apis/UserLogout';

const NavBar = () => {
  const [showOptions, setShowOptions] = useState(false);
  const [error, setError] = useState(false);

  const handleMouseEnter = () => {
    setShowOptions(true);
  };

  const handleMouseLeave = () => {
    setShowOptions(false);
  };

  const navigate = useNavigate();

  const handleSeeProfileClick = () => {
        navigate('/profile');
  };

  const handleLogoutClick = async () => {
    try {
      setError(false); 
      const token = localStorage.getItem("token");
      const response = await UserLogout(token);
      navigate('/');
    } catch (error) {
      setError(true); 
      console.error('error:', error);
    }
  } 

  return (
    <div className='sticky top-0 flex-no-wrap relative flex w-full items-center justify-between bg-primary py-2 shadow-md shadow-black/5 dark:bg-neutral-600 dark:shadow-black/10 lg:flex-wrap lg:justify-start lg:py-6 z-10'>
        <div className='flex w-full flex-wrap items-center justify-between px-6'>
            <div className='flex justify-center items-center gap-3'>
                <LogoSVG width={"56px"}/>
                <h1 className='text-4xl text-white'>medtech</h1>
            </div>
            <div className='flex justify-center items-center gap-6'>
                <NotificationSVG height={"35px"} width={"32px"} />
                <div onMouseEnter={handleMouseEnter}
                    >
                  <Profile height={"35px"}/>
                  {showOptions && (
                    <div className="flex flex-col gap-3 absolute translate-x-[-120px] translate-y-[5px] bg-white w-40 rounded-lg"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}>
                      <button onClick={handleSeeProfileClick} className='px-6 py-3 hover:bg-primary/20 hover:text-primary hover:font-bold transition transition ease-in-out transition-delay-none duration-150'>See Profile</button>
                      <button onClick={handleLogoutClick} className='px-6 py-3 hover:bg-primary/20 hover:text-primary hover:font-bold transition transition ease-in-out transition-delay-none duration-150'>Logout</button>
                    </div>
                  )}
                </div>
              </div>
            </div>
        </div>
    
  )
}

export default NavBar