import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom';
import Lottie from 'react-lottie';
import PageTitle from '../PageTite';
import Button from '../base/Button';
import StaffProfile from '../../apis/StaffProfile';
import { ReactComponent as NotFoundSVG } from "../../resources/svg/not_found.svg";
import * as loadingSVG from '../../resources/animations/loading.json'
import EditStaff from '../modals/EditStaff';


const EmployeeProfileComponent = () => {
    const { id } = useParams();
    const [employee, setEmployee] = useState([]);
    const [openModal, setOpenModal] = useState(false)
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    const fetchEmployeeProfile = async () => {
        try {
          setLoading(true);
          setError(false); 
          const response = await StaffProfile({id}); 
          setEmployee(response)
          setLoading(false);
        } catch (error) {
          setError(true); 
        }
    }

    useEffect(() => {
        fetchEmployeeProfile();
      }, []);

    const defaultOptions = {
    loop: true,
    autoplay: true, 
    animationData: loadingSVG,
    rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
    }
    };

  return (
    <div className='min-h-89 w-5/6 ml-auto'>
    {employee.length === 0 || error ? 
        loading ? <div className="w-full h-full flex flex-col items-center justify-center">
            <Lottie options={defaultOptions} height={430} width={515} />
        </div> : 
        <div className='w-full h-full flex flex-col items-center'>
            <NotFoundSVG width={'400px'} height={'400px'} className='opacity-50'/>
            <div className='text-[36px] font-bold text-primary opacity-1'>No Records</div>
        </div> : 
        <div className='min-h-89 flex flex-col gap-14 bg-grey p-14'>
            <div className='w-full flex flex-row justify-between'>
            <PageTitle title={`${employee.user.user_type.id === 2 ? `Dr. ${employee.first_name} ${employee.last_name}` : `${employee.first_name} ${employee.last_name}`}`}/>
            </div>
            <div className='flex flex-row gap-10'>
                <div className='w-1/5 flex flex-col h-full gap-10'>
                    <div className='flex flex-col px-16 py-8 bg-white rounded-lg gap-[22px] items-center'>
                        <h1 className='text-[22px] font-bold text-primary'>{`${employee.first_name} ${employee.last_name}`}</h1>
                        <div onClick={() => setOpenModal(true)} className='w-full'>
                            <Button label={'Edit Profile'} BgColor={'bg-primary'} textColor={'text-white'} />
                        </div>
                    </div>
                    <div className='flex flex-col px-16 py-8 bg-white rounded-lg gap-[22px] items-center'>
                        <h1 className='text-[#7D7D7D]'>Major:</h1>
                        <p className=' text-[22px] text-primary font-bold'> {employee.major}</p>
                    </div>
                    <div className='flex flex-col px-14 py-8 bg-white rounded-lg gap-[22px] items-center '>
                        <h1 className='text-[22px] font-bold text-primary'>Contact:</h1>
                        <div className='flex flex-col items-center gap-1'>
                            <p className='text-[#7D7D7D]'>email: {employee.email}</p>
                            <p className='text-[#7D7D7D]'>Contact: {employee.phone_number}</p>
                        </div>
                    </div>
                </div>
                <div className='w-4/5 flex flex-col gap-10'>
                    <div className='flex flex-col px-14 py-8 bg-white rounded-lg gap-10 items-start '>
                        <h1 className='text-[22px] font-bold text-primary'>Other Information</h1>
                        <div className='flex flex-row items-center flex-wrap gap-y-10'>
                            <div className='w-1/2'>
                                <span className='font-bold'>Department:</span>
                                <span> {employee.department.name}</span>
                            </div>
                            <div className='w-1/2'>
                                <span className='font-bold'>Username:</span>
                                <span> {employee.user.username}</span>
                            </div>
                            <div className='w-1/2'>
                                <span className='font-bold'>Date of bitrth:</span>
                                <span> {employee.date_of_birth}</span>
                            </div>
                            <div className='w-1/2'>
                                <span className='font-bold'>Gender:</span>
                                <span> {employee.gender.gender}</span>
                            </div>
                            <div className='w-1/2'>
                                <span className='font-bold'>Hired at:</span>
                                <span> {employee.hired_at}</span>
                            </div>
                            <div className='w-1/2'>
                                <span className='font-bold'>Role:</span>
                                <span> {employee.user.user_type.type}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div> 
        </div>
        }
        <EditStaff open = {openModal} onClose={() => setOpenModal(false)} profileInfos={employee}/>
    </div>
  )
}

export default EmployeeProfileComponent