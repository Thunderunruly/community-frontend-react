import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:8090',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

apiClient.interceptors.request.use();

apiClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error?.response) {
      const status = error.response.status;
      switch(status) {
        case 401:
          localStorage.removeItem("isAuthenticated");
          break;
        default:
          break;
      }
    }
    return Promise.reject(error.response.data);
  }
);

const get = (url, params, config = {}) => {
  return apiClient.get(url, { params, ...config });
};

const post = (url, data, config = {}) => {
  return apiClient.post(url, data, config);
};

const put = (url, data, config = {}) => {
  return apiClient.put(url, data, config);
};

const del = (url, config = {}) => {
  return apiClient.delete(url, config);
};

export { get, post, put, del };
