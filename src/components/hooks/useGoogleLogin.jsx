// hooks/useGoogleLogin.js
import { useGoogleLogin } from '@react-oauth/google';
import { useContext } from 'react';
import { AuthContext } from '../AuthProvider.jsx';
import { useNavigate } from 'react-router-dom';

export default function useGoogleLoginHook() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const loginGoogle = useGoogleLogin({
    onSuccess: (codeResponse) => {
      console.log('Google Login Successful:', codeResponse);
      login(navigate);
    },
    onError: (error) => console.log('Login Failed:', error),
  });

  return loginGoogle;
}
