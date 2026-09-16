const username = document.getElementById("username");
const password = document.getElementById("password");
const email = document.getElementById("email");
const fullname = document.getElementById("fullname");
const registerform = document.getElementById("registerform");
const registerbtn = document.getElementById("btn");
const loginform = document.getElementById("loginForm");

const Api = "http://localhost:5000/api/v1";

if(registerform){
    registerform.addEventListener("submit", async (e) => {
        e.preventDefault();
        await signup();
        registerform.reset();
    })
}

async function signup() {
    const user = {
        username: username.value,
        password: password.value,
        email: email.value,
        fullname: fullname.value,
    }
    try {
        const response = await axios.post(`${Api}/register`, user,{
            headers: {
                "Content-Type": "application/json"
            },
            withCredentials: true,
        }).then(()=>{
            alert("user created successfully");
            window.location.href = "login.html";
        })
        .catch((err)=>console.log(err.message));
    }catch (error) {
        console.log(error);
    }        
}

// function setToken(token) {
    
// }
// function getToken() {
//     console.log(localStorage.getItem("token"));
//     return localStorage.getItem("token");
// }

if(loginform){
    loginform.addEventListener("submit", async (e) => {
        e.preventDefault();
        await login();
        loginform.reset();
    })
}   

async function login() {
    const user = {
        username: username.value,
        password: password.value,
    }
    try {
        const response = await axios.post(`${Api}/login`, user,{
            headers: {
                "Content-Type": "application/json"
            },  
            withCredentials: true,
        }).then((res)=>{
            alert("Login successful");
            window.location.href = "profile.html";
        })
        .catch((err)=>console.log(err.message));
    }catch (error) {
        console.log(error);
    }   
}
