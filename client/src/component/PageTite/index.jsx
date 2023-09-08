import React from 'react'
import { ReactComponent as SearchSVG } from "../../resources/svg/search.svg";

const PageTitle = ({title}) => {
  return (
    <div className='w-full flex flex-row justify-between'>
        <p className='font-bold text-4xl'>{title}</p>
        <SearchSVG/>
    </div>
  )
}

export default PageTitle