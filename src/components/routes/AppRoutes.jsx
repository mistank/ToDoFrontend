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

function AppRoutes() {
  const { isAuthenticated } = useContext(AuthContext);

  console.log("isAuthenticated from app routes: ", isAuthenticated);
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={isAuthenticated ? <LoggedView /> : <Navigate to="/login" />}
        />
        <Route path="/login" element={<UnloggedView />} />
      </Routes>
    </Router>
  );
}

export default AppRoutes;
