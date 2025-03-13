import axios from "axios";

const host = `${import.meta.env.VITE_CHAT_API_HOST}`;

//채팅방 list Get
export const getChatRoomList = async (email) => {

    const res = await axios.get(`${host}/chatroom/list/${email}`);

    return res.data;
}
