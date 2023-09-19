import React from 'react'
import { useNavigate } from 'react-router-dom';
import { ReactComponent as SingleReportSVG } from "../../resources/svg/single_report_icon.svg";


const ReportCard = ({patientName, id, status, report, date}) => {

  const navigate = useNavigate();

  const openReport = () => {
    navigate(`/report/${id}`);
  }


  return (
    <div className='flex flex-col gap-6 p-6 rounded-lg w-1/5 h-fit grow-0 bg-white cursor-pointer justify-center' onClick={openReport}>
        <div className='flex flex-row gap-3 justify-center items-center'>
            <p className='text-[22px] font-bold font text-primary'>{id}</p>
            <SingleReportSVG/>
        </div>
        <div className='flex flex-col gap-3 justify-center items-center'>
            <p className='text-base font-futuraBK'>{patientName}</p>
            
            <p className='text-base font-futuraBK'>{date}</p>
        </div>
        <div className='w-full'>
            <table className='w-full  border-spacing-2'>
                <tbody>
                    <tr>
                        <td align='right' className='font-bold border-r-2 px-2'>Blood Tests </td>
                        <td><p className='truncate w-32 px-2 py-1'>{report.blood_tests.map(test => test.test_name).join(', ')}</p></td>
                    </tr>
                    <tr>
                        <td align='right' className='font-bold border-r-2 pr-2'>Scans </td>
                        <td><p className='truncate w-32 px-2 py-1'>{report.scans.map(scan => scan.scan_type).join(', ')}</p></td>
                    </tr>
                    <tr>
                        <td align='right' className='font-bold border-r-2 pr-2'>Appointments </td>
                        <td><p className='truncate w-32 px-2 py-1'>{report.appointments.map(appointment => appointment.reason).join(', ')}</p></td>
                    </tr>
                    <tr>
                        <td align='right' className='font-bold border-r-2 pr-2'>Medications </td>
                        <td><p className='truncate w-32 px-2 py-1'>{report.medications.map(medication => medication.medication_name).join(', ')}</p></td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
  )
}

export default ReportCard