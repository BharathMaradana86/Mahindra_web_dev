import './App.css';
import React,{useState} from 'react';
import MiniDrawer from './components/MiniDrawer/MiniDrawer';
import Register from './pages/OnBoardingPages/Register';
import Login from './pages/OnBoardingPages/Login';
import {Route,Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard/Dashboard';
import Analytics from './pages/Analytics/Analytics';
import Features from './pages/Features/Features';
import LiveMonitoring from './pages/Live-Monitoring/LiveMonitoring';
import Reports from './pages/Reports/Reports';
import VMS from './pages/VMS/VMS';

function App() {
  
  const [title,setTitle] =useState("")

  const handleTitleChange = (variable) =>{
    setTitle(variable)
  }
  return (
    <>
        
        <Routes>
        <Route path="/" element={<MiniDrawer title={title} />} >
        <Route index element={<Dashboard onTitleChange={handleTitleChange} />} />
        <Route path="/live-monitoring" element={<LiveMonitoring onTitleChange= {handleTitleChange}/>}   />
        <Route path="/analytics" element={<Analytics onTitleChange= {handleTitleChange} />}  />
        <Route path="/reports" element={<Reports onTitleChange= {handleTitleChange} />}  />
        <Route path="/features" element={<Features  onTitleChange= {handleTitleChange}/>}  />
        <Route path="/vms-settings" element={<VMS  onTitleChange= {handleTitleChange}/>}  />
        </Route>
          <Route path='/Login' element={<Login/>} />
          <Route path='/Register' element={<Register/>} />
        </Routes>
    </>
  );
}

export default App;
