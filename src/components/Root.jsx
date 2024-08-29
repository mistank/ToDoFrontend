import { AuthProvider } from "./AuthProvider.jsx";
import App from "../App.jsx";
import { ThemeProvider } from "../ThemeContext.jsx";

function Root() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </AuthProvider>
  );
}

export default Root;
