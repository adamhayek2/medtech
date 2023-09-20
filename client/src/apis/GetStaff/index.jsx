import axios from "axios";


const GetStaff = async ({filter}) => {
    try {
        const response = await axios.get(`http://127.0.0.1:8000/api/admin/get_staff${filter}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`
            }
          });
      return response.data.data;
    } catch (error) {
        throw error
    }
}

export default GetStaff