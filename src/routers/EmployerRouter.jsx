import {lazy} from "react";



const EmployerIndexPage = lazy(() => import("../pages/employerpages/EmployerIndexPage.jsx"))
const EmployerLoginPage = lazy(() => import("../pages/employerpages/EmployerLoginPage.jsx"))
const EmployerReadPage = lazy(() => import("../pages/employerpages/EmployerReadPage.jsx"))





const EmployerRouter = {

    path: '/employer',
    element: <EmployerIndexPage />,
    children: [
        {
            path: 'login', element: <EmployerLoginPage/>
        },
        {
            path: 'read/:eno', element: <EmployerReadPage/>
        }
    ]
}


export default EmployerRouter;