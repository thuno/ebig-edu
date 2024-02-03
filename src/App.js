import React from 'react';
import './assets/skin/color.css';
import './assets/skin/typography.css';
import './App.css';
import './assets/skin/layout.css';

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import MainLayout from './screen/layout/main-layout';
// import 'react-toastify/dist/ReactToastify.css';
const checkToken = () => {
  // const token = localStorage.getItem('token');
  // if (token) return true;
  // return false;
  return true;
};


function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        {/* <Route path="/login" element={<LoginScreen />} /> */}
        <Route path="/*" element={checkToken() === true ? <MainLayout /> : <Navigate to={"/login"} replace />} />
        <Route path="/" element={<Navigate to={checkToken() === false ? "/login" : "/edu-management/dashboard"} replace />} />
      </Routes>
    </BrowserRouter></>
  );
}

export default App;
