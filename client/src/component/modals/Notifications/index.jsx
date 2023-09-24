import React, {useState,useEffect} from 'react'

const Notifications = ({open, onClose}) => {
  if(!open) return null
  return (
    <div onClick={onClose} className='flex flex-row justify-end fixed w-full min-h-full bg-[#000000]/30 z-10 top-0 left-0 overflow-y-scroll'>
      <div className={`flex flex-col bg-white w-1/4 p-10 justify-center items-center transition-transform duration-[0.2s] ease-[ease-in-out] gap-6 ${!open ? 'translate-x-full' : 'translate-x-0'}`}>
        
      </div>
    </div>
  )
}

export default Notifications