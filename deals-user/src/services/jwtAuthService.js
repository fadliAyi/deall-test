const axios = require('axios');


const validateToken = async (token) => {
  const instance = axios.create({
    baseURL: process.env.AUTH_BASE_URL,
    headers: { 'Authorization': token }
  });
  const result = {
    status: false,
    message: '',
    data: null,
    statusCode: 400 
  };
  try {
    const response = await instance.get('/me');
    const { data, error } = response;

    if (data) {
      result.status = true;
      result.data = data;
      result.statusCode = 200;
    } else if (error) {
      
    }

    return result;
  } catch (err) {
    const error = err.response;
    const responseData = error?.data;
    const errMessage =  responseData?.error;

    result.message = errMessage;
    result.statusCode = error?.status;

    console.log(errMessage);
    if (error?.status >= 500) {
      throw new Error(errMessage);
    }

    return result;
  }
}

module.exports = {
  validateToken
}
