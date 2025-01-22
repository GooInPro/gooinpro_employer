import axios from "axios";


const rest_api_key = import.meta.env.VITE_KAKAO_REST_KEY;

const redirect_uri = import.meta.env.VITE_KAKAO_REDIRECT_URI;

const auth_code_path = `https://kauth.kakao.com/oauth/authorize`

const access_token_url = `https://kauth.kakao.com/oauth/token`

export const getKakaoLoginLink = () => {

    const kakaoURL = `${auth_code_path}?response_type=code&client_id=${rest_api_key}&redirect_uri=${redirect_uri}`;

    return kakaoURL;

}

export const getKakaoAccessToken = async (authCode) => {
    const header = {
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        }
    }
    const params = {
        grant_type: "authorization_code",
        client_id: rest_api_key,
        redirect_uri: redirect_uri,
        code: authCode
    }

    const res = await axios.post(access_token_url, params, header)
    console.log(res)

    const accessToken = res.data.access_token

    return accessToken

}