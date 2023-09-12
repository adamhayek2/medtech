import React from 'react'
import './index.css'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import moment from 'moment';
import EventComponent from '../base/EventComponent';


const localizer = momentLocalizer(moment);

const CalenderComponent = () => {
  const events = [
    {
      title: 'Event 1',
      start: new Date(2023, 8, 12, 10, 0),
      end: new Date(2023, 8, 12, 11, 30),
      patient: 'adam hayek',
    },
  ];

  return (
    <div className='min-h-screen w-5/6 flex flex-col gap-14 bg-grey p-14 ml-auto'>
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
        />
      </div>
  )
}

export default CalenderComponent