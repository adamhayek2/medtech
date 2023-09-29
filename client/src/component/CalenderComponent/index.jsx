import React, {useState, useEffect} from 'react'
import './index.css'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import moment from 'moment';
import EventComponent from '../base/EventComponent';
import UserSchedule from '../../apis/UserSchedule'


const localizer = momentLocalizer(moment);

const CalenderComponent = () => {
    const [events, setEvents] = useState([]);
    const [error, setError] = useState(false);

    const eventsHandler = async () => {
      try {
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
        console.log(response)
      } catch (error) {
        console.error('error:', error);
        setError(true); 
      }
  }

  useEffect(() => {
    eventsHandler();
  }, []);

  useEffect(() => {
    console.log(events);
}, [events]);

  return (
    <div className='min-h-screen w-5/6 flex flex-col gap-14 bg-grey p-14 ml-auto'>
      {events.length === 0 ? "No events" : <Calendar
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