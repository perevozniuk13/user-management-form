import { User } from '../types/userFormTypes';
import api from './api';

export const fetchUser = async (userId : string) => {
  // try {
    const response = await api.get(`/users/${userId}`);
    return response.data as User;
  // } catch (error) {
  //   console.log(error);
  //   return null
  // }
};

export const createUser = async (userData: User) => {
  // try {
    const response = await api.post('/users/add', userData);
    return response.data as User;
  // } catch (error) {
  //   console.log(error);
  //   return null
  // }
};

export const updateUser = async (userId: string, userData: User) => {
  // try {
    const response = await api.put(`/users/${userId}`, userData);
    return response.data as User;
  // } catch (error) {
  //   console.log(error);
  //   return null
  // }
};