import React from 'react'
import PatienCard from '../PatientCard'

const Patients = () => {
  return (
    <div className='h-screen w-full bg-grey overflow-y-scroll'>
        <div className='flex flex-row flex-wrap gap-10 justify-center'>
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