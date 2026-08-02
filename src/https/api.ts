import type {
  CheckEmailQuery,
  CreateTenantData,
  CreateUserData,
  Credentials,
} from '../types';
import { api } from './client';

export const AUTH_SERVICE = '/auth';

// Auth Service

export const login = (credential: Credentials) =>
  api.post(`${AUTH_SERVICE}/login`, credential);
export const self = () => api.get(`${AUTH_SERVICE}/self`);
export const logout = () => api.post(`${AUTH_SERVICE}/logout`);
export const getUsers = (queryString: string) =>
  api.get(`/users?${queryString}`);

export const checkEmail = (query: CheckEmailQuery) =>
  api.get('/users/check-email', {
    params: query,
  });

export const getTenants = (queryString: string) =>
  api.get(`/tenants?${queryString}`);

export const createUser = (user: CreateUserData) => api.post('/users', user);

export const createTenant = (tenant: CreateTenantData) =>
  api.post('/tenants', tenant);
