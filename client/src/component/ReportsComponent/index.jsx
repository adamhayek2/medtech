import React, {useState, useEffect} from 'react'
import { useDebounce } from "@uidotdev/usehooks";
import { ReactComponent as NotFoundSVG } from "../../resources/svg/not_found.svg";
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
        setError(false); 
        const response = await GetReports(); 
        setReports(response)
      } catch (error) {
        setError(true); 
        console.log("no")
        
        setError(true); 
      }
    }

    const fetchSearchResult = async () => {
      try {
        const response = await ReportSearch({ query: searchValue });
        setError(false); 
        setReports(response);
      } catch (error) {
        console.error('error:', error);
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
        {!reports || error || reports.length === 0? 
          <div className='w-full h-full flex flex-col items-center'>
            <NotFoundSVG width={'400px'} height={'400px'} className='opacity-50'/>
            <div className='text-[36px] font-bold text-primary opacity-1'>No Records</div>
          </div> : 
          <div className={`flex flex-row flex-wrap gap-10 justify-start`}>
          {reports.map((report) => (
            <ReportCard key={report.id} patientName={report.full_name} id={report.id} status={report.status} report={report.report_data} date={report.time}/>
          ))}
          </div>
        }
    </div>
  )
}

export default ReportsComponent




