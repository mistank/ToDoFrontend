// hooks/useGoogleLogout.js
import { googleLogout } from '@react-oauth/google';
import { useContext } from 'react';
import { AuthContext } from '../AuthProvider.jsx';

export default function useGoogleLogoutHook() {
  const { logout } = useContext(AuthContext);

  const logoutGoogle = async () => {
    try {
      await googleLogout();
      logout();
    } catch (error) {
      console.error('Failed to log out', error);
    }
  };

  return logoutGoogle;
}
