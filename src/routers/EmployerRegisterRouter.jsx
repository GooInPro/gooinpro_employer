import {lazy} from "react";


const EmployerRegisterIndexPage = lazy(() => import("../pages/employerregisterpages/EmployerRegisterIndexPage.jsx"))
const EmployerRegisterPage = lazy(() => import("../pages/employerregisterpages/EmployerRegisterPage.jsx"))






const EmployerRouter = {

    path: '/employerRegister',
    element: <EmployerRegisterIndexPage />,
    children: [
        {
            path: 'select', element: <EmployerRegisterPage/>
        },
    ]
}


export default EmployerRouter;