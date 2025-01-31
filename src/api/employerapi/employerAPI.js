import jwtAxios from "../../util/jwtUtil.js";

const host =`${import.meta.env.VITE_API_HOST}/emp`

export const EmployerRead = async (eno) => { // getOne

    console.log("EmployerRead")

    const res = await jwtAxios.get(`${host}/read/${eno}`)

    console.log(res)

    return res.data;
}