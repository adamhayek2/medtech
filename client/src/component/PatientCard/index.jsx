import React from 'react'
import { useNavigate } from 'react-router-dom';
import { ReactComponent as ArrowSVG } from "../../resources/svg/arrow.svg";


const PatienCard = ({name, id, status}) => {

  const navigate = useNavigate();

  const openPatientProfile = () => {
    navigate(`/patient/${id}`);
  }


  return (
    <div className='flex flex-col p-6 rounded-lg w-[31%] grow-0 bg-white cursor-pointer' onClick={openPatientProfile}>
        <p className='text-[22px] font-bold font text-primary'>{name}</p>
        {/* <p className='text-base font-futuraBK  '>{illness}</p> */}
        <div className='w-full flex flex-row justify-between'>
            <p className='text-base'>{status}</p>
            <ArrowSVG/>
        </div>
    </div>
  )
}

export default PatienCard