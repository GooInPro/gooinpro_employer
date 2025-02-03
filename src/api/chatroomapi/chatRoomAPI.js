import axios from "axios";


const host = `${import.meta.env.VITE_API_HOST}/chatroom`;

export const getAdminChatRoom = async (admno) => {

    try {
        const res = await axios.get(`${host}/get/admin/${admno}`);

        console.log(res);

        return res.data;

    } catch (error) {
        console.error('Error fetching chat room:', error);
        throw error;
    }
};


export const getPartChatRoom = async (pno) => {

    const res = await axios.get(`${host}/get/part/${pno}`)

    console.log(res);

    return res.data;
}

export const deletePartChat = async (rno) => {

    const res = await axios.delete(`${host}/delete/all/${rno}`)

    console.log(res);

    return res.data;
}