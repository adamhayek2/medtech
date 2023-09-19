import React from 'react'
import { ReactComponent as PatientDiseaseSVG } from "../../resources/svg/patient_disease.svg";
import { ReactComponent as VirusSVG } from "../../resources/svg/virus.svg";

const DashboardStatisticsCard = ({about, number, label}) => {
  return (
    <div className='flex flex-col gap-9 py-12 px-5 bg-white rounded-lg'>
        {about === "virus" ?  <VirusSVG/> : <PatientDiseaseSVG/>}
        <div className='text-[32px] text-primary font-bold'>{number}</div>
        <div className='text-xl text-black font-bold'>{label}</div>
    </div>
  )
}

export default DashboardStatisticsCard