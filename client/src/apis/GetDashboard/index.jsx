import axios from "axios";

const apiUrl = 'http://127.0.0.1:8000/api/admin/dashboard';

const GetDashboard = async () => {
    try {
        const response = await axios.get(apiUrl, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`
            }
          });
          
      return response.data.data;
    } catch (error) {
      throw error
    }
  };
export default GetDashboard
