
import {lazy} from "react";

const ChatIndexPage = lazy(() => import("../pages/chatpages/ChatIndexPage.jsx"));
const ChatListPage = lazy(() => import('../pages/chatpages/ChatListPage.jsx'))


const ChatRouter ={
    path: '/chat',
    element: <ChatIndexPage/>,
    children: [
        {path: '', element: <ChatListPage/>}    //chat 의 기본 = listPage
    ]
}
export default ChatRouter;