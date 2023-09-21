import axios from "axios";

const EditStaffInfos = async (id, firstName, lastName, email,phoneNumber, gender, dateOfBirth, department, major) => {
    try {
        const response = await axios.post(`http://127.0.0.1:8000/api/admin/edit_staff/${id}`,{
              first_name: firstName,
              last_name: lastName,
              email: email,
              phone_number: phoneNumber,
              gender_id: gender,
              date_of_birth: dateOfBirth,
              department_id: department,
              major: major,
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
export default EditStaffInfos