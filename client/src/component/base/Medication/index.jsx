import React from 'react'
import { ReactComponent as PillSVG } from "../../../resources/svg/pill.svg";


const Medication = ({name, frequency, dosage}) => {
  return (
    <div className='flex flex-col gap-5 px-12 py-10 items-center bg-primary/20 rounded-lg border-[1px] border-dashed border-primary'>
        <div className='text-[20px]'>{name}</div>
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