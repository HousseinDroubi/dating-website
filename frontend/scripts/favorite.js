// The whole_users is the parent container that we will append child every iteration on it
const whole_users = document.getElementById("whole_users");
const url_favorites='http://127.0.0.1:8000/api/v0.1/favorites';

// Get all favorites users to this user
const getFavorites = async () =>{
    const api_data = {'token':localStorage.getItem("token"),
                      'favoriting':localStorage.getItem("id"),
                     };
    try{
        await axios.post(
        url_favorites,
        api_data,
        ).then((response)=>{
    // number_user is the length of the array that contains favorite list.         
    const number_user = response.data.data.length;
    // array_users is the array that will contain all data about users in favorite list.  
    const array_users= response.data.data;      
    for (let i=0;i<number_user;i++){
        // user is the container that will we use to appench small contents to it
        const user =document.createElement('div');
        user.classList.add('user');

        // Now, we are adding all the containers of 'user' and their classes
        const user_profile_image = document.createElement('div');
        user_profile_image.classList.add('user-profile-image');
        const img = document.createElement('img');
        user_profile_image.appendChild(img);

        const user_first_child=document.createElement('div');
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
        user_third_child.appendChild(h5);

        // Now, we are adding these small container to 'user'
        user.appendChild(user_profile_image);
        user.appendChild(user_first_child);
        user.appendChild(user_second_child);
        user.appendChild(user_third_child);
        
        // user_details is the user detail of each.
        const user_details = array_users[i][0];
        
        // Here, we are getting each single data we might use in order to adapt it on a content.
        const id = user_details.id;
        const username = user_details.username;
        const img_src = user_details.image;
        let gender = user_details.gender;
        if(gender=='M'){
            gender = 'Male';
        }else{
            gender='Female';
        }
        const age = user_details.age;
        const bio = user_details.bio;

        // Here, we are adapting the above data on the below contents.
        img.src=img_src;
        h3.innerText = username;
        h3_age.innerText = age;
        h3_gender.innerText = gender;
        h5.innerText = bio;

        // Put a text and background for heart and button.
        heart.innerHTML =`&#10084;&#65039;`;
        button.innerText = 'Message';

        // The below funtion will get the id and username of a specific user and redirect him to conversation
        // page. 
        const goChat = () =>{
            localStorage.setItem('chat_with_id',id);
            localStorage.setItem('chat_with_username',username);
            window.location.href = './conversation.html';
        }

        // The below funtion will remove a specific user from the favorite list of the registered list.
        const removeFromFavorite = async() =>{
            
            const url_remove_favorite='http://127.0.0.1:8000/api/v0.1/favorite/remove';

            const api_data_remove_favorite = {'token':localStorage.getItem("token"),
                        'favoriting':localStorage.getItem("id"),
                        'favorited':id,
                        };
                try{
                    await axios.post(
                        url_remove_favorite,
                        api_data_remove_favorite,
                    ).then((response)=>{
                        if(response.data.status=='deleted'){
                            // If the status was 'deleted', the page will be refreshed.
                            location.reload();
                        }
                    });
                }catch(error){
                    window.location.href = './login.html';
                }

        }
        heart.addEventListener('click',removeFromFavorite);
        button.addEventListener('click',goChat);
        
        whole_users.appendChild(user);
    }

        });
    }catch(error){
        window.location.href = './login.html';
    }
}
getFavorites();