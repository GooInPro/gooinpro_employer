import {lazy} from "react";

const LoginIndexPage = lazy(() => import("../pages/loginpages/LoginIndexPage.jsx"))
const LoginMainPage = lazy(() => import("../pages/loginpages/LoginMainPage.jsx"))
const KakaoRedirectPage = lazy(() => import("../pages/loginpages/KakaoRedirectPage.jsx"))
const GoogleRedirectPage = lazy(() => import("../pages/loginpages/GoogleRedirectPage.jsx"))
const NaverRedirectPage = lazy(() => import("../pages/loginpages/NaverRedirectPage.jsx"))




const LoginRouter = {

    path: '/login', element: <LoginIndexPage />,
    children: [
        {
            path: '', element: <LoginMainPage/>
        },
        {
            path: 'kakaore', element: <KakaoRedirectPage/>
        },
        {
            path: 'googlere', element: <GoogleRedirectPage/>
        },
        {
            path: 'naverre', element: <NaverRedirectPage/>
        }
    ]
}

export default LoginRouter;