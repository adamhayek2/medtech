import React, {useState} from 'react'
import Input from '../../base/Input';
import Button from '../../base/Button';

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

    if(!open) return null

    return (
        <div onClick={onClose} className='flex flex-row justify-end fixed w-full h-full bg-[#000000]/30 z-10 top-0 left-0 '>
            <form 
                onClick={(e) => { e.stopPropagation() }}
                className={`flex flex-col bg-white w-1/4 p-10 justify-center items-center transition-transform duration-[0.2s] ease-[ease-in-out] gap-6 ${!open ? 'translate-x-full' : 'translate-x-0'}`}
            >
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
                type={"email"}
                onChange={(e) => setphoneNumber(e.target.value)}
                placeholder="Phone number"
                theme={"blue"}
                />
                <Input
                name="date_of_birth"
                value={dateOfBirth}
                type={"date"}
                onChange={(e) => setDateOfBirth(e.target.value)}
                placeholder="Date of birth"
                theme={"blue"}
                />
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
                
                {/* <Button label={'Edit Password'} BgColor={'bg-primary'} textColor={'text-white'}/> */}
            </form>
        </div>
    )
}

export default AddStaff