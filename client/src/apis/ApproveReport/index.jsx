import axios from "axios";

const apiUrl = `http://127.0.0.1:8000/api/doctor/report/approve_report`;

const ApproveReport = async ({id}) => {
    try {
        const response = await axios.post(apiUrl ,{
            report_id: id,
          }, 
        {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`
            }
          });
      return response.data.data.original.data;
    } catch (error) {
      console.error('Error', error);
    }
  };
export default ApproveReport