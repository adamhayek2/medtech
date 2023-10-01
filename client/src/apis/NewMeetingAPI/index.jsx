import axios from "axios";

const apiUrl = 'http://127.0.0.1:8000/api/admin/create_meeting';

const NewMeetingAPI = async (purpose, start, end, attendees) => {
    try {
        const response = await axios.post(apiUrl,{
                purpose: purpose,
                start: start,
                end: end,
                attendees: attendees,
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
export default NewMeetingAPI