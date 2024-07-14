import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import LoggedView from "../LoggedView/LoggedView.jsx";
import UnloggedView from "../UnloggedView/UnloggedView.jsx";
import { useContext } from "react";
import { AuthContext } from "../AuthProvider.jsx";
import ChangePasswordForm from "../UnloggedView/ChangePasswordForm.jsx";

function AppRoutes() {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={isAuthenticated ? <LoggedView /> : <Navigate to="/login" />}
        />
        <Route path="/login" element={<UnloggedView />} />
        <Route path="/reset-password" element={<ChangePasswordForm />} />
      </Routes>
    </Router>
  );
}

export default AppRoutes;
