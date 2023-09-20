import React, {useState} from 'react'
import Input from '../../base/Input';
import Button from '../../base/Button';

const AddStaff = ({open, onClose}) => {
    const [fistName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setphoneNumber] = useState('');
    const [gender, setGender] = useState();
    const [dateOfBirth, setDateOFBirth] = useState();
    const [department, setDepartment] = useState();
    const [major, setMajor] = useState('');
    const [user_type, setUserTYpe] = useState();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState();

    const resetState = () => {
        setFirstName('');
        setLastName('');
        setEmail('');
        setphoneNumber('');
        setGender('');
        setDateOFBirth('');
        setDepartment('');
        setMajor('');
        setUserTYpe('');
        setUsername('');
        setPassword('');
    };

    if(!open) return null

    return (
        <div onClick={onClose} className='fixed w-screen h-screen bg-black/[.6] '>
        <div onClick={(e) => {
            e.stopPropagation()
        }}
        className=''>
            <form className='flex flex-col centering bg-white w-1/4 p-10 justify-center items-center rounded'>

                <Button label={'Edit Password'} BgColor={'bg-primary'} textColor={'text-white'}/>
            </form>
        </div>
    </div>
    )
}

export default AddStaff