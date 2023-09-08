import React, {useState, useEffect} from 'react'
import PageTitle from '../PageTite'
import ReportCard from '../ReportCard'

const ReportsComponent = () => {
    const [Reports, setReport] = useState([]);
    const [error, setError] = useState(false);

    const fetchReports = async () => {
    try {
      const response = await GetReports();
      setError(false); 
      setReport(response)
      console.log(response)
    } catch (error) {
      console.error('error:', error);
      setError(true); 
    }
  }

  useEffect(() => {
    fetchReports();
  }, []);
  
  return (
    <div className='h-screen w-full flex flex-col gap-14 bg-grey p-14'>
        <PageTitle title={"Reports"}/>
        <div className='flex flex-row flex-wrap gap-10 justify-between'>
            {reports.map((report) => (
            <ReportCard name={report.id} patientName={report.full_name} id={report.id} status={report.status} report={report.report_data} date={report.created_at}/>
            ))}
        </div>
    </div>
  )
}

export default ReportsComponent

