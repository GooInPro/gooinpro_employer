import employerStore from "../../stores/employerStore.js";
import axios from "axios";

const host = `${import.meta.env.VITE_API_HOST}/calendar`;

const getEno = () => employerStore.getState().eno;

//달력 데이터 가져오기
export const getCalendarData = async (year, month) => {

    const eno = getEno();  // eno 값을 가져와서 사용

    const res = await axios.get(`${host}/${eno}/${year}/${month}`);

    return res.data.data;
}