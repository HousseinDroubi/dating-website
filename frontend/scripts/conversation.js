// Define all variables of the conversation papge
const conversation_chat_with = document.getElementById('conversation_chat_with');
const conversation_message = document.getElementById('conversation_message');
const conversation_image = document.getElementById('conversation_image');
const whole_messages = document.getElementById('whole_messages');

// Put the username of other user.
conversation_chat_with.innerText = `Chatting with ${localStorage.getItem("chat_with_username")}`;

const url_chat='http://127.0.0.1:8000/api/v0.1/chat';

// The below function will get all the messages between this user and the other one.
const getMessages = async () =>{    
    const api_data = {'token':localStorage.getItem("token"),
                'sender':localStorage.getItem("id"),
                'receiver':localStorage.getItem("chat_with_id"),
               };
    try{
        await axios.post(
        url_chat,
        api_data,
        ).then((response)=>{
            // messages_number is the number of messages between these two users.
            const messages_number = response.data.data.length;
            // messages is the array of all the messages details between these two users.
            const messages = response.data.data;
            for(let i =0;i<messages_number;i++){
                // message is the card that will filled by the text
                const message = document.createElement('div');
                message.classList.add('message');

                // message_details is the details of each message
                const message_details = messages[i];
                const message_text = message_details.text;
                message.innerText = message_text;

                // In order to differe between messages, so, we have to add a class for each message 
                // of these users.
                if(message_details.sender != localStorage.getItem('id'))
                    message.classList.add('align-self-start');
                else
                    message.classList.add('align-self-end');
                
                whole_messages.appendChild(message);
            }
        });
    }catch(error){
        window.location.href = './login.html';
    }
}
getMessages();  

// The below function will send a message from the registered user to the other one.
const sendMessage = async() =>{
    if(conversation_message.value!=''){
        const url_send_message='http://127.0.0.1:8000/api/v0.1/chat/send';

        const api_data = {'sender':localStorage.getItem("id"),
                      'receiver':localStorage.getItem("chat_with_id"),
                      'text':conversation_message.value,
                      'token':localStorage.getItem("token"),
                    };
                    
        try{
            await axios.post(
            url_send_message,
            api_data,
            ).then((response)=>{
                if(response.data.status=='done'){
                    location.reload();
                }
                
            });
        }catch(error){
            window.location.href = './login.html';
        }

    }
}
// Set click listener for the image in order to send the message.
conversation_image.addEventListener('click',sendMessage);