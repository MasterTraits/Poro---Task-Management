import { useState, useEffect } from 'react'
import { Route, Routes, Navigate, BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider"
import { auth } from '@/firebase'
import { onAuthStateChanged } from 'firebase/auth';

// Landing Page
import MainLayout from '@/pages/NavFixed.jsx'
import LandingPage from '@/pages/LandingPage.jsx'

// Login & Register 
import LoginPage from '@/pages/LoginPage.jsx'
import RegisterPage from '@/pages/RegisterPage.jsx'

// Utility
import Utility from '@/pages/Utility.jsx'
import History from '@/pages/History.jsx'

// Error
import ErrorPage from "@/pages/ErrorPage.jsx"

// For authentication

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
    const subscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        setIsAuthenticated(true);
      } else {  
        setIsAuthenticated(false);
      }
    });

    return () =>  subscribe();
  }, []);
  
  return (
    <ThemeProvider>
      <BrowserRouter>
        {/* {!isAuthenticated && <Navigate to="/register"/>} */}
      <Routes>  
        <Route path="/" element={<MainLayout/>}/>
        <Route path="/home" element={<LandingPage/>}/>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/register" element={<RegisterPage/>}/>
        <Route path="/utility" element={<Utility/>}/>
        <Route path="/History" element={<History/>}/>
        <Route path="*" element={<ErrorPage/>}/>
      </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
