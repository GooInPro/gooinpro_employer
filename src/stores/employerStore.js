import { create } from 'zustand';
import { Cookies } from "react-cookie";

const cookies = new Cookies();

let savedCookies = {
    eno: null,
    eemail: null,
    ename: null,
    accessToken: null,
    refreshToken: null
};

try {
    const EmployerCookie = cookies.get('employer', { path: '/' });
    savedCookies = EmployerCookie ? EmployerCookie : savedCookies;
} catch (e) {
    console.error(e);
}

const employerStore = create((set, get) => ({
    eno: savedCookies.eno,
    eemail: savedCookies.eemail,
    ename: savedCookies.ename,
    accessToken: savedCookies.accessToken,
    refreshToken: savedCookies.refreshToken,

    setEno: (eno) => {
        set({ eno });
        const state = get(); // 현재 상태를 가져옴
        cookies.set('employer', { ...state, eno }, { path: '/', expires: new Date(Date.now() + 3600 * 1000) });
    },
    setEemail: (eemail) => {
        set({ eemail });
        const state = get(); // 현재 상태를 가져옴
        cookies.set('employer', { ...state, eemail }, { path: '/', expires: new Date(Date.now() + 3600 * 1000) });
    },
    setEname: (ename) => {
        set({ ename });
        const state = get(); // 현재 상태를 가져옴
        cookies.set('employer', { ...state, ename }, { path: '/', expires: new Date(Date.now() + 3600 * 1000) });
    },
    setAccessToken: (token) => {
        set({ accessToken: token });
        const state = get(); // 현재 상태를 가져옴
        cookies.set('employer', { ...state, accessToken: token }, { path: '/', expires: new Date(Date.now() + 3600 * 1000) });
    },
    setRefreshToken: (token) => {
        set({ refreshToken: token });
        const state = get(); // 현재 상태를 가져옴
        cookies.set('employer', { ...state, refreshToken: token }, { path: '/', expires: new Date(Date.now() + 3600 * 1000) });
    },

    clearEmp: () => {
        set({ eno: null, eemail: null, ename: null });
        cookies.remove('employer', { path: '/' });
    },
    clearToken: () => {
        set({ accessToken: null, refreshToken: null });
        const state = get(); // 현재 상태를 가져옴
        cookies.set('employer', { ...state, accessToken: null, refreshToken: null }, { path: '/', expires: new Date(Date.now() + 3600 * 1000) });
    },
}));

export default employerStore;