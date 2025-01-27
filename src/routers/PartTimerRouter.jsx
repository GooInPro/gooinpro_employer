import {lazy} from "react";

const PartTimerIndexPage = lazy(() => import('../pages/partTimerpages/PartTimerIndexPage.jsx'))
const PartTimerListPage = lazy(() => import('../pages/partTimerpages/PartTimerListPage.jsx'))
const PartTimerReadPage = lazy(() => import('../pages/partTimerpages/PartTimerReadPage.jsx'))

const PartTimerRouter = {

    path: '/partTimer', element: <PartTimerIndexPage/>,
    children: [

        {path: 'list/:eno', element: <PartTimerListPage/>},
        {path: 'read/:pno', element: <PartTimerReadPage/>},
    ]

}

export default PartTimerRouter;