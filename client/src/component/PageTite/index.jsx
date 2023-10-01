import React from 'react'

const PageTitle = ({title}) => {
  return (
    <div className='w-full flex flex-row justify-between'>
        <p className='font-bold text-4xl'>{title}</p>
    </div>
  )
}

export default PageTitle