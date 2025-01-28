import axios from "axios";


const host =`${import.meta.env.VITE_API_HOST}/login`


// http://localhost:3000/employer/api/v1/login/reg/71

export const RegisterEmp = async (eno, EmployerRegisterDTO) => { // 추가정보 등록
    console.log("EmployerRegisterDTO before API call:", EmployerRegisterDTO);

    const res = await axios.put(`${host}/reg/${eno}`, EmployerRegisterDTO );

    console.log("Response from server:", res);

    return res.data;
};