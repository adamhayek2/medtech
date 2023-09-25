import React from 'react'

const SingleNotification = ({notification}) => {
  return (
    <div className={`flex w-full h-[100px] flex-col justify-center items-start pl-6 pr-[217px] pt-0 pb-2 rounded-lg ${notification.seen ? '': 'border-l-[12px] border-l-primary border-solid '} border-[0.5px] border-solid border-[#000000]/30 bg-white `}>
        <div className={`text-[28px] font-normal leading-[normal] ${notification.seen ? 'text-primary/80 ': 'text-primary'}`}>{notification.title}</div>
        <div className={`text-base font-normal leading-[normal] ${notification.seen ? 'text-[#000000]/50 ': 'text-[#000000]/70'}`}>{notification.body}</div>
    </div>
  )
}

export default SingleNotification