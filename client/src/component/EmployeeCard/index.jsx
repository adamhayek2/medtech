import React from 'react'
import { useNavigate } from 'react-router-dom';
import { ReactComponent as ArrowSVG } from "../../resources/svg/arrow.svg";


const EmployeeCard = ({name, id, department, major, hireDate}) => {

  const navigate = useNavigate();

  const openEmployeeProfile = () => {
    navigate(`/employee/${id}`);
  }


  return (
    <div className='flex flex-col p-6 rounded-lg w-[31%] grow-0 bg-white cursor-pointer' onClick={openEmployeeProfile}>
      <p className='text-[22px] font-bold font text-primary'>{name}</p>
      <div className='w-full flex flex-row justify-between items-end'>
        <div>
          <p className='text-base'>Department: {department}</p>
          <p className='text-base'>Major: {major}</p>
          <p className='text-base italic text-[#000000]/50'>Hired at: {hireDate}</p>
        </div>
        <ArrowSVG/>
      </div>
    </div>
  )
}

export default EmployeeCard