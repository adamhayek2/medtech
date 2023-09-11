import React from 'react'
import { ReactComponent as LogoSVG } from "../../resources/svg/logo.svg";
import { ReactComponent as NotificationSVG } from "../../resources/svg/notification-thin.svg";
import { ReactComponent as Profile } from "../../resources/svg/profile.svg";

const NavBar = () => {
  return (
    <div className='sticky top-0 flex-no-wrap relative flex w-full items-center justify-between bg-primary py-2 shadow-md shadow-black/5 dark:bg-neutral-600 dark:shadow-black/10 lg:flex-wrap lg:justify-start lg:py-6'>
        <div className='flex w-full flex-wrap items-center justify-between px-6'>
            <div className='flex justify-center items-center gap-3'>
                <LogoSVG width={"56px"}/>
                <h1 className='text-4xl text-white'>medtech</h1>
            </div>
            <div className='flex justify-center items-center gap-6'>
                <NotificationSVG height={"35px"} width={"32px"}/>
                <Profile height={"35px"}/>
            </div>
        </div>
    </div>
  )
}

export default NavBar