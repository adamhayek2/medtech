import React, {useState,useEffect} from 'react'
import Input from '../../base/Input';
import Button from '../../base/Button';
import DropdownMenu from '../../base/DropdownMenu';
import GetData from '../../../apis/GetData';
import AddStaff from '../../../apis/AddPatient';
import AddPatient from '../../../apis/AddPatient';
import ModalTitle from '../../base/ModalTitle';

const AddPatientModal = ({open, onClose}) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phoneNumber, setphoneNumber] = useState('');
    const [gender, setGender] = useState();
    const [age, setAge] = useState();
    const [status, setStatus] = useState();
    const [bloodType, setBloodType] = useState();
    const [data, setData] = useState([]);
    const [error, setError] = useState();

    const resetState = () => {
        setFirstName('');
        setLastName('');
        setphoneNumber('');
        setGender('');
        setAge('');
        setStatus('');
        setBloodType('');
    };
    const add = async (e) => {
        e.preventDefault();
        try {
            setError(false); 
            const response = await AddPatient(firstName, lastName, phoneNumber, gender, age, status, bloodType);
            onClose();
            resetState();
          } catch (error) {
            console.error('Failed to create', error);
            setError(true); 
          }
    }

    const fetchData = async () => {
        try {
          setError(false); 
          const response = await GetData(); 
          setData(response)
        } catch (error) {          
          setError(true); 
        }
    }

    useEffect(() => {
        fetchData();
      }, []);

    if(!open) return null

    return (
        <div onClick={onClose} className='flex flex-row justify-end fixed w-full min-h-full bg-[#000000]/30 z-10 top-0 left-0 overflow-y-scroll'>
            <form 
                onClick={(e) => { e.stopPropagation() }}
                onSubmit={add}
                className={`flex flex-col bg-white w-1/4 p-10 justify-center items-center transition-transform duration-[0.2s] ease-[ease-in-out] gap-6 ${!open ? 'translate-x-full' : 'translate-x-0'}`}
            >
                <ModalTitle title={'Add patient'} />
                <div className=' flex flex-row gap-3'>
                    <Input
                    name="First name"
                    value={firstName}
                    type={"text"}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="First name"
                    theme={"blue"}
                    />
                    <Input
                    name="Last name"
                    value={lastName}
                    type={"text"}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Last name"
                    theme={"blue"}
                    />
                </div>
                <Input
                name="phone_number"
                value={phoneNumber}
                type={"text"}
                onChange={(e) => setphoneNumber(e.target.value)}
                placeholder="Phone number"
                theme={"blue"}
                />
                <div className='w-full flex flex-row gap-3'>
                    <DropdownMenu placeholder={"Gender"} onChange={setGender} options={data.genders}/>
                    <Input
                    name="age"
                    value={age}
                    type={"number"}
                    onChange={(e) => setAge(e.target.value)}
                    placeholder="Age"
                    theme={"blue"}
                    />
                </div>
                <DropdownMenu placeholder={"Status"} onChange={setStatus} options={data.statuses}/>
                <DropdownMenu placeholder={"Blood Type"} onChange={setBloodType} options={data.bloodTypes}/>
                <div className='w-full h-[56px]'>
                    <Button label={'Add'} BgColor={'bg-primary'} textColor={'text-white'} />
                </div>
            </form>
        </div>
    )
}

export default AddPatientModal