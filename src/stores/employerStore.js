import {create} from 'zustand';

const employerStore = create((set) => ({
    eno: 0,
    eemail: null,
    eename: null,
    accessToken: null,
    refreshToken: null,

    setEno: (eno) => set({ eno: eno }),
    setEemail: (eemail) => set({ eeemail: eemail }),
    setEname: (ename) => set({ ename: ename }),
    setAccessToken: (token) => set({ accessToken: token }),
    setRefreshToken: (token) => set({ refreshToken: token }),

    clearEmp: () => set({ eno: null, eemail: null, eename: null }),
    clearToken: () => set({ accessToken: null, refreshToken: null }),

}))
export default employerStore;