import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BASE_URL;
const config = {
  headers: {
    'Content-Type': 'multipart/form-data',
  },
};

//  Forget password flow
export const forgetPassword = async (formData) => {
  return axios.post(`${BASE_URL}/auth/forgot`, formData);
};
//Reset Password
export const resetPassword = async (formData) => {
    return axios.post(`${BASE_URL}/auth/reset`, formData);
  };
//  change Password
export const changePassword = async (formData) => {
    return axios.post(`${BASE_URL}/auth/change`, formData);
  };