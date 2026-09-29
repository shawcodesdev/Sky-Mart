import React from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AppRoutes from "./routes/AppRoutes";

const App = () => {


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
