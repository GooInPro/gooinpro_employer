import { useRef, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getMessage, deleteMessages, sendMessage as sendMessageAPI } from '../../api/chatapi/chatAPI.js';
import { deletePartChat } from '../../api/chatroomapi/chatRoomAPI.js';
import employerStore from '../../stores/employerStore.js';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

const ChatComponent = () => {
    const { pemail } = useParams();
    const [roomId, setRoomId] = useState('');
    const [selectedRoom, setSelectedRoom] = useState(null);
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const eemail = employerStore((state) => state.eemail);
    const navigate = useNavigate();
    const stompClientRef = useRef(null);  // WebSocket 클라이언트 관리

    useEffect(() => {
        if (selectedRoom) {
            connectWebSocket(selectedRoom);
            getMessage(selectedRoom)
                .then((data) => setMessages(data))
                .catch(console.error);
        }
        return () => {
            disconnectWebSocket();
        };
    }, [selectedRoom]);

    const connectWebSocket = (roomId) => {
        if (stompClientRef.current && stompClientRef.current.connected) {
            console.log('WebSocket already connected.');
            return;
        }

        const socket = new SockJS('http://localhost:8080/ws');
        const client = new Client({
            webSocketFactory: () => socket,
            reconnectDelay: 5000,
            onConnect: () => {
                console.log('Connected to STOMP');
                client.subscribe(`/sub/chatroom/${roomId}`, (messageOutput) => {
                    const message = JSON.parse(messageOutput.body);
                    console.log("Received message:", message);
                    setMessages((prevMessages) => [...prevMessages, message]);
                });
                console.log(`Connected to STOMP with roomId: ${roomId}`);
            },
            onDisconnect: () => {
                console.log('Disconnected from STOMP');
            },
            onStompError: (error) => {
                console.error('STOMP error:', error);
            }
        });

        stompClientRef.current = client;  // useRef로 STOMP 인스턴스 저장
        client.activate();
    };

    const disconnectWebSocket = () => {
        if (stompClientRef.current) {
            stompClientRef.current.deactivate();
            stompClientRef.current = null;
            console.log('WebSocket disconnected.');
        }
    };

    const handleSelectRoom = () => {
        setSelectedRoom(roomId);
    };

    const handleSendMessage = async () => {
        if (message && roomId) {
            try {
                const chatMessageDTO = {
                    sender: eemail || 'Anonymous',
                    receiver: pemail || 'admin',
                    message,
                    roomId,
                    timestamp: new Date().toISOString(),
                };

                // 보낸 메시지를 바로 화면에 추가
                setMessages((prevMessages) => [...prevMessages, chatMessageDTO]);

                // API 호출하여 메시지 전송
                await sendMessageAPI(chatMessageDTO);

                // 입력 필드 초기화
                setMessage('');
            } catch (error) {
                console.error('Failed to send message:', error);
            }
        }
    };

    const handleExitRoom = async () => {
        if (selectedRoom) {
            try {
                await deletePartChat(selectedRoom);
                await deleteMessages(selectedRoom);
                setMessages([]);
                setSelectedRoom(null);
            } catch (error) {
                console.error('채팅방 나가기 중 오류:', error);
            }
        }
    };

    const handleExit = () => {
        navigate(`/main/list`);
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
                <button onClick={handleSelectRoom} className="ml-2 px-4 py-2 bg-blue-500 text-white text-sm font-medium rounded-md hover:bg-blue-600">
                    선택
                </button>
            </div>
            {selectedRoom && (
                <>
                    <div className="border border-gray-300 rounded-md p-4 h-64 overflow-y-scroll flex flex-col space-y-2">
                        {messages.map((msg, index) => (
                            <div key={index} className={`flex mb-4 ${msg.sender === eemail ? 'justify-end' : 'justify-start'}`}>
                                <div className="max-w-xs">
                                    <div className={`text-sm text-gray-500 mb-1 ${msg.sender === eemail ? 'text-right' : ''}`}>
                                        {msg.sender}
                                    </div>
                                    <div className={`p-3 rounded-lg ${msg.sender === eemail ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black'}`}>
                                        {msg.message}
                                    </div>
                                    <div className={`text-xs text-gray-400 mt-1 ${msg.sender === eemail ? 'text-right' : ''}`}>
                                        {new Date(msg.timestamp).toLocaleTimeString()}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="mt-4 flex">
                        <input
                            type="text"
                            placeholder="메세지 입력..."
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            className="flex-grow border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button onClick={handleSendMessage} className="ml-2 px-4 py-2 bg-green-500 text-white text-sm font-medium rounded-md hover:bg-green-600">
                            전송
                        </button>
                    </div>
                    <div className="mt-4 flex justify-between">
                        <button onClick={handleExitRoom} className="px-4 py-2 bg-red-500 text-white text-sm font-medium rounded-md hover:bg-red-600">
                            채팅방 삭제
                        </button>
                        <button onClick={handleExit} className="px-4 py-2 bg-orange-400 text-white text-sm font-medium rounded-md hover:bg-orange-600">
                            나가기
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default ChatComponent;
