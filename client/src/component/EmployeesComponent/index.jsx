import React,{useState,useEffect} from 'react';
import { useDebounce } from "@uidotdev/usehooks";
import GetStaff from '../../apis/GetStaff';
import PageTitle from '../PageTite';
import SearchInput from '../base/SearchInput';
import PatienCard from '../PatientCard';
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
            {!employees || employees.length === 0 || error ? 
                <div className='w-full h-full flex flex-col items-center'>
                <NotFoundSVG width={'400px'} height={'400px'} className='opacity-50'/>
                <div className='text-[36px] font-bold text-primary opacity-1'>No Records</div>
                </div> : 
                <div className={`flex flex-row flex-wrap ${employees.length <= 4 ? 'gap-10 justify-start' :'justify-between'}`}>
                {employees.map((employee) => (
                    <EmployeeCard 
                        key={employee.id} 
                        id={employee.id} 
                        name={employee.user.user_type === 2 ? `Dr. ${employee.first_name} ${employee.last_name}` : `${employee.first_name} ${employee.last_name}`} 
                        major={employee.major} 
                        department={employee.department.name} 
                        hireDate={employee.hired_at}/>
                    ))}
                </div> 
            }   
        </div>
      )
}

export default EmployeesComponent