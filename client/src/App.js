import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Authentication from './pages/Authentication';
import Home from './pages/Home';
import Reports from './pages/Reports';
import Schedule from './pages/Schedule';
import SingleReport from './pages/SingleReport';
import Dashboard from './pages/Dashboard';
import SinglePatient from './pages/SinglePatient';
import Employees from './pages/Employees';

function App() {
  return (
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
      </Routes>
    </BrowserRouter> 
  );
}

export default App;
