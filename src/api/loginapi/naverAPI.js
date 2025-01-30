import axios from "axios";

const auth_code_path = 'https://nid.naver.com/oauth2.0/authorize'

// const access_token_url = `https://nid.naver.com/oauth2.0/token`;

const access_token_url = "/naver-auth/oauth2.0/token"; // 프록시경로

const rest_api_key = import.meta.env.VITE_NAVER_REST_KEY;

const redirect_uri = import.meta.env.VITE_NAVER_REDIRECT_URI;

const client_pw = import.meta.env.VITE_NAVER_CLIENT_PW

const host = `${import.meta.env.VITE_API_HOST}/login/naver`;

export const getNaverMemberWithAccessToken = async (accessToken) => {

    console.log(accessToken)

    const res = await axios.get(`${host}?accessToken=${accessToken}`)

    console.log(res.data)

    return res.data
}


export const getNaverLoginLink = () => {

    const naverURL = `${auth_code_path}?response_type=code&client_id=${rest_api_key}&redirect_uri=${redirect_uri}&state=GooInProEmp`

    return naverURL;
}

export const getNaverAccessToken = async (authCode) => {

    console.log(authCode)

    console.log("naverAccees-----------------")

    const header ={
        headers: {
            "Content-Type":  "application/x-www-form-urlencoded",
        },
    };

    const params = new URLSearchParams({
        grant_type: 'authorization_code',
        client_id: rest_api_key,
        client_secret: client_pw,
        code: authCode,
        state: 'GooInProEmp'
    })

    const res = await axios.post(access_token_url, params, header);

    console.log(res.data.access_token)

    return res.data.access_token

}
