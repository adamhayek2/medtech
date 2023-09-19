import React from 'react'
import {useNavigate,useLocation} from 'react-router-dom';
import { ReactComponent as DashboardSVG } from "../../resources/svg/dashboard_icon.svg";
import { ReactComponent as EmployeesSVG } from "../../resources/svg/employees_icon.svg";
import { ReactComponent as ScheduleSVG } from "../../resources/svg/schedule_icon.svg";
import { ReactComponent as ReportSVG } from "../../resources/svg/reports_icon.svg";
import { ReactComponent as PatientSVG } from "../../resources/svg/patients_icon.svg";

const SideNav = () => {
    const navItems = [
      
      {
        text: 'Schedule',
        path: '/schedule',
        icon: <ScheduleSVG />,
      },
      {
        text: 'Reports',
        path: '/reports',
        icon: <ReportSVG />,
      },
      {
        text: 'Patients',
        path: '/patients',
        icon: <PatientSVG />,
      }
      ];

    const navigate = useNavigate();

    const openReport = (path) => {
        navigate(path);
    }

    const location  = useLocation();
    
    const role = localStorage.getItem('role');

    if (role === 'admin') {
      navItems.unshift(
        {
          text: 'Dashboard',
          path: '/dashboard',
          icon: <DashboardSVG />,
        },
        {
          text: 'Employees',
          path: '/employees',
          icon: <EmployeesSVG />,
        },
      );
    };
    
  return (
    <div className="fixed w-1/6 h-screen bg-secondary flex flex-col p-6 text-white">
      <div className="flex flex-col gap-10 items-start">
        {navItems.map((item) => {
          return (
            <div
              className={`${item.path === location.pathname ? 'font-bold' : ''} flex flex-row justify-center items-center gap-3 cursor-pointer`}
              onClick={() => {
                openReport(item.path);
              }}
              key={item.path}
            >
              {item.icon}
              <p className={`${item.path === location.pathname ? 'text-3xl' : 'text-2xl'}`}>
                {item.text}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  )
}

export default SideNav