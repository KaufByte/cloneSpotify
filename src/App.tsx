// App.tsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./components/Login"; 
import Entrance from "./components/Entrance";

const App: React.FC = () => {
  return (
    <div>
      <Routes>
      <Route path="/login" element={<div className="login-page"><Login /></div>} />
      <Route path="/signup" element={<div className="signup-page"><Entrance /></div>} />
       
      </Routes>
    </div>
  );
};

export default App;
