import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BASE_URL || 'http://localhost';
console.log("1111");

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

api.interceptors.response.use(
  (response) => {
    if (response.status >= 200 && response.status <= 400) {

      return {
        ...response,
      };
    }

    return response;
  },
);

api.interceptors.request.use(
  (config) => {
    const newConfig = { ...config };
    // Ignore 'multipart/form-data' in this case
    if (config.headers['Content-Type'] !== 'multipart/form-data') {
      newConfig.data = config.data;
      newConfig.params = config.params;
    }

    return newConfig;
  },

  (error) => Promise.reject(error)
);

export default api;
