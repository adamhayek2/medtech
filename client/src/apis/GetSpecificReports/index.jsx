import axios from "axios";


const GetSpecificReports = async ({id}) => {
    try {
        const response = await axios.get(`http://127.0.0.1:8000/api/patients/${id}/get_reports`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`
            }
          });
      return response.data.data;
    } catch (error) {
        throw error
    }
}

export default GetSpecificReports