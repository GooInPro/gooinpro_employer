import axios from "axios";

const auth_code_path = 'https://nid.naver.com/oauth2.0/authorize'

const rest_api_key = import.meta.env.VITE_NAVER_REST_KEY;

const redirect_uri = import.meta.env.VITE_NAVER_REDIRECT_URI;

const client_pw = import.meta.env.VITE_NAVER_CLIENT_PW

const state = import.meta.env.VITE_NAVER_STATE

const host = `${import.meta.env.VITE_API_HOST}/login/naver`;

export const getNaverMemberWithAccessToken = async (accessToken) => {

    console.log(accessToken)

    const res = await axios.get(`${host}?accessToken=${accessToken}`)

    console.log(res.data)

    return res.data
}


export const getNaverLoginLink = () => {

    const naverURL = `${auth_code_path}?response_type=code&client_id=${rest_api_key}&redirect_uri=${redirect_uri}&state=${state}`

    return naverURL;
}

export const sendAuthCode = async (authCode) => {

    console.log(authCode)

    const apiHost=  `${host}/authcode`

    const params = new URLSearchParams();
    params.append('grant_type', 'authorization_code');
    params.append('client_id', rest_api_key);
    params.append('client_secret', client_pw);
    params.append('code', authCode);
    params.append('state', state);

    const res = await axios.post(apiHost, params.toString(), {
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        }
    });


    console.log("-------------")

    console.log(res.data)

    return res.data

}

