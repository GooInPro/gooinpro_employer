import {lazy} from "react";


const MainIndexPage = lazy(() => import("../pages/mainpages/MainIndexPage.jsx"))
const MainListPage = lazy(() => import("../pages/mainpages/MainListPage.jsx"))


const MainSelectRouter = {

    path: '/main',
    element: <MainIndexPage />,
    children: [
        {
            path: 'list', element: <MainListPage/>
        },

    ]
}


export default MainSelectRouter;