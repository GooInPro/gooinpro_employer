import {getKakaoLoginLink} from "../../api/loginapi/kakaoAPI.js";

function LoginButtons() { //rsf

    const handleClickKakaoLogin = () => {
        const link = getKakaoLoginLink();
        window.location.href = link;
    }

    return (
        <div>
            <button
                onClick={handleClickKakaoLogin}>
                kakoLogin
            </button>
        </div>
    );
}

export default LoginButtons;