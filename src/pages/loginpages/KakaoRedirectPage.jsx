import {useNavigate, useSearchParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {getKakaoAccessToken, getKakaoMemberWithAccessToken} from "../../api/loginapi/kakaoAPI.js";
import employerStore from "../../stores/employerStore.js";

function KakaoRedirectPage() {

    const [searchParams] = useSearchParams();
    const authCode = searchParams.get("code")

    const setEno = employerStore(state => state.setEno);
    const setEemail = employerStore(state => state.setEemail);
    const setEname = employerStore(state => state.setEname);
    const setAccessToken = employerStore(state => state.setAccessToken);
    const setRefreshToken = employerStore(state => state.setRefreshToken);

    const navigate = useNavigate();

    useEffect(() => {
        if(authCode) {
            getKakaoAccessToken(authCode).then((accessToken) => {
                getKakaoMemberWithAccessToken(accessToken).then((member) => {
                    console.log(member);
                        setEno(member.data.eno);
                        setEemail(member.data.eemail);
                        setEname(member.data.ename);
                        setAccessToken(member.data.accessToken);
                        setRefreshToken(member.data.refreshToken);

                        if(member.data.isNew === false) {
                            navigate("/partTimer/calendar")
                        } else {
                            navigate("/employerRegister/select");
                        }
                })
            })
        }
    })




    return (
        <div>
            {authCode}
        </div>
    );
}

export default KakaoRedirectPage;