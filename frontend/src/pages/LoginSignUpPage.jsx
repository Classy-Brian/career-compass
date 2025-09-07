import React, {useState, useEffect} from 'react';
import './LoginSignUp.css'
import email_icon from '../assets/email.png' 
import password_icon from '../assets/password.png'
import user_icon from '../assets/person.png'
import { AuthProvider, useAuth } from '../AuthContext'; 
import {useNavigate, useLocation} from "react-router-dom"

//import { register,signin } from '../services/authService.js'

const LoginSignUpPage = ()=>{
    const [action,setAction] = useState("Login");
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { isLoading} = useAuth();
    const {login,signup }= useAuth();
    const navigate = useNavigate();
    const location = useLocation();


     const from = location.state?.from?.pathname || "/dashboard";
    useEffect(() => {
        

    //check if user is already logged in, if so redirect to page they want to visit
    if (localStorage.getItem('jwt_token')) {
        navigate(from, {replace:true}); 

    }
    
  }, [from, navigate]);


   

    
    

    const handleSubmit = async () => {
    if (action === "Login") {
        await login(email,password);
        navigate(from, {replace:true});

        
        

    

    } else {
        await signup(email, password, name);
        //clear input form and state vars after user submission for signup
        document.getElementById("input-form").reset()
        setName('');
        setEmail('');
        setPassword('');

        
         
    }
};
    // FUNCTION: Switch between Login and Sign Up forms
    const handleActionChange = (newAction) => {
        setAction(newAction); // Change the display mode
        
        // CLEAR THE FORM when switching
        // This prevents confusion if user was halfway through filling one form
        setName('');
        setEmail('');
        setPassword('');
    };
    return (
    

    <form className = "container" id = "input-form" onSubmit={(e)=>{e.preventDefault(); handleSubmit();}}>
        <div className='header'>
            <div className='text'>{action}</div>
            <div className="underline"></div>
        </div>
        <div className='inputs'>
            {action ==="Login"?<div></div>:<div className='input'>
                <img src={user_icon} alt=""/>
                <input type="text" placeholder='Name' id = "username-input"
                    value = {name}
                    onChange={(e)=> setName(e.target.value)}
                />

                </div>}
            
            <div className='input'>
                <img src={email_icon} alt=""/>
                <input type="email" placeholder='Email Address' id ="email-input"
                    value = {email}
                    onChange={(e)=> setEmail(e.target.value)}
                />
                
            </div>
            <div className="input">
                <img src={password_icon} alt=""/>
                <input type="password"placeholder='Password' id = "password-input"
                    value = {password}
                    onChange={(e)=> setPassword(e.target.value)}
                    />
                
            </div>
            
        </div> 
        {action==="Sign Up"?<div></div>:<div className="forgot-password">Forgot Password? <span>Click Here!</span></div>}
        
        
        


        <div className="submit-container">
                <div className={action==="Sign Up"?"submit gray":"submit"} onClick={()=>{handleActionChange("Sign Up")}}>Sign Up</div>
                <div className={action==="Login"?"submit gray":'submit'} onClick={()=>{handleActionChange("Login")}}>Login</div>
            </div>

        
        <div className="actual-submit">
                <button 
                    type = "submit"           // Call our submit function
                    disabled={isLoading}             // Disable when processing
                    className="submit-button"
                >
                    {/* Dynamic button text based on current state */}
                    {isLoading ? 'Processing...' : `${action} Now`}
                </button>
            </div>
        </form>

  );
};

export default LoginSignUpPage;