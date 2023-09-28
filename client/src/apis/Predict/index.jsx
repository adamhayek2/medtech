import axios from "axios";

const Predict = async (id, diagnose) => {
    try {
        const response = await axios.post(`http://127.0.0.1:8000/api/report/open_ai`,{
              report_id: id,
              diagnosis: diagnose,
            }, 
        {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`
            }
          });
      return response.data.data;
    } catch (error) {
      console.error('Error', error);
    }
  };
export default Predict