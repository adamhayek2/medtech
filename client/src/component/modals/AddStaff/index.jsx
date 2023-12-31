import React, {useState,useEffect} from 'react'
import Input from '../../base/Input';
import Button from '../../base/Button';
import DropdownMenu from '../../base/DropdownMenu';
import GetData from '../../../apis/GetData';
import CreateStaff from '../../../apis/CreateStaff';
import ModalTitle from '../../base/ModalTitle';

const AddStaff = ({open, onClose}) => {
    const [fistName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setphoneNumber] = useState('');
    const [gender, setGender] = useState();
    const [dateOfBirth, setDateOfBirth] = useState();
    const [department, setDepartment] = useState();
    const [major, setMajor] = useState('');
    const [user_type, setUserType] = useState();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [data, setData] = useState([]);
    const [error, setError] = useState();

    const resetState = () => {
        setFirstName('');
        setLastName('');
        setEmail('');
        setphoneNumber('');
        setGender('');
        setDateOfBirth('');
        setDepartment('');
        setMajor('');
        setUserType('');
        setUsername('');
        setPassword('');
    };
    const addStaff = async (e) => {
        e.preventDefault();
        try {
            setError(false); 
            const response = await CreateStaff(fistName, lastName, email,phoneNumber, gender, dateOfBirth, department, major, user_type, username, password );
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
                onSubmit={addStaff}
                className={`flex flex-col bg-white w-1/4 p-10 justify-center items-center transition-transform duration-[0.2s] ease-[ease-in-out] gap-6 ${!open ? 'translate-x-full' : 'translate-x-0'}`}
            >
                <ModalTitle title={'Employee registration'}/>
                <div className=' flex flex-row gap-3'>
                    <Input
                    name="First name"
                    value={fistName}
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
                name="email"
                value={email}
                type={"email"}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="E-mail"
                theme={"blue"}
                />
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
                    name="date_of_birth"
                    value={dateOfBirth}
                    type={"date"}
                    onChange={(e) => setDateOfBirth(e.target.value)}
                    placeholder="Date of birth"
                    theme={"blue"}
                    />
                </div>
                <Input
                name="username"
                value={username}
                type={"text"}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                theme={"blue"}
                />
                <Input
                name="password"
                value={password}
                type={"password"}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                theme={"blue"}
                />
                <Input
                name="major"
                value={major}
                type={"text"}
                onChange={(e) => setMajor(e.target.value)}
                placeholder="Major"
                theme={"blue"}
                />
                <DropdownMenu placeholder={"depatment"} onChange={setDepartment} options={data.departments}/>
                <DropdownMenu placeholder={"role"} onChange={setUserType} options={data.userTypes}/>
                <div className='w-full h-[56px]'>
                    <Button label={'Add'} BgColor={'bg-primary'} textColor={'text-white'} />
                </div>
            </form>
        </div>
    )
}

export default AddStaff