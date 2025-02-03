
import ChatPage from "../pages/chatpages/ChatPage.jsx";
import ChatIndexPage from "../pages/chatpages/ChatIndexPage.jsx";


const ChatRouter ={
    path: '/chat',
    element: <ChatIndexPage/>,
    children: [
        {
            path: 'admin',
            element: <ChatPage/>,
            meta: {role: 'admin'}
        },
        {
            path: 'part',
            element: <ChatPage/>,
            meta: {role: 'part'}
        }

    ]
}
export default ChatRouter;