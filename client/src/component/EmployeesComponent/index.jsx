import React,{useState,useEffect} from 'react';
import { useDebounce } from "@uidotdev/usehooks";
import GetStaff from '../../apis/GetStaff';
import PageTitle from '../PageTite';
import SearchInput from '../base/SearchInput';
import { ReactComponent as NotFoundSVG } from "../../resources/svg/not_found.svg";
import EmployeeCard from '../EmployeeCard';

const EmployeesComponent = () => {
    const [employees, setEmployees] = useState([]);
    const [filter, setFilter] = useState("");
    const [error, setError] = useState(false);
    const [searchValue, setSearchValue] = useState("");
    const debouncedSearchValue = useDebounce(searchValue, 300);

    const FetchStaff = async (search) => {
        try {
        setError(false); 
        const response = await GetStaff({filter: ''});
        setEmployees(response)
        } catch (error) {
        setError(true); 
        console.error('error:', error);
        }
    }
    const fetchfilterResult = async () => {
        try {
          const response = await GetStaff({filter: searchValue});
          setError(false); 
          setEmployees(response);
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