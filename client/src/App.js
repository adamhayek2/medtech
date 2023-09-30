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
import PrivateRoutes from './utils/PrivateRoutes';

function App() {
  const [notifications, setNotifications] = useState([]);
  const fcm_token = localStorage.getItem('fcm_token');

  useEffect(() => {
    if (!fcm_token) fetchToken();
    const not = onMessageListener().then((payload) => {
      const receivedNotifications = {
        title: payload?.notification?.title,
        body: payload?.notification?.body,
      };

      setNotifications((notifications) => [
        ...notifications,
        receivedNotifications,
      ]);
      toast.custom((t) => (
        <div
          className={`${
            t.visible ? 'animate-enter' : 'animate-leave'
          } max-w-md w-full bg-white rounded-lg pointer-events-auto flex font-futur`}
        >
          <div className="flex-1 w-full p-4">
            <div className="flex items-start">
              <div className="ml-3 flex-1">
                <p className="text-xl text-gray-900 font-futur">
                  {receivedNotifications.title}
                </p>
                <p className="mt-1 text-gray-500 text-base font-futur">
                  {receivedNotifications.body}
                </p>
              </div>
            </div>
          </div>
          <div className="flex border-l border-primary">
            <button
              onClick={() => toast.dismiss(t.id)}
              className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-xl font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-futura text-primary"
            >
              X
            </button>
          </div>
        </div>
      ));
    });
  }, [notifications]);

  return (
    <>
     <Toaster position='top-center'/>
      <BrowserRouter> 
        <Routes>
          <Route path="/" element={<Authentication />}/>
          <Route element={<PrivateRoutes/>}>
            <Route path="/patients" element={<Home/>}/> 
            <Route path="/patient/:id" element={<SinglePatient/>}/> 
            <Route path="/reports" element={<Reports/>}/> 
            <Route path="/report/:id" element={<SingleReport/>}/> 
            <Route path="/schedule" element={<Schedule/>}/> 


            <Route path="/dashboard" element={<Dashboard/>}/> 
            <Route path="/employees" element={<Employees/>}/> 
            <Route path="/employee/:id" element={<EmployeeProfile/>}/> 
          </Route>
        </Routes>
      </BrowserRouter> 
    </>
    
  )
}

export default App