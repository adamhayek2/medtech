import axios from "axios";

const apiUrl = 'http://127.0.0.1:8000/api/patients/search';

const PatientSearch = async ({query}) => {
    try {
        const response = await axios.get(apiUrl, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            },
            params: {
                query: query 
            }
        });

        if(response.data.message) return response.data.message;
        return response.data.data;
    } catch (error) {
        console.error('Error fetching posts', error);
    }
};
export default PatientSearch