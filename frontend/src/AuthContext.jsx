// Import React tools we need
import React, { createContext, useContext, useState,useEffect} from 'react';
import {useNavigate} from "react-router-dom"
// CREATE THE CONTEXT
// Think of this as creating a "communication channel" that components can use
const AuthContext = createContext();

// MAIN COMPONENT THAT MANAGES ALL AUTHENTICATION
export const AuthProvider = ({ children }) => {
  
  
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Boolean: true if logged in, false if not
  const [isLoading, setIsLoading] = useState(false);   // Boolean: true when processing login/signup
  

  const navigate = useNavigate();
  // CHECK FOR EXISTING LOGIN WHEN APP STARTS
  // This runs once when the component first loads
  useEffect(() => {

    // Look in browser storage to see if user was previously logged in
    if (isLoggedIn) {
      setIsLoggedIn(true);              // Mark them as logged in
    }
    // If no saved user, they stay logged out (default state)
  }, []); // Empty array means this only runs once when component loads

  // LOGIN FUNCTION - Called when user wants to log in

  const login = async (email, password) => {
    setIsLoading(true); // Show that we're processing
    
    // BASIC VALIDATION
    if (!email || !password) {
      alert('Please enter email and password');
      setIsLoading(false); // Stop loading since we're not processing anymore
      return; // Exit the function early

    
    }

    
 
      
      
      try {

        const response = await fetch("http://localhost:5000/api/login",{
          method: "POST",
          body: JSON
          .stringify({
              email: email,
              password: password,
          }),
          headers:{
              "Content-type":"application/json"
          }

          });
          if (response.ok){
            const data = await response.json();
            console.log("Login response:", data)
            localStorage.setItem('jwt_token',data.access_token);
            
            setIsLoggedIn(true);  // Mark as logged in
            
            

          
          } else if (response.status == 400){
           alert('Invalid credentials');
          }else if (response.status == 405){
            console.error("Invalid request");
          }else{
            console.error("Unexpected error occured:", response.status);
          }
        
                                
      }catch (error){
          console.error('Backend Error:', error);
          
      } finally {
          setIsLoading(false);
          
      }
      
      
      
    };
  

  // SIGNUP FUNCTION - Called when user wants to create new account
  const signup = async (email, password, name) => {
    setIsLoading(true); // Show processing
    
    // VALIDATION - Make sure all fields are filled
    if (!email || !password || !name) {
      alert('Please fill in all fields');
      setIsLoading(false);
      return;
    }

  
      
      
      
      try{
          const response = await fetch("http://localhost:5000/api/signup",{
          method: "POST",
          body: JSON
          .stringify({
              username: name,
              email: email,
              password: password,
          }),
          headers:{
              "Content-type":"application/json"
          }

          })
          if (response.ok){
            const data = await response.json();
            console.log("Sign up response:", data);
          }else if (response.status == 409){
            alert('Signup failed: Email already in use');
          }else if (response.status == 405){
            console.error("Invalid request");
          }else{
            console.error("Unexpcted error occured: ", response.status);
          }
          
        }catch (error){
            console.error('Backend Error', error);
            
      
        } finally {
          setIsLoading(false);
        }
               
      };


  // LOGOUT FUNCTION - Called when user wants to log out
  const logout = () => {
    localStorage.removeItem('jwt_token'); // Remove from browser storage
    
    setIsLoggedIn(false); // Mark as not logged in
    
    navigate("/LoginSignUpPage");
  };

  // WHAT WE SHARE WITH OTHER COMPONENTS
  // This object contains everything other components might need
  const value = {
   
    isLoggedIn,    // Whether someone is logged in
    isLoading,     // Whether we're processing a login/signup
    
    login,         // Function to log in
    signup,        // Function to sign up
    logout,         // Function to log out
    
  };

  // PROVIDE THE CONTEXT
  // This makes all the authentication data available to child components
  return (
    <AuthContext.Provider value={value}>
      {children} {/* This renders whatever components are wrapped by AuthProvider */}
    </AuthContext.Provider>
  );
};


// CUSTOM HOOK - Makes it easy for components to use the context
export const useAuth = () => {
  const context = useContext(AuthContext); // Get the context value
  
  // ERROR CHECKING - Make sure component is wrapped by AuthProvider
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context; // Return all the authentication data and functions
};