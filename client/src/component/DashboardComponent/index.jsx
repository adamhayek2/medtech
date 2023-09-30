import React, {useState, useEffect} from 'react'
import PageTitle from '../PageTite'
import DashboardStatisticsCard from '../DashboardStatisticsCard'
import LineChart from '../LineChart'
import GetDashboard from '../../apis/GetDashboard';
import { ReactComponent as NotFoundSVG } from "../../resources/svg/not_found.svg";

const DashboardComponent = () => {
  const [dashboardData, setDashboardData] = useState([]);
  const [error, setError] = useState(false);

  const fetchDashboardData = async () => {
    try {
      setError(false); 
      const response = await GetDashboard(); 
      setDashboardData(response)
    } catch (error) {
      setError(true); 
    }
  }

  useEffect(() => {
    fetchDashboardData();
  }, []);

  return (
    <>
    {dashboardData.lenght === 0 || error ? 
      
      <div className='min-h-screen w-5/6 flex flex-col bg-grey p-14 ml-auto justify-center items-center'>
          <NotFoundSVG width={'400px'} height={'400px'} className='opacity-50'/>
          <div className='text-[36px] font-bold text-primary opacity-1'>No Patient's are in today yet</div>
      </div> : 
      dashboardData.reportsTodayCount === 0 ? 
      <div className='min-h-screen w-5/6 flex flex-col bg-grey p-14 ml-auto justify-center items-center'>
          <NotFoundSVG width={'400px'} height={'400px'} className='opacity-50'/>
          <div className='text-[36px] font-bold text-primary opacity-1'>No Patient's are in today yet</div>
      </div> : 
      <div className='min-h-screen w-5/6 flex flex-col gap-14 bg-grey p-14 ml-auto'>
          <div className='w-full flex flex-row justify-between'>
            <PageTitle title={"Dashboard"}/>
          </div>
          <div className='flex flex-row gap-20'>
              <DashboardStatisticsCard about={"patients"} number={dashboardData.reportsTodayCount} label={"Patients entered today"}/>
              <DashboardStatisticsCard about={"virus"} number={dashboardData.mostRepeatedLabel} label={"is Today's common disease"}/>
          </div>
          <LineChart data={dashboardData.timeDifferences}/>
      </div>
    }
    </>
  )
}

export default DashboardComponent