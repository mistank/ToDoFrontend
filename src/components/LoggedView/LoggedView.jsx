/* eslint-disable react/prop-types */
import { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../Header/Header.jsx';
import Mainboard from './Mainboard.jsx';
import { AuthContext } from '../AuthProvider.jsx';

export default function LoggedView() {
  const navigate = useNavigate();
  const { isAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  return (
    <>
      <Header></Header>
      <Mainboard className="flex-1"></Mainboard>
    </>
  );
}
