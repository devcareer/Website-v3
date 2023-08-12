import axios from 'axios';
import Cookies from 'js-cookie';
import { getResetToken } from '../src/utils';
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
  return axios.patch(`${BASE_URL}/profile`, formData, profileConfig());
};
export const getProfile = async () => {
  return axios.get(`${BASE_URL}/profile`, profileConfig());
};
export const getFreeProfile = async (name) => {
  return axios.get(`${BASE_URL}/profile/${name}`);
};
export const signIn = async (formData) => {
  return axios.post(`${BASE_URL}/auth/login`, formData);
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
const get = (url) => {
  return makeRequest({
    url,
    method: 'GET',
  });
};
