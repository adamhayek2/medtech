import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom';
import SingleReport from '../../apis/SingleReport';
import PageTitle from '../PageTite';

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
    <div className='min-h-screen w-5/6 flex flex-col gap-14 bg-grey p-14 ml-auto'>
    {report.length === 0 || error ? 
        <div>no reports</div> : 
        <div>
            <div className='w-full flex flex-row justify-between'>
            <PageTitle title={`Report ${report.id}`}/>
            </div>
            <div className='flex flex-row flex-wrap gap-10 justify-between'>
            
            </div>
        </div>
        }
    </div>
  )
}

export default SingleReportComponent