// Define all variables of the login papge
const login_email=document.getElementById("login_email");
const login_password=document.getElementById("login_password");
const login_error=document.getElementById("login_error");
const login_button=document.getElementById("login_button");
const url_login='http://127.0.0.1:8000/api/v0.1/login';

// Check if the email and password are correct
const checkUser = async () =>{
    // We just need email and password here in order to get the token.
    api_data = {'email':login_email.value,
                'password':login_password.value,
                };
    try{
        await axios.post(
        url_login,
        api_data,
        ).then((response)=>{
            //  If the response is done, so, we have to save the token in the memory and redirect the user to home page.
            if(response.data.status=='done'){ 
                localStorage.setItem("token",response.data.access_token);
                window.location.href = './home.html';
           }else{
            // Here, the user might entered a wrong email or password.
            login_error.innerText='Wrong email or password';
           }
        });
    }catch(error){
        // Here, something might went wrong.
        login_error.innerText='Something went wrong';
    }
}
// Put all validations we need in order to get the expected entries.
const validate = () => {
    if(login_email.value==''){
        login_error.innerText='Email cannot be empty!';
    }else if(login_password.value==''){
        login_error.innerText='Password cannot be empty!';
    }else{
        login_error.innerText='';
        try {
            checkUser();
        } catch (error) {
            
        }
    }
}
// Putting a listener on login button.
login_button.addEventListener('click',validate);