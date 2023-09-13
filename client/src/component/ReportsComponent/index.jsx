import React, {useState, useEffect} from 'react'
import { useDebounce } from "@uidotdev/usehooks";
import PageTitle from '../PageTite'
import ReportCard from '../ReportCard'
import GetReports from '../../apis/GetReports'
import SearchInput from '../base/SearchInput'
import ReportSearch from '../../apis/ReportSearch';

const ReportsComponent = () => {
    const [reports, setReports] = useState([]);
    const [error, setError] = useState(false);
    const [searchValue, setSearchValue] = useState("");
    const debouncedSearchValue = useDebounce(searchValue, 300);

    const fetchReports = async () => {
      try {
        const response = await GetReports(); 
        setError(false); 
        setReports(response)
      } catch (error) {
        console.error('error:', error);
        setError(true); 
      }
    }

    const fetchSearchResult = async () => {
      try {
        const response = await ReportSearch({ query: searchValue });
        setError(false); 
        setReports(response);
        console.log(response)
      } catch (error) {
        console.error('error:', error);
        setError(true); 
      }
    }

  useEffect(() => {
    if (debouncedSearchValue) {
      fetchSearchResult();
    } else {
      fetchReports();
    }
  }, [debouncedSearchValue]);
  
  return (
    <div className='min-h-screen w-5/6 flex flex-col gap-14 bg-grey p-14 ml-auto'>
        <div className='w-full flex flex-row justify-between'>
          <PageTitle title={"Reports"}/>
          <SearchInput onChange={(e) => {setSearchValue(e.target.value)}}/>
        </div>
        {reports === 0 ? 
          <div>no reports</div> : 
          <div className='flex flex-row flex-wrap gap-10 justify-between'>
          {reports.map((report) => (
            <ReportCard key={report.id} patientName={report.full_name} id={report.id} status={report.status} report={report.report_data} date={report.created_at}/>
          ))}
      </div>
      }
    </div>
  )
}

export default ReportsComponent




