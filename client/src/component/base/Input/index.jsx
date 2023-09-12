import React from 'react'

const Input = ({ type, placeholder, value, onChange }) => {
  return (
    <div className='group relative h-14 w-full rounded-md border border-white/50 focus-within:border-white focus-within:ring-1 focus-within:ring-primary'>
      <label
        className= {`${value === "" ? "absolute left-2 top-1/2 z-0 -translate-y-1/2 bg-transparent text-white px-1 text-base pointer-events-none duration-200 group-focus-within:top-0 group-focus-within:text-xs group-focus-within:text-white group-focus-within:bg-[#3540D8]" : "absolute left-2 z-0 -translate-y-1/2  text-white px-1 pointer-events-none duration-200 top-0 text-xs text-white bg-[#3540D8]"}`}
      >
        {placeholder}
      </label> 
      <input 
        className='z-10 h-full w-full rounded-md px-3.5 py-4 outline-none bg-transparent text-white' 
        type={type} 
        value={value}
        onChange={onChange}
        />
    </div>
  );
}

export default Input