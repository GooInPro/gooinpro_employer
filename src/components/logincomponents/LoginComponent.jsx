import {getKakaoLoginLink} from "../../api/loginapi/kakaoAPI.js";

function LoginButtons() {

    const handleClickKakaoLogin = () => {
        const link = getKakaoLoginLink();
        window.location.href = link;
    }


    return (
        <div className="flex flex-col items-center justify-center min-h-screen pb-32 w-full">
            <div className="flex flex-col items-center space-y-4 w-full max-w-md mx-auto p-4">
                <img
                    src="/kakao_login.png"
                    alt="카카오 로그인"
                    className="w-full cursor-pointer"
                    onClick={handleClickKakaoLogin}
                />
                <button className="w-full py-3 px-4 rounded-lg border-2 border-gray-300 text-center text-gray-700 font-medium">
                    네이버 로그인
                </button>
                <button className="w-full py-3 px-4 rounded-lg border-2 border-gray-300 text-center text-gray-700 font-medium">
                    구글 로그인
                </button>
            </div>
        </div>
    );
}

export default LoginButtons;
