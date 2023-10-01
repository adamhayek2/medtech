import React, {useState, useEffect} from 'react'
import { useDebounce } from "@uidotdev/usehooks";
import Lottie from 'react-lottie';
import { ReactComponent as NotFoundSVG } from "../../resources/svg/not_found.svg";
import PageTitle from '../PageTite'
import ReportCard from '../ReportCard'
import GetReports from '../../apis/GetReports'
import SearchInput from '../base/SearchInput'
import ReportSearch from '../../apis/ReportSearch';
import * as loadingSVG from '../../resources/animations/loading.json'


const ReportsComponent = () => {
    const [reports, setReports] = useState([]);
    const [error, setError] = useState(false);
    const [searchValue, setSearchValue] = useState("");
    const debouncedSearchValue = useDebounce(searchValue, 300);
    const [loading, setLoading] = useState(false);

    const fetchReports = async () => {
      try {
        setLoading(true);
        setError(false); 
        const response = await GetReports(); 
        setReports(response);
        setLoading(false);
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
  
  const defaultOptions = {
    loop: true,
    autoplay: true, 
    animationData: loadingSVG,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };
  
  return (
    <div className='min-h-89 w-5/6 flex flex-col gap-14 bg-grey p-14 ml-auto'>
        <div className='w-full flex flex-row justify-between'>
          <PageTitle title={"Reports"}/>
          <SearchInput onChange={(e) => {setSearchValue(e.target.value)}}/>
        </div>
        {!reports || error || reports.length === 0? 
            loading ? 
            <div className="w-full h-full flex flex-col items-center justify-center">
                <Lottie options={defaultOptions} height={430} width={515} />
            </div> :
            <div className='w-full h-full flex flex-col items-center'>
                <NotFoundSVG width={'400px'} height={'400px'} className='opacity-50'/>
                <div className='text-[36px] font-bold text-primary opacity-1'>No Records</div>
            </div> : 
          <div className={`flex flex-row flex-wrap gap-10  justify-start`}>
          {reports.map((report) => (
            <ReportCard key={report.id} patientName={report.full_name} id={report.id} status={report.approved_by_doctor_id} report={report.report_data} date={report.time}/>
          ))}
          </div>
        }
    </div>
  )
}

export default ReportsComponent




