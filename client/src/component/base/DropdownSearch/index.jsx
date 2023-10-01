import React, { useState, useEffect } from 'react';
import { useDebounce } from "@uidotdev/usehooks";
import GetStaff from '../../../apis/GetStaff';

const DropdownSearch = ({ onChange }) => {
  const [employees, setEmployees] = useState([]);
  const [attendees, setAttendees] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const debouncedSearchValue = useDebounce(searchValue, 300);
  const [openDropdown, setOpenDropdown] = useState(false);
  const [error, setError] = useState(false);

  const handleOptionClick = (option) => {
    setOpenDropdown(false);
    const newAttendees = [...attendees, { staff_id: option.id }];
    setAttendees(newAttendees);
    onChange(newAttendees);
    setSearchValue('');
  };

  const removeAttendee = (id) => {
    const updatedAttendees = attendees.filter((attendee) => attendee.staff_id !== id);
    setAttendees(updatedAttendees);
  };

  const fetchFilterResult = async () => {
    try {
      const response = await GetStaff({ filter: searchValue });
      setError(false);
      setEmployees(response);
    } catch (error) {
      console.error('error:', error);
      setError(true);
    }
  };

  useEffect(() => {
    fetchFilterResult();
  }, [debouncedSearchValue]);

  return (
    <div className="relative w-full">
      <input
        type="search"
        placeholder='Search'
        className="border-solid border-b-[1px] border-primary focus:border-b-2 focus:outline-none w-full"
        onChange={(e) => setSearchValue(`?search=${e.target.value}`)}
      />
      {employees.length !== 0 && searchValue !== '' ? (
        <div className="bg-white rounded-lg absolute top-15 w-full border border-[0.5px] border-primary z-10 h-32 overflow-y-scroll">
          {employees.map((option) => (
            <div
              key={option.id}
              className="px-4 py-2 w-full hover:bg-primary/20 hover:text-primary cursor-pointer"
              onClick={() => handleOptionClick(option)}
            >
              {`${option.first_name} ${option.last_name}`}
            </div>
          ))}
        </div>
      ) : null}

      {attendees.length > 0 && (
        <div className="mt-24">
          <table className='w-full'>
            <thead>
              <tr>
                <td className='text-primary border-solid border-b-[1px] text-base'>Attendees</td >
                <td className='text-primary border-solid border-b-[1px] text-base '></td >
              </tr>
            </thead>
            <tbody>
              {attendees.map((attendee) => {
                const attendeeData = employees.find((employee) => employee.id === attendee.staff_id);
                if (!attendeeData) return null;

                return (
                  <tr key={attendeeData.id}>
                    <td className='pt-2'>{`${attendeeData.first_name} ${attendeeData.last_name}`}</td>
                    <td>
                      <div className='text-[#d74146] cursor-pointer' onClick={() => removeAttendee(attendeeData.id)}>X</div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default DropdownSearch;
