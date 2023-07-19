import axios from 'axios';
import Cookies from 'js-cookie';
const BASE_URL = import.meta.env.VITE_BASE_URL;
const token = Cookies.get('resetPasswordToken');
    const cleanedToken = token.substring(2);
const resetconfig = {
  headers: {
    Authorization: cleanedToken
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
