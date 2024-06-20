import axios from 'axios';

const API_URL = 'https://codechallenge.rivet.work/api/v1';
const TOKEN = 'YOUR_ACCESS_TOKEN';

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    token: TOKEN,
  },
});

export const getAllProfiles = () => axiosInstance.get('/profiles');
export const getProfile = (id: string) => axiosInstance.get(`/profile/${id}`);
export const createProfile = (data: any) => axiosInstance.post('/profile', data);
export const updateProfile = (id: string, data: any) => axiosInstance.put(`/profile/${id}`, data);
