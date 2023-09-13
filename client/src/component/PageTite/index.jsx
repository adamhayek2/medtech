import React from 'react'
import SearchInput from '../base/SearchInput';

const PageTitle = ({title}) => {
  return (
    <div className='w-full flex flex-row justify-between'>
        <p className='font-bold text-4xl'>{title}</p>
        {/* <SearchInput query={title}/> */}
    </div>
  )
}

export default PageTitle