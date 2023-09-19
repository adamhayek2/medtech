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
    <div className='min-h-screen w-5/6 flex flex-col gap-14 bg-grey p-14 ml-auto'>
        <div className='w-full flex flex-row justify-between'>
          <PageTitle title={"Dashboard"}/>
        </div>
        <div className='flex flex-row gap-20'>
            <DashboardStatisticsCard about={"patients"} number={123} label={"Patients entered today"}/>
            <DashboardStatisticsCard about={"virus"} number={"Corona virus"} label={"is Today's common disease"}/>
        </div>
        <LineChart/>
    </div>
  )
}

export default DashboardComponent