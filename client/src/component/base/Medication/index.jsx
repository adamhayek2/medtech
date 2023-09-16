import React from 'react'
import { ReactComponent as PillSVG } from "../../../resources/svg/pill.svg";


const Medication = ({name, frequency, to, medicationName, dosage}) => {
  return (
    <div className='flex flex-col gap-5 p-3 items-center'>
        <div className='font-[18px]'>{to}</div>
        <div className='text-base text-[#7D7D7D] italic'>{frequency}</div>
        <div className='flex flex-row gap-3'>
            <PillSVG/>
            <div className='flex flex-col'>
                <div>{name}</div>
                <div>{dosage}</div>
            </div>
        </div>
    </div>
  )
}

export default Medication