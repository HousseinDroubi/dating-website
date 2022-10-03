const login_email=document.getElementById("login_email");
const login_password=document.getElementById("login_password");
const login_error=document.getElementById("login_error");
const login_button=document.getElementById("login_button");
const url_login='http://127.0.0.1:8000/api/v0.1/login';

const checkUser = async () =>{

    api_data = {'email':login_email.value,
                'password':login_password.value,
                };
    try{
        await axios.post(
        url_login,
        api_data,
        ).then((response)=>{
             
            if(response.data.status=='done'){ 
                localStorage.setItem("token",response.data.access_token);
                window.location.href = './home.html';
           }else{
            login_error.innerText='Wrong email or password';
           }
        });
    }catch(error){
        login_error.innerText='Something went wrong';
    }
}

const validate = () => {
    if(login_email.value==''){
        login_error.innerText='Email cannot be empty!';
    }else if(login_password.value==''){
        login_error.innerText='Password cannot be empty!';
    }else{
        login_error.innerText='';
        checkUser();
    }
}


login_button.addEventListener('click',validate);