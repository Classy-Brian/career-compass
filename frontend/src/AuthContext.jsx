// Import React tools we need
import React, { createContext, useContext, useState, useEffect } from 'react';

// CREATE THE CONTEXT
// Think of this as creating a "communication channel" that components can use
const AuthContext = createContext();

// MAIN COMPONENT THAT MANAGES ALL AUTHENTICATION
export const AuthProvider = ({ children }) => {
  
  // STATE VARIABLES - These store our authentication information
  const [user, setUser] = useState(null);           // Stores user info (name, email) or null if not logged in
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Boolean: true if logged in, false if not
  const [isLoading, setIsLoading] = useState(false);   // Boolean: true when processing login/signup

  // CHECK FOR EXISTING LOGIN WHEN APP STARTS
  // This runs once when the component first loads
  useEffect(() => {
    // Look in browser storage to see if user was previously logged in
    const savedUser = localStorage.getItem('user');
    
    if (savedUser) {
      // If we found saved user data, log them back in
      setUser(JSON.parse(savedUser));  // Convert saved text back to object
      setIsLoggedIn(true);              // Mark them as logged in
    }
    // If no saved user, they stay logged out (default state)
  }, []); // Empty array means this only runs once when component loads

  // LOGIN FUNCTION - Called when user wants to log in
  const login = (email, password, name = '') => {
    setIsLoading(true); // Show that we're processing
    
    // BASIC VALIDATION
    if (!email || !password) {
      alert('Please enter email and password');
      setIsLoading(false); // Stop loading since we're not processing anymore
      return; // Exit the function early
    }

    // SIMULATE NETWORK DELAY (like calling a server)
    setTimeout(() => {
      // CREATE USER OBJECT
      const userData = {
        email: email,
        name: name || email.split('@')[0] // Use provided name, or create one from email
      };
      
      // UPDATE STATE - This triggers re-render of all components using this context
      setUser(userData);    // Save user information
      setIsLoggedIn(true);  // Mark as logged in
      
      // SAVE TO BROWSER STORAGE so user stays logged in if they refresh page
      localStorage.setItem('user', JSON.stringify(userData));
      
      setIsLoading(false); // Stop loading
    }, 1000); // Wait 1 second to simulate server response time
  };

  // SIGNUP FUNCTION - Called when user wants to create new account
  const signup = (email, password, name) => {
    setIsLoading(true); // Show processing
    
    // VALIDATION - Make sure all fields are filled
    if (!email || !password || !name) {
      alert('Please fill in all fields');
      setIsLoading(false);
      return;
    }

    // SIMULATE NETWORK DELAY
    setTimeout(() => {
      // CREATE USER OBJECT
      /*const userData = {
        email: email,
        name: name
      };*/

      /*const response = fetch("https://localhost:5000/signup",{
        method: "POST",
        body: JSON
        .stringify({
            username: name,
            email: email,
            password:password
        }),
        headers:{
            "Content-type":"application/json"
        }

        })
        if (!response.ok){
            console.error(`Login failed: ${response.statusText}`)
        }
        const data = response.json();
        console.log("Signup successful:", data)
      
      */
      // UPDATE STATE (same as login)
      //setUser(userData);


      setIsLoggedIn(true);
      //localStorage.setItem('user', JSON.stringify(userData));

      setIsLoading(false);
    }, 1000);
  };

  // LOGOUT FUNCTION - Called when user wants to log out
  const logout = () => {
    setUser(null);        // Clear user information
    setIsLoggedIn(false); // Mark as not logged in
    localStorage.removeItem('user'); // Remove from browser storage
  };

  // WHAT WE SHARE WITH OTHER COMPONENTS
  // This object contains everything other components might need
  const value = {
    user,          // Current user information
    isLoggedIn,    // Whether someone is logged in
    isLoading,     // Whether we're processing a login/signup
    login,         // Function to log in
    signup,        // Function to sign up
    logout         // Function to log out
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

export default AuthContext;