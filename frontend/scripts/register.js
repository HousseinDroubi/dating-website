const register_email = document.getElementById("register_email");
const register_username = document.getElementById("register_username");
const register_passowrd = document.getElementById("register_passowrd");
const register_age = document.getElementById("register_age");
const register_location = document.getElementById("register_location");
const register_gender_male = document.getElementById("register_gender_male");
const register_gender_female = document.getElementById("register_gender_female");
const register_interested_male = document.getElementById("register_interested_male");
const register_interested_female = document.getElementById("register_interested_female");
const register_bio = document.getElementById("register_bio");
const register_error= document.getElementById("register_error");
const register_button = document.getElementById("register_button");
const url_login = `http://127.0.0.1:8000/api/v0.1/register`;


const getInterested = () =>{
    if(register_gender_male.checked){
        if(register_interested_male.checked && register_interested_female.checked){
            return '3';
        }else if(register_interested_male.checked){
            return '2';
        }else{
            return '1';
        }
    }else{
        if(register_interested_male.checked && register_interested_female.checked){
            return '6';
        }else if(register_interested_female.checked){
            return '5';
        }else{
            return '4';
        }
    }
}


const registerUser = async (url_login) =>{

    const interested=getInterested();
    let gender;
    if(register_gender_male.checked){
        gender='M';
    }else{
        gender='F';
    }
    api_data = {'email':register_email.value,
                'username':register_username.value,
                'password':register_passowrd.value,
                'age':register_age.value,
                'location':register_location.value,
                'gender':gender,
                'bio':register_bio.value,
                'image':'NA',
                'interested':interested,
                };
    try{
        return await axios.post(
            url_login,
            api_data,
        ).then((response)=>{
            if(response.data.message=='User successfully registered'){  
                window.location.href = './login.html';
           }else{
            register_error.innerText='Try another email and username!';
           }
        });
    }catch(error){
        register_error.innerText='Something went wrong';
    }
}


const validate = () =>{
    if(register_email.value=='' || register_email.value.length<5 ||  register_email.value.length>30){
        register_error.innerText='Email required and length must be between 5 and 30';
    }else if(register_username.value=='' || register_username.value.length<3 ||  register_username.value.length>20){
        register_error.innerText='Username required and length must be between 3 and 20';
    }else if(register_passowrd.value=='' || register_passowrd.value.length<5 ||  register_passowrd.value.length>30){
        register_error.innerText='Password required and length must be between 5 and 30';
    }else if(register_age.value=='' || register_age.value.length<2 ||  register_age.value.length>=3){
        register_error.innerText='Age required and length must be between 10 and 99';
    }else if(register_location.value=='' || register_location.value.length<5 ||  register_location.value.length>20){
        register_error.innerText='Location required and length must be between 5 and 20';
    }else if(!register_interested_male.checked && !register_interested_female.checked){
        register_error.innerText='Please check what are you interested in';
    }else if(register_bio.value=='' || register_bio.value.length<=3 ||  register_bio.value.length>50){
        register_error.innerText='Bio required and length must be between 4 and 50';
    }else{
        register_error.innerText='';
       const response_register= registerUser(url_login);
    }
}


register_button.addEventListener('click',validate);
