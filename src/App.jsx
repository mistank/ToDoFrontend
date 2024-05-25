import { useState, useEffect, useContext } from 'react';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import UnloggedView from './components/UnloggedView/UnloggedView.jsx';
import { AuthContext } from './components/AuthProvider.jsx';
import LoggedView from './components/LoggedView.jsx';

function App() {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState([]);
  const { isAuthenticated, login, logout } = useContext(AuthContext);

  const googleLogin = useGoogleLogin({
    onSuccess: (codeResponse) => {
      setUser(codeResponse);
      login();
    },
    onError: (error) => console.log('Login Failed:', error),
  });

  const regularLogin = (username, password) => {
    // Implement your regular login logic here
    // If login is successful, set isAuthenticated to true
  };

  useEffect(() => {
    if (user) {
      axios
        .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
          headers: {
            Authorization: `Bearer ${user.access_token}`,
            Accept: 'application/json',
          },
        })
        .then((res) => {
          setProfile(res.data);
        })
        .catch((err) => console.log(err));
    }
  }, [user]);

  const googleLogOut = async () => {
    try {
      await googleLogout();
      setUser(null);
      setProfile(null);
      logout();
    } catch (error) {
      console.error('Failed to log out', error);
    }
  };

  return isAuthenticated ? <LoggedView profile={profile} googleLogout={googleLogOut} /> : <UnloggedView googleLogin={googleLogin} regularLogin={regularLogin} />;
}

export default App;
