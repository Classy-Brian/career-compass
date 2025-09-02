import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './layout/MainLayout';
import HomePage from './pages/HomePage';
import ResumeCheckerPage from './pages/ResumeCheckerPage';
import ChatbotPage from './pages/ChatBotPage';
import CareerPathPage from './pages/CareerPathPage';
import { AuthProvider} from './AuthContext'; // Authentication system
import LoginSignUpPage from './pages/LoginSignUpPage';       // Login/Signup form
import Dashboard from './pages/Dashboard';             // Dashboard for logged-in users
import ProtectedRoute  from './ProtectedRoute';



export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
    
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} /> 
          <Route path="resume-checker" element={<ResumeCheckerPage />} />
          <Route path="login-signup" element={<LoginSignUpPage />} />
          <Route path="chatbot" element={<ChatbotPage />} /> 
          <Route path="careerpath" element={<CareerPathPage />} /> 
          <Route element = {<ProtectedRoute/>}> 
            <Route path="dashboard" element={<Dashboard />} />
          </Route>
        </Route>
        
      </Routes>
    
      </AuthProvider>
    </BrowserRouter>
  );
}
// Import React and all our components


/*
HOW THE FLOW WORKS:

1. App starts → AuthProvider loads and checks if user was previously logged in
2. AppContent checks isLoggedIn status
3. If false → Shows LoginSignUpPage 
4. User fills form and clicks submit → AuthContext updates isLoggedIn to true
5. AppContent re-renders and now shows SimpleDashboard
6. User clicks logout → AuthContext updates isLoggedIn to false
7. AppContent re-renders and shows LoginSignUpPage again

This creates an automatic flow where the app responds to authentication changes!
*/
