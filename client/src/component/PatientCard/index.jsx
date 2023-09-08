import React from 'react'
import { ReactComponent as ArrowSVG } from "../../resources/svg/arrow.svg";


const PatienCard = ({name, illness, status}) => {
  return (
    <div className='flex flex-col gap-1 p-6 rounded-lg w-1/5 h-full'>
        <p className='text-[22px] font-bold font text-primary'>{name}</p>
        <p className='text-base font-futuraBK  '>{illness}</p>
        <div className='w-full flex flex-row justify-between'>
            <p className='text-xl'>{status}</p>
            <ArrowSVG/>
        </div>
    </div>
  )
}

export default PatienCard