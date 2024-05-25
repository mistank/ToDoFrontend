import { AuthProvider } from './AuthProvider.jsx';
import App from '../App.jsx';

function Root() {
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  );
}

export default Root;
