import axios from "axios";
import employerStore from "../../stores/employerStore.js";

const host = `${import.meta.env.VITE_API_HOST}/partTimer`;

// const eno = employerStore(state => state.eno);

const eno = 16;

export const getPartTimerList = async (page) => {

    const pageValue = page || 1;

    const res = await axios.get(`${host}/list/${eno}?page=${pageValue}`);

    console.log(pageValue);

    return res.data.data;
}

export const readPartTimer = async (pno) => {

    const res = await axios.get(`${host}/read/${pno}`);

    return res.data.data;
}