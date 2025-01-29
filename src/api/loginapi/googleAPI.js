import axios from "axios";

const auth_code_path = 'https://accounts.google.com/o/oauth2/v2/auth'

const rest_api_key = import.meta.env.VITE_GOOGLE_REST_KEY;

const redirect_uri = import.meta.env.VITE_GOOGLE_REDIRECT_URI;

const client_pw = import.meta.env.VITE_GOOGLE_CLIENT_PW;

const access_token_url = `https://oauth2.googleapis.com/token`;

// const access_token_url = "/google-auth/token"; // cors 때문에 프록시

const host = `${import.meta.env.VITE_API_HOST}/login/google`;

export const getGoogleMemberWithAccessToken = async (accessToken) => {

    console.log(accessToken)

    const res = await axios.get(`${host}?accessToken=${accessToken}`)

    console.log(res.data)

    return res.data
}

export const getGoogleLoginLink = () => {

    const googleURL = `${auth_code_path}?client_id=${rest_api_key}&redirect_uri=${redirect_uri}&response_type=code&scope=email profile`

    return googleURL;
}

export const getGoogleAccessToken = async (authCode) => {
    console.log("googleAccees-----------------")
    const header ={
        headers: {
            "Content-Type":  "application/x-www-form-urlencoded",
        },
    };
    const params = new URLSearchParams({ // useSearch안쓰고 해보기
        grant_type: 'authorization_code',
        client_id: rest_api_key,
        redirect_uri: redirect_uri,
        client_secret: client_pw,
        code: authCode,
    });

    console.log('111111111111')

    const res = await axios.post(access_token_url, params, header);

    console.log('2222222222222');

    console.log(res.data)

    return res.data.access_token;
}


