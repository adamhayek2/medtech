import React from 'react'
import { ReactComponent as DashboardSVG } from "../../resources/svg/dashboard_icon.svg";
import { ReactComponent as EmployeesSVG } from "../../resources/svg/employees_icon.svg";
import { ReactComponent as ScheduleSVG } from "../../resources/svg/schedule_icon.svg";
import { ReactComponent as ReportSVG } from "../../resources/svg/reports_icon.svg";
import { ReactComponent as PatientSVG } from "../../resources/svg/patients_icon.svg";

const SideNav = () => {
    const role = localStorage.getItem('role')
    console.log(role)
  return (
    <div className='fixed w-1/6 h-screen bg-secondary flex flex-col p-6 text-white'> 
        <div className='flex flex-col gap-10 items-start'>
            {role === "admin" ? (
                <>
                <div className='flex flex-row justify-center items-center gap-3'>
                    <DashboardSVG/>
                    <p className='text-2xl'>Dashboard</p>
                </div>
                <div className='flex flex-row justify-center items-center gap-3'>
                    <EmployeesSVG/>
                    <p className='text-2xl'>Employees</p>
                </div>
                </>
            ) : "" }
            <div className='flex flex-row justify-center items-center gap-3'>
                <ScheduleSVG/>
                <p className='text-2xl'>Schedule</p>
            </div>
            <div className='flex flex-row justify-center items-center gap-3'>
                <ReportSVG/>
                <p className='text-2xl'>Report</p>
            </div>
            <div className='flex flex-row justify-center items-center gap-3'>
                <PatientSVG/>
                <p className='text-2xl'>Patients</p>
            </div>
        </div>
    </div>
  )
}

export default SideNav