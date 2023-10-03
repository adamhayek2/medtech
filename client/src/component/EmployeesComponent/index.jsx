import React,{useState,useEffect} from 'react';
import { useDebounce } from "@uidotdev/usehooks";
import Lottie from 'react-lottie';
import GetStaff from '../../apis/GetStaff';
import PageTitle from '../PageTite';
import SearchInput from '../base/SearchInput';
import { ReactComponent as NotFoundSVG } from "../../resources/svg/not_found.svg";
import { ReactComponent as AddSVG } from "../../resources/svg/add.svg";
import EmployeeCard from '../EmployeeCard';
import AddStaff from '../modals/AddStaff';
import * as loadingSVG from '../../resources/animations/loading.json'


const EmployeesComponent = () => {
    const [employees, setEmployees] = useState([]);
    const [filter, setFilter] = useState("");
    const [error, setError] = useState(false);
    const [searchValue, setSearchValue] = useState("");
    const [openModal, setOpenModal] = useState(false)
    const debouncedSearchValue = useDebounce(searchValue, 300);
    const [loading, setLoading] = useState(false);

    const FetchStaff = async (search) => {
        try {
            setLoading(true);
            setError(false); 
            const response = await GetStaff({filter: ''});
            setEmployees(response);
            setLoading(false);
        } catch (error) {
            setError(true); 
            console.error('error:', error);
        }
    }
    const fetchfilterResult = async () => {
        try {
          setLoading(true);
          const response = await GetStaff({filter: searchValue});
          setError(false); 
          setEmployees(response);
          setLoading(false);
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
                <PageTitle title={"Employees"}/>
                <div className='flex flex-row justify-center items-center gap-3'>
                    <SearchInput onChange={(e) => {setSearchValue(`?search=${e.target.value}`)}}/>
                    <AddSVG onClick={() => setOpenModal(true)} className='h-5 w-5 cursor-pointer'/>
                </div>
            </div>
            {!employees || employees.length === 0 || error ? 
                loading ? 
                <div className="w-full h-full flex flex-col items-center justify-center">
                    <Lottie options={defaultOptions} height={430} width={515} />
                </div> :
                <div className='w-full h-full flex flex-col items-center'>
                    <NotFoundSVG width={'400px'} height={'400px'} className='opacity-50'/>
                    <div className='text-[36px] font-bold text-primary opacity-1'>No Records</div>
                </div> : 
                <div className={`flex flex-row flex-wrap gap-10 ${employees.length <= 4 ? ' justify-start' :'justify-between'}`}>
                {employees.map((employee) => (
                    <EmployeeCard 
                        key={employee.id} 
                        id={employee.id} 
                        // name={employee.user.user_type_id === 2 ? `Dr. ${employee.first_name} ${employee.last_name}` : `${employee.first_name} ${employee.last_name}`} 
                        name={`${employee.first_name} ${employee.last_name}`}
                        major={employee.major} 
                        department={employee.department.name} 
                        hireDate={employee.hired_at}/>
                    ))}
                </div> 
            }   
            <AddStaff open = {openModal} onClose={() => setOpenModal(false)}/>
        </div>
      )
}

export default EmployeesComponent