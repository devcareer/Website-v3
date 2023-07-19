import axios from 'axios';
import { getResetToken } from '../src/utils';
const BASE_URL = import.meta.env.VITE_BASE_URL;
const resetToken=getResetToken()
const resetconfig = {
  headers: {
    Authorization: resetToken
  }
};

//  Forget password flow
export const forgetPassword = async (formData) => {
  return axios.post(`${BASE_URL}/auth/forgot`, formData);
};
//Reset Password
export const resetPassword = async (formData) => {
  return axios.post(`${BASE_URL}/auth/reset`, formData,resetconfig);
};
//  change Password
export const changePassword = async (formData) => {
  return axios.post(`${BASE_URL}/auth/change`, formData);
};

export const signUp = async (formData) => {
  return axios.post(`${BASE_URL}/auth/signup`, formData);
};
