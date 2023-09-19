import React from 'react'
import PageTitle from '../PageTite'
import DashboardStatisticsCard from '../DashboardStatisticsCard'

const DashboardComponent = () => {
  return (
    <div className='min-h-screen w-5/6 flex flex-col gap-14 bg-grey p-14 ml-auto'>
        <div className='w-full flex flex-row justify-between'>
          <PageTitle title={"Dashboard"}/>
        </div>
    </div>
  )
}

export default DashboardComponent