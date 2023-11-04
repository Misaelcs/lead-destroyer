import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

const api: AxiosInstance = axios.create({
  baseURL: import.meta.env.API_BASEPATH ?? 'localhost',
});

api.interceptors.request.use(
  (config: AxiosRequestConfig | any) => {
    return config;
  },
  (error: any) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response: AxiosResponse) => {
    // You can perform common response handling here, e.g., error checking or data transformation
    return response;
  },
  (error: any) => {
    return Promise.reject(error);
  }
);

export default api;