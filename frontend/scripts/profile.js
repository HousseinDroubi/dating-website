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
const url_profile = `http://127.0.0.1:8000/api/v0.1/me`;


const getProfile = async () =>{
    api_data = {'token':localStorage.getItem("token"),
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
        window.location.href = './login.html';
    }
}
getProfile();