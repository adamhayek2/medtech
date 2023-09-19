import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { ReactComponent as NotFoundSVG } from "../../resources/svg/not_found.svg";
import PageTitle from '../PageTite'
import ReportCard from '../ReportCard'
import GetSpecificReports from '../../apis/GetSpecificReports';


const SinglePatientComponent = () => {
  const { id } = useParams();
  const [reports, setReports] = useState([]);
  const [error, setError] = useState(false);

  const fetchReports = async () => {
    try {
      setError(false); 
      const response = await GetSpecificReports({id}); 
      setReports(response)
    } catch (error) {
      setError(true); 
    }
  }

  useEffect(() => {
      fetchReports();
  }, []);

  return (
    
    <div className='min-h-screen w-5/6 flex flex-col gap-14 bg-grey p-14 ml-auto'>
      {!reports || error || reports.length === 0? 
          <div className='w-full h-full flex flex-col items-center'>
            <NotFoundSVG width={'400px'} height={'400px'} className='opacity-50'/>
            <div className='text-[36px] font-bold text-primary opacity-1'>No Records</div>
          </div> : 
          <>
            <div className='w-full flex flex-row justify-between'>
              <PageTitle title={reports[0].full_name}/>
            </div>
          
            <div className={`flex flex-row flex-wrap ${reports.length <= 4 ? 'gap-10 justify-start' :'justify-between'}`}>
              {reports.map((report) => (
                <ReportCard key={report.id}  id={report.id} status={report.status} report={report.report_data} date={report.time}/>
              ))}
            </div>
          </>
      }
    </div>
  )
}

export default SinglePatientComponent
