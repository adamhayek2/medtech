import React from 'react'

const SingleNotification = ({notification}) => {
  return (
    <div className={`flex w-full h-[100px] flex-col justify-center items-start pl-6 pr-[217px] pt-0 pb-6 rounded-lg border-l-[12px] border-l-primary border-solid bg-white`}>
        <div className={`text-primary text-[28px] font-normal leading-[normal]`}>{notification.title}</div>
        <div className={`text-[#000000]/70 text-base font-normal leading-[normal]`}>{notification.body}</div>
    </div>
  )
}

export default SingleNotification