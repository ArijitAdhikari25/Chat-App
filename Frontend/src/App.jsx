import React, { useEffect } from 'react'
import Navbar from './Components/Navbar'
import { Navigate, Route, Routes } from "react-router-dom"

import HomePage from "./Pages/HomePage";
import LoginPage from './Pages/LoginPage';
import ProfilePage from './Pages/ProfilePage';
import Settings from './Pages/SettingsPage';
import SignUpPage from './Pages/SignUpPage';
import { useAuthStore } from './Store/useAuthStore';


import {Loader} from "lucide-react"
import { Toaster } from 'react-hot-toast';
import { useThemeStore } from './Store/useThemeStore';


function App() {
  const { authUser, checkAuth, isCheckingAuth,onlineUsers } = useAuthStore()
  const {theme}=useThemeStore();

  console.log(onlineUsers);
  
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  console.log({ authUser });


  if (isCheckingAuth && !authUser)
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );


  return (
    <div data-theme={theme}>
      
      <Navbar />
       <Routes>
        <Route path="/" element={authUser ? <HomePage /> : <Navigate to="/login" />} />
        <Route path="/signup" element={!authUser ? <SignUpPage /> : <Navigate to="/" />} />
        <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to="/" />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/profile" element={authUser ? <ProfilePage /> : <Navigate to="/login" />} />
      </Routes>
    <Toaster/>

    </div>
  )
}

export default App