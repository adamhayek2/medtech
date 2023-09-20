import axios from 'axios';

const apiUrl = 'http://127.0.0.1:8000/api/guest/logout';

const UserLogout = async () => {

  try {
    const response = await axios.post(apiUrl);

    localStorage.clear();

    return response.data.message;
  } catch (error) {
    throw new Error('Logout failed');
  }
};

export default UserLogout;