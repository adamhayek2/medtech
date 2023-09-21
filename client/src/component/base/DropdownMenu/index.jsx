import React, { useState } from 'react';

const DropdownMenu = ({ placeholder, onChange , options }) => {
    const [openDropdown, setOpenDropdown] = useState(false);
    const [text, setText] = useState(placeholder);

    const handleOptionClick = (option) => {
        setText(option.name);
        setOpenDropdown(false);
        onChange(option.id);
    };

    const handleButtonClick = (e) => {
        e.preventDefault();
        setOpenDropdown((prev) => !prev);
        };

  return (
    <div className="relative w-full">
      <button
        className={`border-primary group relative h-14 w-full rounded-md border focus-within:border-white focus-within:ring-1 focus-within:ring-primary text-left px-3 text-primary` }
        onClick={handleButtonClick}
      >
        {text}
      </button>
      {openDropdown && (
        <div className="bg-white rounded-lg absolute top-15 w-full border border-[0.5px] border-primary z-10 h-32 overflow-y-scroll">
          {options.map((option) => (
            <div
              key={option.id}
              className="px-4 py-2 w-full hover:bg-primary/20 hover:text-primary cursor-pointer"
              onClick={() => handleOptionClick(option)}
            >
              {option.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;