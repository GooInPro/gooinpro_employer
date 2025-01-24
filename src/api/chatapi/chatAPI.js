import axios from "axios";

const host = `${import.meta.env.VITE_API_HOST}/chatmessage`;

// 특정 roomId에 대한 메시지를 가져오는 함수
export const getMessage = async (roomId) => {
    try {
        const res = await axios.get(`${host}/chat?roomId=${roomId}`);
        console.log(res);
        return res.data;
    } catch (error) {
        console.error('메시지 가져오기 실패:', error);
        throw error;
    }
}

// 메시지를 전송하는 함수
export const sendMessage = async (body) => {
    try {
        const res = await axios.post(`${host}/send`, body);
        console.log(res);
        return res.data;
    } catch (error) {
        console.error('메시지 전송 실패:', error);
        throw error;
    }
}
