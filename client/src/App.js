import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Authentication from './pages/Authentication';
import Home from './pages/Home';
import Reports from './pages/Reports';
import Schedule from './pages/Schedule';
import SingleReport from './pages/SingleReport';
import Dashboard from './pages/Dashboard';
import SinglePatient from './pages/SinglePatient';
import Employees from './pages/Employees';
import EmployeeProfile from './pages/EmployeeProfile';
import { fetchToken, onMessageListener } from './utils/initializingFirebase';
import toast, { Toaster } from 'react-hot-toast';

function App() {
  const [notification, setNotification] = useState([]);
  const fcm_token = localStorage.getItem('fcm_token');

  useEffect(() => {
    if (!fcm_token) fetchToken();
    const not = onMessageListener().then((payload) => {
      const receivedNotification = {
        title: payload?.notification?.title,
        body: payload?.notification?.body,
      };
      console.log(receivedNotification);
    
    });
  }, [notification]);

  return (
    <>
     <Toaster position='top-center'/>
      <BrowserRouter> 
        <Routes>
          <Route path="/" element={<Authentication />}/> 
          <Route path="/patients" element={<Home/>}/> 
          <Route path="/patient/:id" element={<SinglePatient/>}/> 
          <Route path="/reports" element={<Reports/>}/> 
          <Route path="/report/:id" element={<SingleReport/>}/> 
          <Route path="/schedule" element={<Schedule/>}/> 


          <Route path="/dashboard" element={<Dashboard/>}/> 
          <Route path="/employees" element={<Employees/>}/> 
          <Route path="/employee/:id" element={<EmployeeProfile/>}/> 
        </Routes>
      </BrowserRouter> 
    </>
    
  );
}

export default App;
