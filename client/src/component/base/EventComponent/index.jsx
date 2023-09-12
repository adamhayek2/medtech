import React from 'react'
import moment from 'moment';

const EventComponent = ({event}) => {
  return (
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
  )
}

export default EventComponent