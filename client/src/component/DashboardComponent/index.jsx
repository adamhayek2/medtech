import React from 'react'
import PageTitle from '../PageTite'
import DashboardStatisticsCard from '../DashboardStatisticsCard'
import LineChart from '../LineChart'

const DashboardComponent = () => {

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