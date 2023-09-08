import React, {useState, useEffect} from 'react'
import PatienCard from '../PatientCard'
import PageTitle from '../PageTite'
import GetPatients from '../../apis/GetPatients'

const Patients = () => {
    const [patients, setPatient] = useState([]);
    const [error, setError] = useState(false);

    const fetchPatients = async () => {
    try {
      const response = await GetPatients();
      setError(false); 
      setPatient(response)
      console.log(response)
    } catch (error) {
      console.error('error:', error);
      setError(true); 
    }
  }

  useEffect(() => {
    fetchPatients();
  }, []);
  
  return (
    <div className='h-screen w-full flex flex-col gap-14 bg-grey p-14'>
        <PageTitle title={"Patients"}/>
        <div className='flex flex-row flex-wrap gap-10 justify-between'>
            {patients.map((patient) => (
            <PatienCard key={patient.id} id={patient.id} name={patient.full_name} status={patient.status.name}/>
            ))}
        </div>
    </div>
  )
}

export default Patients