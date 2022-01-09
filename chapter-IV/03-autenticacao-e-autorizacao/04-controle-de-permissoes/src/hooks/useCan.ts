import React from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { validateUserPermissions } from '../utils/validateUserPermissions';

type useCanParams = {
  permissions?: string[];
  roles?: string[];
};

export const useCan = ({ permissions, roles }: useCanParams) => {
  const { user, isAuthenticated } = React.useContext(AuthContext);

  if (!isAuthenticated) return false;

  const userHasValidPermissions = validateUserPermissions({
    user,
    permissions,
    roles,
  });

  return userHasValidPermissions;
};
