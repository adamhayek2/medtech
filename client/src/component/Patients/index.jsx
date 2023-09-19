import React, {useState, useEffect} from 'react'
import { useDebounce } from "@uidotdev/usehooks";
import PatienCard from '../PatientCard'
import PatientSearch from '../../apis/PatientSearch';
import PageTitle from '../PageTite'
import GetPatients from '../../apis/GetPatients'
import SearchInput from '../base/SearchInput'
import { ReactComponent as NotFoundSVG } from "../../resources/svg/not_found.svg";


const Patients = () => {
    const [patients, setPatient] = useState([]);
    const [error, setError] = useState(false);
    const [searchValue, setSearchValue] = useState("");
    const debouncedSearchValue = useDebounce(searchValue, 300);

    const fetchPatients = async () => {
    try {
      setError(false); 
      const response = await GetPatients();
      setPatient(response)
    } catch (error) {
      setError(true); 
      console.error('error:', error);
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
      <div className='w-full flex flex-row justify-between'>
        <PageTitle title={"Patients"}/>
        <SearchInput onChange={(e) => {setSearchValue(e.target.value)}}/>
      </div>
      {!patients || patients.length === 0 || error ? 
        <div className='w-full h-full flex flex-col items-center'>
          <NotFoundSVG width={'400px'} height={'400px'} className='opacity-50'/>
          <div className='text-[36px] font-bold text-primary opacity-1'>No Records</div>
        </div> : 
        <div className={`flex flex-row flex-wrap ${patients.length <= 4 ? 'gap-10 justify-start' :'justify-between'}`}>
          {patients.map((patient) => (
            <PatienCard key={patient.id} id={patient.id} name={patient.full_name} status={patient.status.name}/>
            ))}
        </div> 
        }   
    </div>
  )
}

export default Patients