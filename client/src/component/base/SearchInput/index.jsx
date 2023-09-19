import React from 'react'
import { ReactComponent as SearchSVG } from "../../../resources/svg/search.svg";

const SearchInput = ( {onChange} ) => {
    

  return (
    <form className="relative z-0">
        <input type="search" 
              className="peer cursor-pointer relative z-10 h-12 w-12 rounded-full border border-black bg-transparent pl-12 outline-none focus:w-full focus:cursor-text focus:border-black focus:pl-16 focus:pr-4 transition duration-100" onChange={onChange}/>
        <SearchSVG className='absolute inset-y-0 my-auto h-8 w-12 border-r border-transparent stroke-gray-500 px-3.5 peer-focus:border-lime-300 peer-focus:stroke-lime-500 '/>
      </form>
  )
}

export default SearchInput