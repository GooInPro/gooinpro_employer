import {useEffect, useState} from "react";
import {getChatRoomList} from "../../api/chatapi/chatAPI.js";


function ChatListComponent() {

    const email = "myj0248@naver.com";

    const [data, setData] = useState(null);

    useEffect(() => {

        getChatRoomList(email).then(res => {

            setData(res);

            console.log(res);
        })
    }, [email]);

    return (
        <div>
            ChatList Component
        </div>
    );
}

export default ChatListComponent;