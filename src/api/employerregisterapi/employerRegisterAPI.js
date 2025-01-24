import axios from "axios";


const host =`${import.meta.env.VITE_API_HOST}/login`


// http://localhost:3000/employer/api/v1/login/reg/71

export const RegisterEmp = async (eno, EmployerRegisterDTO) => {
    console.log("EmployerRegisterDTO before API call:", EmployerRegisterDTO); // 전달 전 데이터 확인

    const res = await axios.put(`${host}/reg/${eno}`, EmployerRegisterDTO );

    console.log("Response from server:", res);

    return res.data;
};