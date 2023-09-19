import React, {useState, useEffect} from 'react'
import PageTitle from '../PageTite'
import DashboardStatisticsCard from '../DashboardStatisticsCard'
import LineChart from '../LineChart'
import GetDashboard from '../../apis/GetDashboard';

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
    {dashboardData.length === 0 || error ? 
      <div>no reports</div> : 
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