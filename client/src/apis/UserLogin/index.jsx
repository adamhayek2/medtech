import axios from 'axios';

const apiUrl = 'http://127.0.0.1:8000/api/guest/login';

const loginUser = async (username, password) => {
  try {
    const response = await axios.post(apiUrl, {
      username,
      password
    });

    return response.data.data;
  } catch (error) {
    throw new Error('Login failed');
  }
};

export default loginUser;