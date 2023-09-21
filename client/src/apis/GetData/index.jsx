import axios from "axios";

const url = 'http://127.0.0.1:8000/api/user/get_data'

const GetData = async () => {
    try {
        const response = await axios.get(url, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`
            }
          });
      return response.data.data;
    } catch (error) {
        throw error
    }
}

export default GetData