import axios from "axios";

const apiUrl = 'http://127.0.0.1:8000/api/admin/dashboard';

const GetPatients = async () => {
    try {
        const response = await axios.get(apiUrl, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`
            }
          });
          
      return response.data;
    } catch (error) {
      throw error
    }
  };
export default GetPatients
