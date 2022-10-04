const home_logout = document.getElementById("home_logout");
const home_profile = document.getElementById("home_profile");
const home_username = document.getElementById("home_username");

const url_me='http://127.0.0.1:8000/api/v0.1/me';

const getProfile = async () =>{
    const api_data = {'token':localStorage.getItem("token"),
               };
    try{
        await axios.post(
        url_me,
        api_data,
        ).then((response)=>{
            localStorage.setItem("id",response.data.id);
            home_username.innerText=response.data.username;
            if(response.data.image!='na'){
                home_profile.src=response.data.image;
            }
            
        });
    }catch(error){
        window.location.href = './login.html';
    }
}

getProfile();
const logout = () =>{
    localStorage.clear();
    window.location.href = './login.html';
}
home_logout.addEventListener('click',logout);

const url_home='http://127.0.0.1:8000/api/v0.1/home';
const getUsers = async () =>{
    const api_data = {'token':localStorage.getItem("token"),
                     'id':localStorage.getItem("id"),
               };
    try{
        await axios.post(
            url_home,
        api_data,
        ).then((response)=>{
            console.log(response.data)
        });
    }catch(error){
        console.log(error);
        // window.location.href = './login.html';
    }
}
getUsers();