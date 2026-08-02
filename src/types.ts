export type Credentials = {
  email: string;
  password: string;
};

export type Tenant = {
  id: number;
  name: string;
  address: string;
};

export type User = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  createdAt: string;
  tenant: Tenant | null;
};

export type FieldData = {
  name: string[];
  value?: string;
};
export type CreateUserData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: string;
  tenantId: number;
};
export type CreateTenantData = {
  name: string;
  address: string;
};

export interface CheckEmailQuery {
  email: string;
}
