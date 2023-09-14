import axios from "axios";

const apiUrl = 'http://127.0.0.1:8000/api/user/all_reports';

const GetReports = async () => {
    try {
        const response = await axios.get(apiUrl, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`
            }
          });

      if(response.data.message) return response.data.message;
      return response.data.data;
    } catch (error) {
      console.error('Error fetching posts', error);
    }
  };
export default GetReports
