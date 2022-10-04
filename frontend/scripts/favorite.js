const whole_users = document.getElementById("whole_users");
const url_favorites='http://127.0.0.1:8000/api/v0.1/favorites';

const getFavorites = async () =>{
    api_data = {'token':localStorage.getItem("token"),
                'favoriting':localStorage.getItem("id"),
               };
    try{
        await axios.post(
        url_favorites,
        api_data,
        ).then((response)=>{
    const number_user = response.data.data.length;
    const array_users= response.data.data;      
    for (let i=0;i<number_user;i++){
        // console.log(array_users[i][0].email);
        const user =document.createElement('div');
        user.classList.add('user');

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

        user.appendChild(user_profile_image);
        user.appendChild(user_first_child);
        user.appendChild(user_second_child);
        user.appendChild(user_third_child);
             
        const user_details = array_users[i][0];
        console.log(user_details);
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

        img.src=img_src;
        h3.innerText = username;
        h3_age.innerText = age;
        h3_gender.innerText = gender;
        h5.innerText = bio;

        heart.innerHTML =`&#10084;&#65039;`;
        button.innerText = 'Message';
        whole_users.appendChild(user);
    }

        });
    }catch(error){
        // window.location.href = './login.html';
        console.log(error)
    }
}
getFavorites();
// const url_me='http://127.0.0.1:8000/api/v0.1/favorites';

// const getProfile = async () =>{
//     api_data = {'favoriting':'1',
//                 'favorited':'2',
//                };
//     try{
//         await axios.post(
//         url_me,
//         api_data,
//         ).then((response)=>{
//             s = response.data.data[0];
//             console.log(s[0].email);
//         });
//     }catch(error){
//         // window.location.href = './login.html';
//         console.log(error);
//     }
// }
// getProfile();