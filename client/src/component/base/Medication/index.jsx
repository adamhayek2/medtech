import React from 'react'
import { ReactComponent as PillSVG } from "../../resources/svg/pill.svg";


const Medication = ({name, frequency, to, medicationName}) => {
  return (
    <div className='flex flex-col gap-2 p-3'>
        <div className='font-[18px]'>{name}</div>
        <div className='text-base text-[#7D7D7D] italic'>{frequency}</div>
        <div className='text-base text-[#7D7D7D] italic'>{to}</div>
        <div className='flex flex-row gap-3'>
            <PillSVG/>
            <div>{medicationName}</div>
        </div>
    </div>
  )
}

export default Medication