import axios from "axios";

const Predict = async ({id, predictedClassName}) => {
    try {
        const response = await axios.post(`http://127.0.0.1:8000/api/reports/open_ai`,{
            report_id: id,
            diagnosis: predictedClassName,
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
export default Predict