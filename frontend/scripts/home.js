// Define all attributes
const home_logout = document.getElementById("home_logout");
const home_profile = document.getElementById("home_profile");
const home_username = document.getElementById("home_username");
const whole_data_parent = document.getElementById('whole_data_parent');

const url_me='http://127.0.0.1:8000/api/v0.1/me';

// Get profile to show profile and name and save id
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

// Clear local storage when logout
const logout = () =>{
    localStorage.clear();
    window.location.href = './login.html';
}
home_logout.addEventListener('click',logout);

const url_home='http://127.0.0.1:8000/api/v0.1/home';
// Get all user that are filtered in server side
const getUsers = async () =>{
    const api_data = {'token':localStorage.getItem("token"),
                     'id':localStorage.getItem("id"),
                    };
    try{
        await axios.post(
            url_home,
            api_data,
        ).then((response)=>{
            let whole_data =response.data.data;
            // Number of countries
            const countries_number = Object.keys(whole_data).length;
            for(let i=0;i<countries_number;i++){
                // Get country name from object keys
                const country_name = Object.keys(whole_data)[i];

                const home_users_from = document.createElement('div');
                home_users_from.classList.add('home-users-from');
                const p =document.createElement('p');
                // Add the text to it.
                p.innerText=country_name;
                home_users_from.appendChild(p);
                // Appenc it to the parent
                whole_data_parent.appendChild(home_users_from);
                // users_into_countries_number is the number of users per country
                const users_into_countries_number = Object.values(whole_data)[i].length;

                // The parent of every user of each country.
                const users = document.createElement('div');
                users.classList.add('users');
                for(let j=0;j<users_into_countries_number;j++){
                    const user_details = Object.values(whole_data)[i][j];
                    // The whole user contents here
                    const user = document.createElement('div');
                    user.classList.add('user');

                    // Start entire elements and append them
                    const user_profile_image = document.createElement('div');
                    user_profile_image.classList.add('user-profile-image');
                    const img = document.createElement('img');
                    user_profile_image.appendChild(img);

                    const user_first_child = document.createElement('div');
                    user_first_child.classList.add('user-first-child');
                    const h3 = document.createElement('h3');
                    const heart = document.createElement('span');
                    heart.classList.add('cursor-pointer');
                    user_first_child.appendChild(h3);
                    user_first_child.appendChild(heart);

                    const user_second_child = document.createElement('div');
                    user_second_child.classList.add('user-second-child');
                    const h3_age = document.createElement('h3');
                    const h3_gender = document.createElement('h3');
                    const button = document.createElement('button');
                    button.classList.add('btn');
                    button.classList.add('cursor-pointer');
                    user_second_child.appendChild(h3_age);
                    user_second_child.appendChild(h3_gender);
                    user_second_child.appendChild(button);

                    const user_third_child = document.createElement('div');
                    user_third_child.classList.add('user-third-child');
                    const h5 = document.createElement('h5');
                    const button_block = document.createElement('button');
                    button_block.classList.add('btn');
                    user_third_child.appendChild(h5);
                    user_third_child.appendChild(button_block);

                    // Start appending
                    user.appendChild(user_profile_image);
                    user.appendChild(user_first_child);
                    user.appendChild(user_second_child);
                    user.appendChild(user_third_child);

                    
                    heart.innerHTML =`&#128420;`;
                    button.innerText = 'Message';
                    button_block.innerText = 'Block';

                    // start filling data
                    h3.innerText = user_details.username;
                    h3_age.innerText = user_details.age;
                    if(user_details.gender=='M'){
                        h3_gender.innerText='Male';
                    }
                    else{
                        h3_gender.innerText='Female';}
                    h5.innerText = user_details.bio; 
                    img.src = user_details.image;

                // Chat with users
                const goChat = () =>{
                    localStorage.setItem('chat_with_id',user_details.id);
                    localStorage.setItem('chat_with_username',user_details.username);
                    window.location.href = './conversation.html';
                }
                button.addEventListener('click',goChat);

                // Add a user to favorite 
                const addFavorite = async() =>{
                    const url_remove_favorite='http://127.0.0.1:8000/api/v0.1/favorite/add';
                    const api_data_remove_favorite = {'token':localStorage.getItem("token"),
                                'favoriting':localStorage.getItem("id"),
                                'favorited':user_details.id,
                                };
                        try{
                            await axios.post(
                                url_remove_favorite,
                                api_data_remove_favorite,
                            ).then((response)=>{
                                if(response.data.status=='Success'){
                                    // If the status was 'Success', it will be redirected to favorite page.
                                    window.location.href = './favorite.html';
                                }
                            });
                        }catch(error){
                            window.location.href = './login.html';
                        }
                }
                heart.addEventListener('click',addFavorite);

                // Block a user and refresh the page
                const blockUser = async() =>{
                    const url_remove_favorite='http://127.0.0.1:8000/api/v0.1/block';
                    const api_data_remove_favorite = {'token':localStorage.getItem("token"),
                                'blocking':localStorage.getItem("id"),
                                'blocked':user_details.id,
                                };
                        try{
                            await axios.post(
                                url_remove_favorite,
                                api_data_remove_favorite,
                            ).then((response)=>{
                                if(response.data.status=='blocked'){
                                    // If the status was 'blocked', the page will be refreshed.
                                    location.reload();
                                }
                            });
                        }catch(error){
                            window.location.href = './login.html';
                        }
                }
                button_block.addEventListener('click',blockUser);
                    users.appendChild(user);        
                }
                // Append users to whole_data_parent
                whole_data_parent.appendChild(users);
            }


            1
        });
    }catch(error){
        window.location.href = './login.html';
    }
}
// Get all users by default
getUsers();