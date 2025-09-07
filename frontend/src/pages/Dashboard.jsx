// Import React and our authentication context
import React, {useState, useEffect} from 'react';
import { useAuth } from '../AuthContext';
import './Dashboard.css'; 
import {Navigate} from "react-router-dom"


const Dashboard = () => {
    // GET USER DATA AND LOGOUT FUNCTION from our authentication context
    const { logout } = useAuth();
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error_flag, setError_flag] = useState(false);

    
    useEffect(() => {
        const fetchUserData = async () => {
            const token = localStorage.getItem('jwt_token');
            if (!token || token == null){
                logout();
            }
            try {
                const response = await fetch("http://localhost:5000/api/dashboard-data", {
                headers: {
                "Authorization": `Bearer ${token}`
                    }
                });

                //check response for errors
                if (response.ok){
                    const data = await response.json();
                    setUserData(data);
                    
                    
                }else if (response.status == 404){
                    logout();
                    console.error("User not found");
                    setError_flag(true);
                }else if (response.status ==405){
                    console.error("Invalid request");
                    setError_flag(true);
                }else if (response.status == 422 || response.status == 401){
                    
                    console.error("Invalid Access Token")
                    logout(); //deletes token in local storage and resets states
                    setError_flag(true);
                }else{
                    const error = await response.json();
                    console.error("Unexpected Error:", error);
                    setError_flag(true);
                    }
            }catch (err){
                console.error("Network error:", err);
                setError_flag(true);
            }finally{
                setLoading(false);
            }
        };

        fetchUserData();

        
    }, [logout]);


    if (loading) return <div>Loading...</div>;
    if (!userData && !error_flag){
        alert("No user data available. Redirecting to Login/Signup page")
        return logout();

        
    }

    return (
        <div className="dashboard"> {/* Changed from style={styles.dashboard} to className */}
            
            {/* HEADER SECTION with welcome message and logout button */}
            <div className="dashboard-header"> {/* Changed from style={styles.header} */}
                <h1>Welcome!</h1> {/* Simple welcome message */}
                
                {/* LOGOUT BUTTON */}
                <button onClick={logout} className="logout-button"> {/* Changed from style={styles.logoutButton} */}
                    Logout
                    {/* When clicked, this calls the logout function from our context
                        which will clear the user data and redirect back to login */}
                </button>
            </div>
            
            {/* MAIN CONTENT SECTION */}
            <div className="dashboard-content"> {/* Changed from style={styles.content} */}
                {/* PERSONALIZED GREETING using user's name from context */}
                <h2>Hello, {userData.username}! </h2>
                <p>You are successfully logged in.</p>
                
                {/* USER INFORMATION DISPLAY */}
                <div className="user-info"> {/* Changed from style={styles.userInfo} */}
                    <h3>Your Information:</h3>
                    {/* Display the user data we stored during login/signup */}
                    <p><strong>Name:</strong> {userData.username}</p>
                    <p><strong>Email:</strong> {userData.email}</p>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;