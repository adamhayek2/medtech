import React, {useState} from 'react'
import Input from '../../base/Input';
import Button from '../../base/Button';
import GetData from '../../../apis/GetData';
import ModalTitle from '../../base/ModalTitle';
import DropdownSearch from '../../base/DropdownSearch';
import NewMeetingAPI from '../../../apis/NewMeetingAPI';

const NewMeeting = ({open, onClose}) => {
    const [purpose, setPurpose] = useState('');
    const [start, setStart] = useState();
    const [end, setEnd] = useState();
    const [attendees, setAttendees] = useState([]); 
    const [data, setData] = useState([]);
    const [error, setError] = useState();

    const resetState = () => {
        setPurpose('');
        setStart('');
        setEnd('');
        setAttendees('');
    };
    const newMeeting = async (e) => {
        e.preventDefault();
        try {
            setError(false); 
            await NewMeetingAPI( purpose, start, end, attendees);
            onClose();
            resetState();
          } catch (error) {
            console.error('Failed to create', error);
            setError(true); 
          }
        console.log(attendees);
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

    if(!open) return null

    return (
        <div onClick={onClose} className='flex flex-row justify-end fixed w-full min-h-full bg-[#000000]/30 z-10 top-0 left-0 overflow-y-scroll'>
            <form 
                onClick={(e) => { e.stopPropagation() }}
                onSubmit={newMeeting}
                className={`flex flex-col bg-white w-1/4 p-10 justify-center items-center transition-transform duration-[0.2s] ease-[ease-in-out] gap-6 ${!open ? 'translate-x-full' : 'translate-x-0'}`}
            >
                <ModalTitle title={`New Meeting`}/>
                <Input
                name="purpose"
                value={purpose}
                type={"text"}
                onChange={(e) => setPurpose(e.target.value)}
                placeholder="Purpose or topic"
                theme={"blue"}
                />
                <Input
                name="Start"
                value={start}
                type={"datetime-local"}
                onChange={(e) => setStart(e.target.value)}
                placeholder="Start"
                theme={"blue"}
                />
                <Input
                name="End"
                value={end}
                type={"datetime-local"}
                onChange={(e) => setEnd(e.target.value)}
                placeholder="End"
                theme={"blue"}
                />

                <div className='text-xl text-primary w-full'>Attendees</div>

                <DropdownSearch onChange={setAttendees}/>
                <div className='w-full h-[56px]'>
                    <Button label={'Submit'} BgColor={'bg-primary'} textColor={'text-white'} />
                </div>
            </form>
        </div>
    )
}

export default NewMeeting