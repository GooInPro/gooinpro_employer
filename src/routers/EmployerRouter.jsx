import {lazy} from "react";



const EmployerIndexPage = lazy(() => import("../pages/employerpages/EmployerIndexPage.jsx"))
const EmployerLoginPage = lazy(() => import("../pages/employerpages/EmployerLoginPage.jsx"))
const EmployerDetailPage = lazy(() => import("../pages/employerpages/EmployerDetailPage.jsx"))





const EmployerRouter = {

    path: '/employer',
    element: <EmployerIndexPage />,
    children: [
        {
            path: 'login', element: <EmployerLoginPage/>
        },
        {
            path: 'detail', element: <EmployerDetailPage/> // 참고만
        }
    ]
}


export default EmployerRouter;