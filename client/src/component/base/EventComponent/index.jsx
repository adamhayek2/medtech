import React from 'react'
import moment from 'moment';

const EventComponent = ({event}) => {
  return (
    <div className='flex flex-row h-full justify-between'>
      <div className='flex flex-col gap-1'>
        <div className='text-xl font-bold'>{event.title}</div>
        <div className='text-s'>{event.patient}</div>
        <div className='text-grey pt-5'>
          {moment(event.start).format('LT')} - {moment(event.end).format('LT')}
        </div>
      </div>
      <div className='w-2 bg-white h-full rounded shadow-[-9px_0px_100px_19px_rgba(255,255,255,0.85)]'></div>
    </div>
  )
}

export default EventComponent