// Define all variables of the register papge
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
const url_register = `http://127.0.0.1:8000/api/v0.1/register`;

// Get the gender and what does he interesting in, and the returns will be similar to the interesters table into DataBase.
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

// Add the user to Database after all validations
const registerUser = async () =>{
    // Get interested in.
    const interested=getInterested();
    // Gender will be M or F.
    let gender;
    if(register_gender_male.checked){
        gender='M';
    }else{
        gender='F';
    }
    // Below are the parameters of this axios funtion.
    api_data = {'email':register_email.value,
                'username':register_username.value,
                'password':register_passowrd.value,
                'age':register_age.value,
                'location':register_location.value,
                'gender':gender,
                'bio':register_bio.value,
                'image':'na',
                'interested':interested,
                };
    try{
        await axios.post(
        url_register,
        api_data,
        ).then((response)=>{
            // If the response was 'User successfully registered', the user will be redirected to login page.
            if(response.data.message=='User successfully registered'){  
                window.location.href = './login.html';
           }else{
            // Here, the email or password might be taken.
            register_error.innerText='Try another email and username!';
           }
        });
    }catch(error){
        // Here, something went wrong.
        register_error.innerText='Something went wrong';
    }
}

// Put all validations we need in order to get the expected entries.
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
        registerUser();
    }
}
// Listener on button register.
register_button.addEventListener('click',validate);
