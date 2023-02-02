import React from 'react';
import useLogoutUser from '../hooks/user/useLogoutUser';

const LogoutUserPage: React.FC = () => {
  useLogoutUser();
  return <div>Logging out...</div>;
};

export default LogoutUserPage;
