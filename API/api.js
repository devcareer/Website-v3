import axios from 'axios';
import { getResetToken, useAuth } from '../src/utils';
import Cookies from 'js-cookie';
const BASE_URL = import.meta.env.VITE_BASE_URL;
const resetToken = getResetToken();
const accessToken = Cookies.get('accessToken');
const resetconfig = {
  headers: {
    Authorization: resetToken,
  },
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
  return axios.patch(`${BASE_URL}/profile`, formData, {
    headers: {
      Authorization: 'Bearer ' + accessToken,
    },
  });
};
export const signIn = async (formData) => {
  console.log(formData);
  return axios.post(`${BASE_URL}/auth/login`, formData);
};
