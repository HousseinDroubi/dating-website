// Define all variables of the profile papge
const edit_profile_image = document.getElementById("edit_profile_image");
const edit_profile_username = document.getElementById("edit_profile_username");
const edit_profile_age = document.getElementById("edit_profile_age");
const edit_profile_location = document.getElementById("edit_profile_location");
const edit_profile_gender_male = document.getElementById("edit_profile_gender_male");
const edit_profile_gender_female = document.getElementById("edit_profile_gender_female");
const edit_profile_interested_male = document.getElementById("edit_profile_interested_male");
const edit_profile_interested_female = document.getElementById("edit_profile_interested_female");
const edit_profile_incognito_on = document.getElementById("edit_profile_incognito_on");
const edit_profile_incognito_off= document.getElementById("edit_profile_incognito_off");
const edit_profile_bio = document.getElementById("edit_profile_bio");
const edit_profile_button = document.getElementById("edit_profile_button");
const edit_profile_error = document.getElementById("edit_profile_error");
const edit_profile_pick_up = document.getElementById("edit_profile_pick_up");
// url profile is to get the initial data of this user
const url_profile = `http://127.0.0.1:8000/api/v0.1/me`;
// url update is to update the data of this user
const url_update = `http://127.0.0.1:8000/api/v0.1/update`;
let base64_encode='';
// Get the initial data of this user and start put them into the contents
const getProfile = async () =>{
    const api_data = {'token':localStorage.getItem("token"),
               };
    try{
        await axios.post(
        url_profile,
        api_data,
        ).then((response)=>{
            if(response.data.image!='na'){
                edit_profile_image.src=response.data.image;
                edit_profile_username.value=response.data.username;
                edit_profile_age.value=response.data.age;
                edit_profile_location.value=response.data.location;
            
                let interest = response.data.interested;
                if(interest==1){
                    edit_profile_gender_male.setAttribute("checked", "true");
                    edit_profile_interested_female.setAttribute("checked",true);
                }else if(interest==2){
                    edit_profile_gender_male.setAttribute("checked", "true");
                    edit_profile_interested_male.setAttribute("checked",true);
                }else if(interest == 3){
                    edit_profile_gender_male.setAttribute("checked", "true");
                    edit_profile_interested_female.setAttribute("checked",true);
                    edit_profile_interested_male.setAttribute("checked",true);
                }else if(interest == 4){
                    edit_profile_gender_female.setAttribute("checked",true);
                    edit_profile_interested_male.setAttribute("checked",true);
                }else if(interest == 5){
                    edit_profile_gender_female.setAttribute("checked",true);
                    edit_profile_interested_female.setAttribute("checked",true);
                }else {
                    edit_profile_gender_female.setAttribute("checked",true);
                    edit_profile_interested_male.setAttribute("checked",true);
                    edit_profile_interested_female.setAttribute("checked",true);
                }

                const incognito= response.data.incognito;
                if(incognito==0){
                    edit_profile_incognito_off.setAttribute("checked",true);
                }else{
                    edit_profile_incognito_on.setAttribute("checked",true);
                }

                edit_profile_bio.value = response.data.bio;
            }
        });
    }catch(error){
        // In case the token time has been expired.
        window.location.href = './login.html';
    }
}
getProfile();

// Get the gender and what does he interesting in, and the returns will be similar to the interesters table into DataBase.
const getInterested = () =>{
    if(edit_profile_gender_male.checked){
        if(edit_profile_interested_male.checked && edit_profile_interested_female.checked){
            return '3';
        }else if(edit_profile_gender_male.checked){
            return '2';
        }else{
            return '1';
        }
    }else{
        if(edit_profile_interested_male.checked && edit_profile_interested_female.checked){
            return '6';
        }else if(edit_profile_interested_female.checked){
            return '5';
        }else{
            return '4';
        }
    }
}
// Update the data of the user
const updateUser = async () =>{
    const interested=getInterested();
    let gender;
    if(edit_profile_gender_male.checked){
        gender='M';
    }else{
        gender='F';
    }
    if (base64_encode==''){
        base64_encode='na';
    }
    let incognito;
    if(edit_profile_incognito_on.checked){
        incognito="1";
    }else{
        incognito="0";
    }
    // Parameters that must be sent in order to change the user data.
    const api_data = {'id':localStorage.getItem("id"),
                'username':edit_profile_username.value,
                'bio':edit_profile_bio.value,
                'age':edit_profile_age.value,
                'location':edit_profile_location.value,
                'gender':gender,
                'incognito':incognito,
                'image':base64_encode,
                'interested':interested,
                'token':localStorage.getItem("token"),
                };

    try{
        await axios.post(
        url_update,
        api_data,
        ).then((response)=>{
            // If the response was 'Success', the user will be redirected to home page.
            if(response.data.status=='Success'){  
                window.location.href = './home.html';
            }else{
            // Here, the username might be taken.
            edit_profile_error.innerText='Try another username!';
            }
        });
    }catch(error){
        // Here, something went wrong.
        edit_profile_error.innerText='Something went wrong';
    }

}

//Put all validations in order to create our own exceptions
const validate = () =>{
    if(edit_profile_username.value=='' || edit_profile_username.value.length<3 ||  edit_profile_username.value.length>20){
        edit_profile_error.innerText='Username required and length must be between 3 and 20';
    }else if(edit_profile_age.value=='' || edit_profile_age.value.length<2 ||  edit_profile_age.value.length>=3){
        edit_profile_error.innerText='Age required and length must be between 10 and 99';
    }else if(edit_profile_location.value=='' || edit_profile_location.value.length<5 ||  edit_profile_location.value.length>20){
        edit_profile_error.innerText='Location required and length must be between 5 and 20';
    }else if(!edit_profile_interested_male.checked && !edit_profile_interested_female.checked){
        edit_profile_error.innerText='Please check what are you interested in';
    }else if(edit_profile_bio.value=='' || edit_profile_bio.value.length<=3 ||  edit_profile_bio.value.length>50){
        edit_profile_error.innerText='Bio required and length must be between 4 and 50';
    }else{
        edit_profile_error.innerText='';
        updateUser();
    }
}
// Pick the profile and convert it into encode base64.
let pickUpProfile =()=>{
    let file = edit_profile_pick_up['files'][0];
    let reader = new FileReader();
    reader.onload = function () {
        base64_encode = reader.result.replace("data:", "")
            .replace(/^.+,/, "");
        
    }
    reader.readAsDataURL(file);
    return base64_encode;
}
// Change the data when the user click on 'Edit'.
edit_profile_button.addEventListener('click',validate);
// The below is to get the encode base64 of choosen image.
edit_profile_pick_up.addEventListener('change',pickUpProfile);