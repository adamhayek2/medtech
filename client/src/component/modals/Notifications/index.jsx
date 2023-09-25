import React, {useState,useEffect} from 'react'
import SingleNotification from '../../base/SingleNotification'
import { ReactComponent as NotFoundSVG } from "../../../resources/svg/not_found.svg";
import GetNotifications from '../../../apis/GetNotifications';


const Notifications = ({open, onClose}) => {
  const [notifications, setNotifications] = useState([]);
  const [error, setError] = useState(false);

  const fetchNotf = async () => {
    try {
      setError(false); 
      const response = await GetNotifications();
      setNotifications(response)
    } catch (error) {
      setError(true); 
      console.error('error:', error);
    }
  }

  useEffect(() => {
    fetchNotf();
  }, []);

  if(!open) return null

  return (
    <div onClick={onClose} className='flex flex-row justify-end fixed w-full min-h-full bg-[#000000]/30 z-10 top-0 left-0 overflow-y-scroll'>
        {!notifications || notifications.length === 0 || error ? 
          <div className={`flex flex-col bg-grey w-1/4 p-10 justify-center items-center transition-transform duration-[0.2s] ease-[ease-in-out] gap-6 translate-x-0 ${!open ? 'translate-x-full' : ''}`}>            
            <NotFoundSVG width={'200px'} height={'42000px'} className='opacity-50'/>
            <div className='text-[24px] font-bold text-primary opacity-50'>No notifications yet!</div>
          </div> : 
          <div className={`flex flex-col bg-grey w-1/4 p-10 justify-center items-center transition-transform duration-[0.2s] ease-[ease-in-out] gap-6 ${!open ? 'translate-x-full' : 'translate-x-0'}`}>            
          {notifications.map((notification) => (
              <SingleNotification key={notification.id} name={notification}/>
          ))}
          </div> 
        }   
      </div>
  )
}

export default Notifications