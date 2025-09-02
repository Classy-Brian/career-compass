
export async function register(user_name, user_email, user_password){
    //work on encrpyting username, email, password
    const response = await fetch("http://localhost:5000/api/signup",{
    method: "POST",
    body: JSON
    .stringify({
        username: user_name,
        email: user_email,
        password: user_password,
    }),
    headers:{
        "Content-type":"application/json"
    }

    })
    
    const data = await response.json();
    
    console.log("Sign up response:", data)
    return data;


};




export async function signin(user_email, user_password){
    const response = await fetch("http://localhost:5000/api/login",{
    method: "POST",
    body: JSON
    .stringify({
        email: user_email,
        password: user_password,
    }),
    headers:{
        "Content-type":"application/json"
    }

    })
    
    const data = await response.json();
    console.log("Login response:", data)
    return data;


};
