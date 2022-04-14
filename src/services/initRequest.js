import axios from "axios";

const requestConfig = {
  baseURL: process.env.REACT_APP_ENDPOINT_URL,
  timeout: 5000,
  showSpinner: false,
};

export const axiosInstance = axios.create(requestConfig);
export const initRequest = (store) => {
  axiosInstance.interceptors.request.use(
    async (config) => {
      const accessToken = store?.getState()?.auth?.accessToken;
      if (!config.headers.Authorization && accessToken) {
        config.headers.Authorization = accessToken;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  axiosInstance.interceptors.response.use(
    (response) => {
      if (response && response.data) {
        return response.data;
      }
      return response;
    },
    (error) => {
      const refreshToken = store?.getState()?.auth?.refreshToken;
      const { status, message } = error.response;
      if (status === 401 && message === "Unauthorized") {
        // if (refreshToken) {
        //   store.dispatch(getRefreshToken(refreshToken));
        // }
      } else if (status === 401 && message === "jwt expired") {
        if (refreshToken) {
          // store.dispatch(getRefreshToken(refreshToken));
        }
      }
      return Promise.reject(error);
    }
  );
};

export default axiosInstance;