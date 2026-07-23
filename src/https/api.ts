import type { Credentials } from '../types';
import { api } from './client';

export const AUTH_SERVICE = '/auth';

// Auth Service

export const login = (credential: Credentials) =>
  api.post(`${AUTH_SERVICE}/login`, credential);
export const self = () => api.get(`${AUTH_SERVICE}/self`);
export const logout = () => api.post(`${AUTH_SERVICE}/logout`);
export const getUsers = () => api.get('/users');
export const getTenants = () => api.get('/tenants');
