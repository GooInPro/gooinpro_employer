import {useNavigate, useSearchParams} from "react-router-dom";
import {useEffect} from "react";
import {getGoogleAccessToken, getGoogleMemberWithAccessToken} from "../../api/loginapi/googleAPI.js";
import employerStore from "../../stores/employerStore.js";


function GoogleRedirectPage() {

    const [searchParams] = useSearchParams();
    const authCode = searchParams.get("code")

    const setEno = employerStore(state => state.setEno);
    const setEemail = employerStore(state => state.setEemail);
    const setEname = employerStore(state => state.setEname);
    const setAccessToken = employerStore(state => state.setAccessToken);
    const setRefreshToken = employerStore(state => state.setRefreshToken);

    const navigate = useNavigate();


    useEffect(() => {
        console.log(authCode)
        getGoogleAccessToken(authCode).then((accessToken)=> {
            console.log(accessToken)
            getGoogleMemberWithAccessToken(accessToken).then((member) => {
                setEno(member.data.eno);
                setEemail(member.data.eemail);
                setEname(member.data.ename);
                setAccessToken(member.data.accessToken);
                setRefreshToken(member.data.refreshToken);

                if(member.data.isNew === false) {
                    navigate("/main/list")
                } else {
                    navigate("/employerRegister/select");
                }
            })
        })

    })

    return (
       <h1>google redirect page</h1>
    );
}

export default GoogleRedirectPage;