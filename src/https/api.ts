import type { CreateUserData, Credentials } from '../types';
import { api } from './client';

export const AUTH_SERVICE = '/auth';

// Auth Service

export const login = (credential: Credentials) =>
  api.post(`${AUTH_SERVICE}/login`, credential);
export const self = () => api.get(`${AUTH_SERVICE}/self`);
export const logout = () => api.post(`${AUTH_SERVICE}/logout`);
export const getUsers = (queryString: string) =>
  api.get(`/users?${queryString}`);
export const getTenants = () => api.get('/tenants');
export const createUser = (user: CreateUserData) => api.post('/users', user);
