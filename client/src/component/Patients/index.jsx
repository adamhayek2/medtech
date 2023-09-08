import React from 'react'
import PatienCard from '../PatientCard'
import PageTitle from '../PageTite'

const Patients = () => {
  return (
    <div className='h-screen w-full flex flex-col gap-14 bg-grey p-14'>
        <PageTitle title={"Patients"}/>
        <div className='flex flex-row flex-wrap gap-10 justify-between'>
            <PatienCard name={"Adam Hayek"} illness={"Normal"} status={"free to go"}/>
            <PatienCard name={"Adam Hayek"} illness={"Normal"} status={"free to go"}/>
            <PatienCard name={"Adam Hayek"} illness={"Normal"} status={"free to go"}/>
            <PatienCard name={"Adam Hayek"} illness={"Normal"} status={"free to go"}/>
            <PatienCard name={"Adam Hayek"} illness={"Normal"} status={"free to go"}/>
            <PatienCard name={"Adam Hayek"} illness={"Normal"} status={"free to go"}/>
            <PatienCard name={"Adam Hayek"} illness={"Normal"} status={"free to go"}/>
            <PatienCard name={"Adam Hayek"} illness={"Normal"} status={"free to go"}/>
            <PatienCard name={"Adam Hayek"} illness={"Normal"} status={"free to go"}/>
            <PatienCard name={"Adam Hayek"} illness={"Normal"} status={"free to go"}/>

        </div>
    </div>
  )
}

export default Patients