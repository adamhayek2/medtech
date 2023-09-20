import React,{useState,useEffect} from 'react';
import { useDebounce } from "@uidotdev/usehooks";
import GetStaff from '../../apis/GetStaff';
import PageTitle from '../PageTite';
import SearchInput from '../base/SearchInput';

const EmployeesComponent = () => {
    const [patients, setPatient] = useState([]);
    const [filter, setFilter] = useState("");
    const [error, setError] = useState(false);
    const [searchValue, setSearchValue] = useState("");
    const debouncedSearchValue = useDebounce(searchValue, 300);

    const FetchStaff = async (search) => {
        try {
        setError(false); 
        const response = await GetStaff({filter: ''});
        setPatient(response)
        } catch (error) {
        setError(true); 
        console.error('error:', error);
        }
    }
    const fetchfilterResult = async () => {
        try {
          const response = await GetStaff({filter: searchValue});
          setError(false); 
          setPatient(response);
        } catch (error) {
          console.error('error:', error);
          setError(true); 
        }
    }

    useEffect(() => {
        if (debouncedSearchValue) {
            fetchfilterResult(debouncedSearchValue);
        }else{
            FetchStaff();
        }
    }, [debouncedSearchValue]);

    return (
        <div className='min-h-screen w-5/6 flex flex-col gap-14 bg-grey p-14 ml-auto'>
            <div className='w-full flex flex-row justify-between'>
                <PageTitle title={"Employees"}/>
                <SearchInput onChange={(e) => {setSearchValue(`?search=${e.target.value}`)}}/>
            </div> 
        </div>
      )
}

export default EmployeesComponent