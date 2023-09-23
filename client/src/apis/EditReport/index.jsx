import axios from "axios";



const EditReport = async (id, newReport) => {
    try {
        const response = await axios.post(`http://127.0.0.1:8000/api/reports/${id}update_report_data`,{
              report_data: newReport,
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
export default EditReport