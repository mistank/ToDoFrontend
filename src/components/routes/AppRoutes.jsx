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
  const base = "/ToDoFrontend";
  return (
    <Router>
      <Routes>
        <Route
          path={`${base}/`}
          element={
            isAuthenticated ? <LoggedView /> : <Navigate to={`${base}/login`} />
          }
        />
        <Route path={`${base}/login`} element={<UnloggedView />} />
        <Route
          path={`${base}/reset-password`}
          element={<ChangePasswordForm />}
        />
      </Routes>
    </Router>
  );
}

export default AppRoutes;
