import React, {useState} from 'react';
import './LoginSignUp.css'
import email_icon from '../assets/email.png' 
import password_icon from '../assets/password.png'
import user_icon from '../assets/person.png'
import { useAuth } from '../AuthContext'; 
import { register,signin } from '../services/authService.js'

const LoginSignUpPage = ()=>{
    const [action,setAction] = useState("Login");
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { isLoading } = useAuth();
    
    const handleSubmit = () => {
    if (action === "Login") {
        signin(email, password);
    } else {
        register(name, email, password);
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
    

    <form className = "container" onSubmit={(e)=>{e.preventDefault(); handleSubmit();}}>
        <div className='header'>
            <div className='text'>{action}</div>
            <div className="underline"></div>
        </div>
        <div className='inputs'>
            {action ==="Login"?<div></div>:<div className='input'>
                <img src={user_icon} alt=""/>
                <input type="text" placeholder='Name'
                    value = {name}
                    onChange={(e)=> setName(e.target.value)}
                />

                </div>}
            
            <div className='input'>
                <img src={email_icon} alt=""/>
                <input type="email" placeholder='Email Address'
                    value = {email}
                    onChange={(e)=> setEmail(e.target.value)}
                />
                
            </div>
            <div className="input">
                <img src={password_icon} alt=""/>
                <input type="password"placeholder='Password'
                    value = {password}
                    onChange={(e)=> setPassword(e.target.value)}
                    />
                
            </div>
            
        </div> 
        {action==="Sign Up"?<div></div>:<div className="forgot-password">Forgot Password? <span>Click Here!</span></div>}
        
        
        {/*empty div below is for space to display Invalid Password Message*/}
        <div className='invalid-password'>
            <br />
            <text>Invalid Password!</text>    
            <br />
        </div>


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