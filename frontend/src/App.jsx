import React from 'react'
import { Routes, Route } from "react-router";
import HomePage from './pages/HomePage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import SignUpPage from './pages/SignUpPage.jsx';
import OnboardingPage from './pages/OnboardingPage.jsx';
import NotificationsPage from './pages/NotificationsPage.jsx';
import ChatPage from './pages/ChatPage.jsx';
import CallPage from './pages/CallPage.jsx';  
import { Toaster } from 'react-hot-toast';
import { useQuery } from '@tanstack/react-query';
import  axiosInstance  from './lib/axios.js';

const App = () => {
  const {data, isLoading, error} = useQuery({
    queryKey:['todos'],
    queryFn: async () => {
      const res = await axiosInstance.get('http://localhost:5005/api/auth/loginCheck');
      return res.data;
    },
  })
  console.log(data)

  return (
    <div className="h-screen " data-theme="cupcake">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/onboarding" element={<OnboardingPage />} />
        <Route path="/notifications" element={<NotificationsPage />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/call" element={<CallPage />} />
      </Routes>
      <Toaster />
    </div>
  )
}

export default App