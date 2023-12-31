import React, {useState, useEffect} from 'react'
import { useDebounce } from "@uidotdev/usehooks";
import Lottie from 'react-lottie';
import PatienCard from '../PatientCard'
import PatientSearch from '../../apis/PatientSearch';
import PageTitle from '../PageTite'
import { ReactComponent as AddSVG } from "../../resources/svg/add.svg";
import GetPatients from '../../apis/GetPatients'
import SearchInput from '../base/SearchInput'
import { ReactComponent as NotFoundSVG } from "../../resources/svg/not_found.svg";
import AddPatientModal from '../modals/addPatientModal';
import * as loadingSVG from '../../resources/animations/loading.json'


const Patients = () => {
    const [patients, setPatient] = useState([]);
    const [error, setError] = useState(false);
    const [openModal, setOpenModal] = useState(false)
    const [searchValue, setSearchValue] = useState("");
    const debouncedSearchValue = useDebounce(searchValue, 300);
    const [loading, setLoading] = useState(false);

    const fetchPatients = async () => {
    try {
      setLoading(true);
      setError(false); 
      const response = await GetPatients();
      setPatient(response);
      setLoading(false);
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

  const defaultOptions = {
    loop: true,
    autoplay: true, 
    animationData: loadingSVG,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };
  
  return (
    <div className='min-h-89 w-5/6 flex flex-col gap-14 bg-grey p-14 ml-auto'>
      <div className='w-full flex flex-row justify-between'>
        <PageTitle title={"Patients"}/>
        {localStorage.getItem('role') === 'receptionist'? 
          <div className='flex flex-row justify-center items-center gap-3'>
              <SearchInput onChange={(e) => {setSearchValue(`?search=${e.target.value}`)}}/>
              <AddSVG onClick={() => setOpenModal(true)} className='h-5 w-5 cursor-pointer'/>
          </div> : 
          <SearchInput onChange={(e) => {setSearchValue(e.target.value)}}/>
        }
      </div>
      {!patients || patients.length === 0 || error ? 
      loading ? 
      <div className="w-full h-full flex flex-col items-center justify-center">
          <Lottie options={defaultOptions} height={430} width={515} />
      </div> :
        <div className='w-full h-full flex flex-col items-center'>
          <NotFoundSVG width={'400px'} height={'400px'} className='opacity-50'/>
          <div className='text-[36px] font-bold text-primary opacity-1'>No Records</div>
        </div> : 
        <div className={`flex flex-row flex-wrap gap-10  justify-start`}>
          {patients.map((patient) => (
            <PatienCard key={patient.id} id={patient.id} name={patient.full_name} status={patient.status.name}/>
            ))}
        </div> 
        }   
        <AddPatientModal open = {openModal} onClose={() => setOpenModal(false)}/>
    </div>
  )
}

export default Patients