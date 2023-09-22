import axios from "axios";

const apiUrl = 'http://127.0.0.1:8000/api/patients/add';

const AddPatient = async (firstName, lastName, phoneNumber, gender, age, status, bloodType) => {
    try {
        const response = await axios.post(apiUrl,{
              first_name: firstName,
              last_name: lastName,
              phone_number: phoneNumber,
              gender_id: gender,
              age: age,
              status_id: status,
              blood_type_id: bloodType,
            }, 
        {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`
            }
          });
      return response.data.data;
    } catch (error) {
      console.error('Error fetching posts', error);
    }
  };
export default AddPatient