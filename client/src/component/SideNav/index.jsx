import React from 'react'
import { ReactComponent as DashboardSVG } from "../../resources/svg/dashboard_icon.svg";
import { ReactComponent as EmployeesSVG } from "../../resources/svg/employees_icon.svg";
import { ReactComponent as ScheduleSVG } from "../../resources/svg/schedule_icon.svg";
import { ReactComponent as ReportSVG } from "../../resources/svg/reports_icon.svg";
import { ReactComponent as PatientSVG } from "../../resources/svg/patients_icon.svg";

const SideNav = ({active}) => {
    const role = localStorage.getItem('role')
    console.log(role)
  return (
    <div className='fixed w-1/6 h-screen bg-secondary flex flex-col p-6 text-white'> 
        <div className='flex flex-col gap-10 items-start'>
            {role === "admin" ? (
                <>
                <div className={`${active === 'Dashboard' ? 'font-bold' : '' } flex flex-row justify-center items-center gap-3`}>
                    <DashboardSVG/>
                    <p className={`${active === 'Dashboard' ? 'text-3xl' : 'text-2xl' }`}>Dashboard</p>
                </div>
                <div className={`${active === 'Employees' ? 'font-bold' : '' } flex flex-row justify-center items-center gap-3`}>
                    <EmployeesSVG/>
                    <p className={`${active === 'Employees' ? 'text-3xl' : 'text-2xl' }`}>Employees</p>
                </div>
                </>
            ) : "" }
            <div className={`${active === 'Schedule' ? 'font-bold' : '' } flex flex-row justify-center items-center gap-3`}>
                <ScheduleSVG/>
                <p className={`${active === 'Schedule' ? 'text-3xl' : 'text-2xl' }`}>Schedule</p>
            </div>
            <div className={`${active === 'Report' ? 'font-bold' : '' } flex flex-row justify-center items-center gap-3`}>
                <ReportSVG/>
                <p className={`${active === 'Report' ? 'text-3xl' : 'text-2xl' }`}>Reports</p>
            </div>
            <div className={`${active === 'Patients' ? 'font-bold' : '' } flex flex-row justify-center items-center gap-3`}>
                <PatientSVG/>
                <p className={`${active === 'Patients' ? 'text-3xl' : 'text-2xl' }`}>Patients</p>
            </div>
        </div>
    </div>
  )
}

export default SideNav