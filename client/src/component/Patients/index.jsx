import React, {useState, useEffect} from 'react'
import { useDebounce } from "@uidotdev/usehooks";
import PatienCard from '../PatientCard'
import PatientSearch from '../../apis/PatientSearch';
import PageTitle from '../PageTite'
import GetPatients from '../../apis/GetPatients'
import SearchInput from '../base/SearchInput'

const Patients = () => {
    const [patients, setPatient] = useState([]);
    const [error, setError] = useState(false);
    const [searchValue, setSearchValue] = useState("");
    const debouncedSearchValue = useDebounce(searchValue, 300);

    const fetchPatients = async () => {
    try {
      const response = await GetPatients();
      setError(false); 
      setPatient(response)
      if(response === "Unauthorized") setError(true)
    } catch (error) {
      console.error('error:', error);
      setError(true); 
    }
  }

  const fetchSearchResult = async () => {
      try {
        const response = await PatientSearch({ query: searchValue });
        setError(false); 
        setPatient(response);
        console.log(response)
      } catch (error) {
        console.error('error:', error);
        setError(true); 
      }
    }

  useEffect(() => {
    if (debouncedSearchValue) {
      fetchSearchResult();
    }else{
      fetchPatients();
    }
  }, [debouncedSearchValue]);
  
  return (
    <div className='min-h-screen w-5/6 flex flex-col gap-14 bg-grey p-14 ml-auto'>
        <PageTitle title={"Patients"}/>
        <SearchInput onChange={(e) => {setSearchValue(e.target.value)}}/>
        {patients.length === 0 || error ? 
          <div>no reports</div> : 
          <div className='flex flex-row flex-wrap gap-10 justify-between'>
            {patients.map((patient) => (
              <PatienCard key={patient.id} id={patient.id} name={patient.full_name} status={patient.status.name}/>
              ))}
          </div> 
        }   
    </div>
  )
}

export default Patients