import React from 'react'
import { ReactComponent as ArrowSVG } from "../../resources/svg/arrow.svg";


const PatienCard = ({name, illness, status}) => {
  return (
    <div className='flex flex-col p-6 rounded-lg w-[31%] grow-0 bg-white'>
        <p className='text-[22px] font-bold font text-primary'>{name}</p>
        <p className='text-base font-futuraBK  '>{illness}</p>
        <div className='w-full flex flex-row justify-between'>
            <p className='text-base'>{status}</p>
            <ArrowSVG/>
        </div>
    </div>
  )
}

export default PatienCard