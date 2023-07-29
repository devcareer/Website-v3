import axios from 'axios';
import { getResetToken } from '../src/utils';
import Cookies from 'js-cookie';
const BASE_URL = import.meta.env.VITE_BASE_URL;
const resetToken = getResetToken();

const resetconfig = {
  headers: {
    Authorization: resetToken,
  },
};
const profileConfig = () => {
  const accessToken = Cookies.get('accessToken');
  return {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };
};
//  Forget password flow
export const forgetPassword = async (formData) => {
  return axios.post(`${BASE_URL}/auth/forgot`, formData);
};
//Reset Password
export const resetPassword = async (formData) => {
  return axios.post(`${BASE_URL}/auth/reset`, formData, resetconfig);
};
//  change Password
export const changePassword = async (formData) => {
  return axios.post(`${BASE_URL}/auth/change`, formData);
};

export const signUp = async (formData) => {
  return axios.post(`${BASE_URL}/auth/signup`, formData);
};
export const createProfile = async (formData) => {
  return axios.patch(
    `https://website-v3-znmt.onrender.com/api/v1/profile`,
    formData,
    profileConfig()
  );
};
export const getProfile = async () => {
  return axios.get(
    `https://website-v3-znmt.onrender.com/api/v1/profile`,
    profileConfig()
  );
};
export const makeRequest = (config) => {
  const accessToken = localStorage.getItem('accessToken');
  return axios.request({
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    ...config,
  });
};
export const signIn = async (formData) => {
  console.log(formData);
  return axios.post(
    `https://website-v3-znmt.onrender.com/api/v1/auth/login`,
    formData
  );
};

const get = (url) => {
  return makeRequest({
    url,
    method: 'GET',
  });
};
