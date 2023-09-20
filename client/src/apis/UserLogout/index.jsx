import axios from 'axios';

const apiUrl = 'http://127.0.0.1:8000/api/user/logout';

const UserLogout = async (token) => {

  try {
    const response = await axios.post(apiUrl, {}, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    if (response.status === 200) {
      localStorage.removeItem("token"); 
      return response;
    } else {
      throw new Error('Logout failed');
    }
  } catch (error) {
    throw Error('Logout failed');
  }
};

export default UserLogout;