
export async function register(user_name, user_email, user_password){
    const response = await fetch("http://localhost:5000/signup",{
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
    if (!response.ok){
        console.error(`Sign up failed: ${response.statusText}`)
    }
    const data = await response.json();
    console.log("Sign up successful:", data)
    return data;


};




export async function signin(user_email, user_password){
    const response = await fetch("http://localhost:5000/login",{
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
    if (!response.ok){
        console.error(`Login failed: ${response.statusText}`)
    }
    const data = await response.json();
    console.log("Login successful:", data)
    return data;


};
