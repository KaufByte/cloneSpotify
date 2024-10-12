import React from "react";
import { Routes, Route, Navigate } from "react-router-dom"; 
import Login from "./components/Login"; 
import Entrance from "./components/Entrance";
import SpotifyPage from "./components/main-page";

const App: React.FC = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Navigate to="/signup" />} />

        <Route path="/login" element={<div className="login-page"><Login /></div>} />
        <Route path="/signup" element={<div className="signup-page"><Entrance /></div>} /> 
        <Route path="/main-page1" element={<div className="main-page1"><SpotifyPage/></div>} />
      </Routes>
    </div>
  );
};

export default App;



