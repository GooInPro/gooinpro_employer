import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // React Router의 useParams 훅 import
import { getMessage, sendMessage, deleteMessages } from '../../api/chatapi/chatAPI.js';
import { deletePartChat } from '../../api/chatroomapi/chatRoomAPI.js'; // deleteMessages 추가
import employerStore from '../../stores/employerStore.js'; // zustand 스토어 import
import { useNavigate } from 'react-router-dom';

const ChatComponent = () => {
    const { pemail} = useParams(); // URL params에서 pemail 값을 가져옴
    const [roomId, setRoomId] = useState('');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const eemail = employerStore((state) => state.eemail);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchMessages = async () => {
            if (roomId) {
                try {
                    const data = await getMessage(roomId);
                    setMessages(data);
                } catch (error) {
                    console.error('메시지 로드 중 오류:', error);
                }
            }
        };
        fetchMessages();
    }, [roomId]);

    const handleSendMessage = async () => {
        if (message && roomId) {
            const chatMessageDTO = {
                sender: eemail || 'Anonymous',
                receiver: pemail || 'admin',
                message,
                roomId,
                timestamp: new Date().toISOString(),
            };

            try {
                const savedMessage = await sendMessage(chatMessageDTO);
                setMessages((prevMessages) => [...prevMessages, savedMessage]);
                setMessage(''); // 입력 필드 초기화
            } catch (error) {
                console.error('메시지 전송 중 오류:', error);
            }
        }
    };

    const handleExitRoom = async () => {
        if (roomId) {
            try {
                const response = await deletePartChat(roomId); // roomId를 erno로 사용하여 나가기
                console.log('채팅방 삭제 성공:', response);

                // 서버에서 채팅방과 메시지 삭제
                await deleteMessages(roomId);

                setMessages([]); // 채팅방을 나간 후 메시지 목록 초기화
                setRoomId(''); // 방을 나가면 roomId 초기화
            } catch (error) {
                console.error('채팅방 나가기 중 오류:', error);
            }
        }
    };

    const handleExit = () => {
        navigate(`/main/list`);
    };

    const formatTimestamp = (timestamp) => {
        const date = new Date(timestamp);
        return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
    };

    return (
        <div className="p-6 max-w-lg mx-auto bg-white shadow-md rounded-lg">
            <h1 className="text-2xl font-bold mb-4 text-center">Chat Room</h1>

            <div className="flex mb-4">
                <input
                    type="text"
                    placeholder="Enter Room ID"
                    value={roomId}
                    onChange={(e) => setRoomId(e.target.value)}
                    className="flex-grow border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                    onClick={() => {
                        if (roomId) setMessages([]);
                    }}
                    className="ml-2 px-4 py-2 bg-blue-500 text-white text-sm font-medium rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    Join
                </button>
            </div>

            <div className="border border-gray-300 rounded-md p-4 h-64 overflow-y-scroll">
                {messages.map((msg, index) => (
                    <div key={index} className="mb-2">
                        <div>
                            <span className="font-semibold">{msg.sender}:</span>
                            <span className="ml-2">{msg.message}</span>
                        </div>
                        <div className="text-xs text-gray-500">
                            {formatTimestamp(msg.timestamp)}
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-4 flex">
                <input
                    type="text"
                    placeholder="Type your message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="flex-grow border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                    onClick={handleSendMessage}
                    className="ml-2 px-4 py-2 bg-green-500 text-white text-sm font-medium rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                    Send
                </button>
            </div>

            <div className="mt-4 flex justify-between">
                <button
                    onClick={handleExitRoom}
                    className="px-4 py-2 bg-red-500 text-white text-sm font-medium rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                    채팅방 삭제
                </button>
                <button
                    onClick={handleExit}
                    className="px-4 py-2 bg-orange-400 text-white text-sm font-medium rounded-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                    나가기
                </button>
            </div>

        </div>
    );
};

export default ChatComponent;
