import {Navigate, Outlet} from "react-router-dom"
import {useAuth} from "./AuthContext";


export default function ProtectedRoute(){
    const {isLoggedIn, isLoading} = useAuth();
    //console.log("current_jwt",localStorage);
    console.log("isloggedin",isLoggedIn);
    


    if (isLoading){
        return <div>Checking session...</div>;
    }
    //if user is not currently logged or does not have a jwt_token then redirect them to login page
    if (!localStorage.getItem('jwt_token')||localStorage.getItem('jwt_token') == null){
        return <Navigate to="/login-signup" />;
    }
    return <Outlet/>;

}
