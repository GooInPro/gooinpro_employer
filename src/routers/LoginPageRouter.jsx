import {lazy} from "react";

const LoginIndexPage = lazy(() => import("../pages/loginpages/LoginIndexPage.jsx"))
const LoginMainPage = lazy(() => import("../pages/loginpages/LoginMainPage.jsx"))
const KakaoRedirectPage = lazy(() => import("../pages/loginpages/KakaoRedirectPage.jsx"))


const LoginRouter = {

    path: '/login', element: <LoginIndexPage />,
    children: [
        {
            path: '', element: <LoginMainPage/>
        },
        {
            path: 'kakaore', element: <KakaoRedirectPage/>
        }
    ]
}

export default LoginRouter;