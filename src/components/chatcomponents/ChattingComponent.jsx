import {useNavigate, useParams, useSearchParams} from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import {getChatMessages, outChatRoom} from "../../api/chatapi/chatAPI.js";
import { Client } from "@stomp/stompjs";
import CommonModal from "../../common/CommonModal.jsx";
import employerStore from "../../stores/employerStore.js"; // STOMP client import

const useEmployerStore = employerStore;

function ChattingComponent() {

    const { id } = useParams();
    const [ searchParams ] = useSearchParams();
    const navigate = useNavigate();

    const roomName = searchParams.get("roomName");
    const email = useEmployerStore(state => state.eemail);

    const [messages, setMessages] = useState([]);
    const [inputText, setInputText] = useState(""); // 입력 메시지 상태
    const [sending, setSending] = useState(false); // 메시지 전송 중 여부
    const [outModalOpen, setOutModalOpen] = useState(false);

    const chatContainerRef = useRef(null); // 스크롤 유지용
    const socketRef = useRef(null); // STOMP client

    // 기존 채팅 불러오기
    useEffect(() => {
        getChatMessages(id).then((res) => {
            setMessages(res);
            console.log(res);
        });
    }, [id]);

    // STOMP 연결
    useEffect(() => {

        const client = new Client({

            brokerURL: `${import.meta.env.VITE_CHAT_SOCKET}`, // WebSocket endpoint

            onConnect: () => {

                console.log("STOMP connected");

                client.subscribe(`/topic/chat/${id}`, (message) => {

                    const newMessage = JSON.parse(message.body);
                    console.log("새로운 메세지 수신:", newMessage);
                    setMessages((prevMessages) => [...prevMessages, newMessage]);
                });
            },
            onStompError: (frame) => {

                console.log("STOMP error:", frame);
            },
        });

        client.activate(); // STOMP client 활성화

        socketRef.current = client;

        return () => {

            client.deactivate(); // 컴포넌트 unMount 시 STOMP client 종료
        };
    }, [id]);

    // 새로운 메시지가 추가될 때 자동 스크롤
    useEffect(() => {

        if (chatContainerRef.current) {

            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [messages]);

    // 메시지 전송 함수
    const sendMessage = () => {

        if (sending || !inputText.trim()) return; // 전송 중이면 메시지 보내지 않음

        setSending(true); // 메시지 전송 중 상태로 설정

        if (socketRef.current && socketRef.current.connected) {

            const msg = { roomId: id, message: inputText, senderEmail: email };

            socketRef.current.publish({

                destination: `/app/chat.sendMessage`,
                body: JSON.stringify(msg),
            });

            console.log("메세지 전송:", msg);
            setInputText(""); // 입력창 초기화
        } else {

            console.log("STOMP 연결 실패");
        }

        setSending(false); // 전송 완료 후 상태 초기화
    };

    const handleOutClick = () => {

        setOutModalOpen(true);
    }

    const leaveRoomFn = () => {

        const dto = {email: email, roomId: id};

        outChatRoom(dto).then(() => {

            setOutModalOpen(false);
            navigate("/chat");
        })
    }

    return (
        <>
            {outModalOpen && (
                <CommonModal
                    isOpen={outModalOpen}
                    msg={"퇴장"}
                    fn={leaveRoomFn}
                    closeModal={() => {
                        setOutModalOpen(false)
                    }}
                />
            )}

            <div className="flex flex-col h-full bg-gray-100 relative">
                {/* 채팅 헤더 */}
                <div
                    className="bg-blue-500 text-white text-lg font-bold py-3 px-4 shadow-md flex justify-between items-center">
                    <span>{roomName}</span>
                    <span
                        onClick={handleOutClick}
                        className="text-sm text-red-300 cursor-pointer hover:text-red-500 transition-colors duration-200"
                    >
                    나가기
                </span>
                </div>

                {/* 채팅 메시지 영역 */}
                <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-4 space-y-3 pb-20">
                    {messages.map((msg, index) => (
                        <div key={index}
                             className={`flex ${msg.senderEmail === email ? "justify-end" : "justify-start"}`}>
                            <div
                                className={`max-w-[70%] px-4 py-2 rounded-lg text-white shadow-md ${
                                    msg.senderEmail === email ? "bg-blue-500" : "bg-gray-400"
                                }`}
                            >
                                <p className="text-sm">{msg.message}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* 메시지 입력창 */}
                <div
                    className="absolute bottom-16 left-0 w-full bg-white p-3 flex items-center border-t shadow-md z-10">
                    <input
                        type="text"
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && sendMessage()} // 엔터 키 입력 시 메시지 전송
                        className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="메시지를 입력하세요..."
                    />
                    <button
                        onClick={sendMessage}
                        className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                    >
                        전송
                    </button>
                </div>
            </div>
        </>
    );
}

export default ChattingComponent;
