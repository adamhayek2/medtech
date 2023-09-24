import React, {useState,useEffect} from 'react'

const Notifications = ({open, onClose}) => {
    if(!open) return null
  return (
    <div onClick={onClose} className='flex flex-row justify-end fixed w-full min-h-full bg-[#000000]/30 z-10 top-0 left-0 overflow-y-scroll'>

    </div>
  )
}

export default Notifications