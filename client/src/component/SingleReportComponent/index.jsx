import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom';
import { ReactComponent as BloodTestSVG } from "../../resources/svg/blood-test.svg";
import SingleReport from '../../apis/SingleReport';
import PageTitle from '../PageTite';
import Button from '../base/Button';

const SingleReportComponent = () => {
    const { id } = useParams();
    const [report, setReport] = useState([]);
    const [error, setError] = useState(false);

    const fetchSingleReport = async () => {
        try {
          setError(false); 
          const response = await SingleReport({id}); 
          setReport(response)
          console.log(response)
        } catch (error) {
          setError(true); 
        }
      }

      useEffect(() => {
        fetchSingleReport();
      }, []);

  return (
    <div className='min-h-screen w-5/6 ml-auto'>
    {report.length === 0 || error ? 
        <div>no reports</div> : 
        <div className='min-h-screen flex flex-col gap-14 bg-grey p-14'>
            <div className='w-full flex flex-row justify-between'>
            <PageTitle title={`Report ${report.id}`}/>
            </div>
            <div className='flex flex-row gap-10'>
                <div className='w-1/5 flex flex-col h-full gap-[22px]'>
                    <div className='flex flex-col px-16 py-8 bg-white rounded-lg gap-[22px] items-center'>
                        <h1 className='text-[22px] font-bold text-primary'>{report.patient_name}</h1>
                        <p className='text-[#7D7D7D]'>Patient ID: {report.patient.id}</p>
                        <Button label={'View Profile'}/>
                    </div>
                    <div className='flex flex-col px-16 py-8 bg-white rounded-lg gap-[22px] items-center'>
                        <h1 className='text-[#7D7D7D]'>Status:</h1>
                        <p className=' text-[22px] text-primary font-bold'> {report.patient_status}</p>
                    </div>
                    <div className='flex flex-col px-14 py-8 bg-white rounded-lg gap-[22px] items-center '>
                        <h1 className='text-[22px] font-bold text-primary'>Informations</h1>
                        <div className='flex flex-col items-center gap-1'>
                            <p className='text-[#7D7D7D]'>Gender: {report.gender}</p>
                            <p className='text-[#7D7D7D]'>Age: {report.patient.age}</p>
                            <p className='text-[#7D7D7D]'>Blood type: {report.blood_type}</p>
                            <p className='text-[#7D7D7D]'>Contact: {report.patient.phone_number}</p>
                        </div>
                    </div>
                </div>
                <div className='w-4/5'>
                <div className='flex flex-col px-14 py-8 bg-white rounded-lg gap-10 items-start '>
                        <h1 className='text-[22px] font-bold text-primary'>Tests</h1>
                        <div className='flex flex-row items-center gap-10'>
                        {report.report_data.blood_tests.map((tem) => (
                            <div className='flex flex-row items-center gap-3'>
                                <BloodTestSVG/>
                                <div className='flex flex-col '>
                                    <div className='text-[18px]'>{tem.test_name}</div>
                                    <div className='text-base text-[#7D7D7D] italic'>{tem.date}</div>
                                </div>
                            </div>
                        ))}
                        </div>
                        <div className='w-full flex flex-row justify-end'>
                            <Button label={report.approved_by_doctor_id === 0 ? 'See all' : 'Edit'}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        }
    </div>
  )
}

export default SingleReportComponent