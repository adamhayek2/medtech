import axios from "axios";

const apiUrl = 'http://127.0.0.1:8000/api/admin/add_staff';

const CreateStaff = async (firstName, lastName, email,phoneNumber, gender, dateOfBirth, department, major, user_type, username, password) => {
    try {
        const response = await axios.post(apiUrl,{
              first_name: firstName,
              last_name: lastName,
              email: email,
              phone_number: phoneNumber,
              gender_id: gender,
              date_of_birth: dateOfBirth,
              department_id: department,
              major: major,
              user_type_id: user_type,
              username: username,
              password: password,
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
export default CreateStaff