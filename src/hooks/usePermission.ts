import type { User } from '../store';

export const usePermission = () => {
  const allowedRoles = ['admin', 'manager'];
   

  const _hashPermission = (user: User | null) => {
    console.log('User:', user);
    console.log('Role:', user?.role);
    if (user) {
      return allowedRoles.includes(user.role);
    }
    return false;
  };

  return { isAllowed: _hashPermission };
};
