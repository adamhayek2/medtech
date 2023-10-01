import axios from 'axios';

const apiUrl = 'http://127.0.0.1:8000/api/guest/forgot_password';

const loginUser = async ({username}) => {
  try {
    const response = await axios.post(apiUrl, {
      username,
    });

    return response.data.data;
  } catch (error) {
    throw Error('Operation failed');
  }
};

export default loginUser;