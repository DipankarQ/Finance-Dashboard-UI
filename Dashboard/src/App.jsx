import { useState, useEffect } from "react";
import { AppProvider } from "./context/AppContext";
import DashboardLayout from "./components/DashboardLayout";
import LoginScreen from "./components/LoginScreen";

// Sync dark mode on the <html> element before first render
const getInitialDark = () => {
  try {
    const saved = localStorage.getItem("fintech-dark-mode");
    if (saved !== null) return JSON.parse(saved);
  } catch { /* ignore */ }
  return window.matchMedia?.("(prefers-color-scheme: dark)").matches ?? true;
};

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [darkMode, setDarkMode]     = useState(getInitialDark);

  // Apply dark class to <html> whenever darkMode changes (for LoginScreen)
  useEffect(() => {
    const html = document.documentElement;
    darkMode ? html.classList.add("dark") : html.classList.remove("dark");
    try { localStorage.setItem("fintech-dark-mode", JSON.stringify(darkMode)); } catch { /* ignore */ }
  }, [darkMode]);

  const toggleDark = () => setDarkMode((d) => !d);

  const handleLogin  = () => setIsLoggedIn(true);
  const handleLogout = () => setIsLoggedIn(false);

  if (!isLoggedIn) {
    return <LoginScreen onLogin={handleLogin} darkMode={darkMode} toggleDark={toggleDark} />;
  }

  return (
    <AppProvider initialDarkMode={darkMode}>
      <DashboardLayout onLogout={handleLogout} />
    </AppProvider>
  );
};

export default App;
