import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom';
import StaffProfile from '../../apis/StaffProfile';

const EmployeeProfileComponent = () => {
    const { id } = useParams();
    const [employee, setEmployee] = useState([]);
    const [error, setError] = useState(false);

    const fetchEmployeeProfile = async () => {
        try {
          setError(false); 
          const response = await StaffProfile({id}); 
          setEmployee(response)
          console.log(response)
        } catch (error) {
          setError(true); 
        }
    }

    useEffect(() => {
        fetchEmployeeProfile();
      }, []);

  return (
    <div>EmployeeProfileComponent</div>
  )
}

export default EmployeeProfileComponent