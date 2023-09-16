import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom';
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
            <div className='w-1/5 flex flex-row flex-wrap gap-10 justify-between'>
                <div className='flex flex-col h-full w-full'>
                    <div className='flex flex-col px-16 py-12 bg-white rounded-lg gap-[22px] items-center'>
                        <h1 className='text-[22px] font-bold text-primary'>{report.patient_name}</h1>
                        <p className='text-[#7D7D7D]'>Patient ID: {report.patient.id}</p>
                        <Button label={'View Profile'}/>
                    </div>
                </div>
            </div>
        </div>
        }
    </div>
  )
}

export default SingleReportComponent