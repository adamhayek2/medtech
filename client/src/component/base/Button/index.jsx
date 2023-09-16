import React from 'react'

const Button = ({ label, BgColor, textColor }) => {
  return (
    <button className={`w-full h-full rounded-lg text-xl font-bold ${BgColor === null ? "bg-white" : BgColor} ${textColor === null ? "text-[#3540D8]" : textColor}`}>{label}</button>
  )
}

export default Button