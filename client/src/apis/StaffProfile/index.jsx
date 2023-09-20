import axios from "axios";

const StaffProfile = async ({id}) => {
    try {
        const response = await axios.get(`http://127.0.0.1:8000/api/admin/staff_profile/${id}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`
            }
          });
      return response.data.data;
    } catch (error) {
        throw error
    }
}

export default StaffProfile