import './App.css';
import { useContext } from 'react';
import UnloggedView from './components/UnloggedView/UnloggedView.jsx';
import { AuthContext } from './components/AuthProvider.jsx';
import LoggedInView from './components/LoggedView.jsx';

function App() {
  const { isAuthenticated } = useContext(AuthContext);

  return isAuthenticated ? <LoggedInView isAuthenticated={isAuthenticated}></LoggedInView> : <UnloggedView></UnloggedView>;
}

export default App;
