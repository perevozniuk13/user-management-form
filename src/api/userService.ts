import { User } from '../types/userFormTypes';
import api from './api';

export const fetchUser = async (userId : string) => {
    const response = await api.get(`/users/${userId}`);
    return response.data as User;
};

export const createUser = async (userData: User) => {
    const response = await api.post('/users/add', userData);
    return response.data as User;
};

export const updateUser = async (userId: string, userData: User) => {
    const response = await api.put(`/users/${userId}`, userData);
    return response.data as User;
};