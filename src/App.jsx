import React from "react";
import { useLocation } from "react-router";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AppRoutes from "./routes/AppRoutes";

const App = () => {
  const location = useLocation();
  const isAuthPage =
    location.pathname === "/login" || location.pathname === "/register";

  if (isAuthPage) {
    return (
      <div className="min-h-screen bg-ink text-txt font-sans selection:bg-volt selection:text-ink">
        <AppRoutes />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-ink text-txt font-sans selection:bg-volt selection:text-ink">
      <Navbar />
      <div className="flex-1">
        <AppRoutes />
      </div>
      <Footer />
    </div>
  );
};

export default App;
