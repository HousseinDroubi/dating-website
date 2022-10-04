const home_logout = document.getElementById("home_logout");
const home_profile = document.getElementById("home_profile");
const home_username = document.getElementById("home_username");

const url_me='http://127.0.0.1:8000/api/v0.1/me';

const getMe = async () =>{
    api_data = {'token':localStorage.getItem("token"),
               };
    try{
        await axios.post(
        url_me,
        api_data,
        ).then((response)=>{
            home_username.innerText=response.data.username;
            if(response.data.image!='na'){
                home_profile.src=response.data.image;
            }
            
        });
    }catch(error){
        login_error.innerText='Something went wrong';
    }
}

getMe();
const logoutFromWebiste = () =>{
    localStorage.clear();
    window.location.href = './login.html';
}
home_logout.addEventListener('click',logoutFromWebiste);