import { useEffect, useState } from "react";
import { getChatRoomList } from "../../api/chatapi/chatAPI.js";
import {useNavigate} from "react-router-dom";

function ChatListComponent() {

    const email = "myj0248@naver.com";
    const [data, setData] = useState([]);

    const navigate = useNavigate();

    const roomClick = (id, roomName) => {

        navigate(`/chat/chatting/${id}?roomName=${roomName}`);
    }

    useEffect(() => {
        getChatRoomList(email).then(res => {

                setData(res);
                console.log(res);
            })
            .catch(err => console.error("채팅방 목록 불러오기 실패:", err));
    }, [email]);

    return (
        <div className="p-4 bg-white rounded-lg shadow-md w-full mx-auto overflow-hidden mb-12">
            <h2 className="text-xl font-bold text-blue-500 text-center mb-4">채팅방 목록</h2>

            {/* 채팅방 목록 */}
            <div className="space-y-4">
                {data.length === 0 ? (
                    <div className="text-center text-gray-500">❌ 채팅방이 없습니다.</div>
                ) : (
                    data.map((room) => (
                        <div
                            key={room.id}
                            className="p-4 bg-white shadow-md rounded-lg border border-gray-200 hover:shadow-lg transition cursor-pointer"
                            onClick={() => roomClick(room.id, room.roomName)}
                        >
                            <div className="flex flex-col space-y-2">
                                <span className="text-lg font-semibold text-blue-500">
                                    {room.roomName || ''}
                                </span>
                                <span className="text-gray-600">{room.message || ''}</span>
                                <span className="text-sm text-gray-400">{room.sentAt || ''}</span>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default ChatListComponent;
