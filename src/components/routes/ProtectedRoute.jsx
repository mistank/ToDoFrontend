/* eslint-disable react/prop-types */
import { Route, useNavigate } from 'react-router-dom';

export default function ProtectedRoute({ component: Component, isAuthenticated, ...rest }) {
  const navigate = useNavigate();

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? (
          <Component {...props} />
        ) : (
          // Umesto da koristite <Redirect />, pozovite navigate funkciju
          navigate('/login')
        )
      }
    />
  );
}
