const conversation_chat_with = document.getElementById('conversation_chat_with');
const conversation_message = document.getElementById('conversation_message');
const conversation_image = document.getElementById('conversation_image');
const whole_messages = document.getElementById('whole_messages');

conversation_chat_with.innerText = localStorage.getItem("chat_with_username");

const url_chat='http://127.0.0.1:8000/api/v0.1/chat';

const getMessages = async () =>{    
    api_data = {'token':localStorage.getItem("token"),
                'sender':localStorage.getItem("id"),
                'receiver':localStorage.getItem("chat_with_id"),
               };
    try{
        await axios.post(
        url_chat,
        api_data,
        ).then((response)=>{
            const messages_number = response.data.data.length;
            const messages = response.data.data;
            for(let i =0;i<messages_number;i++){
                const message = document.createElement('div');
                message.classList.add('message');
                

                const message_details = messages[i];
                const message_text = message_details.text;
                message.innerText = message_text;

                if(message_details.sender != localStorage.getItem('id'))
                    message.classList.add('align-self-start');
                else
                    message.classList.add('align-self-end');
                
                whole_messages.appendChild(message);
            }
        });
    }catch(error){
        console.log(error);
        // window.location.href = './login.html';
    }
}
getMessages();  
