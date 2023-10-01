import React, {useState, useEffect} from 'react'
import './index.css'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import Lottie from 'react-lottie';
import 'react-big-calendar/lib/css/react-big-calendar.css'
import moment from 'moment';
import EventComponent from '../base/EventComponent';
import UserSchedule from '../../apis/UserSchedule'
import * as loadingSVG from '../../resources/animations/loading.json'
import { ReactComponent as NotFoundSVG } from "../../resources/svg/not_found.svg";



const localizer = momentLocalizer(moment);

const CalenderComponent = () => {
    const [events, setEvents] = useState([]);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    const eventsHandler = async () => {
      try {
        setLoading(true);
        const response = await UserSchedule();
        const tem = response.map((slot) => (
          {
            ...slot,
            start: moment(slot.start).toDate(),
            end: moment(slot.end).toDate()
          }
        ))
        console.log(tem)
        setError(false); 
        setEvents(tem)
        setLoading(false);
      } catch (error) {
        setError(true); 
      }
  }

  useEffect(() => {
    eventsHandler();
  }, []);

  useEffect(() => {
    console.log(events);
  }, [events]);

  const defaultOptions = {
    loop: true,
    autoplay: true, 
    animationData: loadingSVG,
    rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
    }
  }

  return (
    <div className='min-h-89 w-5/6 flex flex-col gap-14 bg-grey p-14 ml-auto'>
      {events.length === 0 ?
        loading ? 
        <div className="w-full h-full flex flex-col items-center justify-center">
          <Lottie options={defaultOptions} height={430} width={515} />
        </div> : 
        <div className='w-full h-full flex flex-col items-center'>
            <NotFoundSVG width={'400px'} height={'400px'} className='opacity-50'/>
            <div className='text-[36px] font-bold text-primary opacity-1'>No Events</div>
        </div> : 
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          showAllDay={false}
          views={['week']}
          defaultView={'week'}
          components={{
            event: EventComponent
          }}
          formats={{ eventTimeRangeFormat: () => { 
            return "";
          }}}
        /> }
      </div>
  )
}
export default CalenderComponent