import axios from "axios";


const host = `${import.meta.env.VITE_API_HOST}/chatroom`;

export const getEmpChatRoom = async (admno) => {

    const res = await axios.get(`${host}/get/admin/${admno}`)

    console.log(res);

    return res.data;
}

export const getPartChatRoom = async (pno) => {

    const res = await axios.get(`${host}/get/part/${pno}`)

    console.log(res);

    return res.data;
}

export const deletePartChat = async (erno) => {

    const res = await axios.delete(`${host}/delete/all/${erno}`)

    console.log(res);

    return res.data;
}