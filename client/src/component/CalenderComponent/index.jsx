import React from 'react'
import './index.css'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import moment from 'moment'; // Import 'moment'
import { div } from '@tensorflow/tfjs';


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

  const EventComponent = ({ event }) => (
    <div className='flex flex-row h-full justify-between'>
      <div className='flex flex-col justify-between'>
        <div className='text-xl'>{event.title}</div>
        <div className='text-base'>{event.patient}</div>
        <div className='text-grey'>
          {moment(event.start).format('LT')} - {moment(event.end).format('LT')}
        </div>
      </div>
      <div className='w-2 bg-white h-full rounded shadow-[-9px_0px_100px_19px_rgba(255,255,255,0.85)]'></div>
    </div>
  );


  return (
    
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
  )
}

export default CalenderComponent