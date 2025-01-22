import { useSearchParams} from "react-router-dom";
import {useEffect} from "react";
import {getKakaoAccessToken} from "../../api/loginapi/kakaoAPI.js";

function KakaoRedirectPage() {

    const [searchParams] = useSearchParams();
    const authCode = searchParams.get("code")


    useEffect(() => {
        if(authCode) {
            getKakaoAccessToken(authCode).then((accessToken) => {
                console.log(accessToken);
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