import axios from 'axios';
import {useNavigate} from 'react-router-dom';

const apiUrl = 'http://127.0.0.1:8000/api/guest/logout';

const UserLogout = async () => {
    const navigate = useNavigate();

    const logoutNavigate = () => {
        navigate('/');
    }
  try {
    const response = await axios.post(apiUrl);

    localStorage.clear();

    logoutNavigate();

    return response.data.message;
  } catch (error) {
    throw new Error('Logout failed');
  }
};

export default UserLogout;