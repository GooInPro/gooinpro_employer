import {lazy} from "react";

const PartTimerIndexPage = lazy(() => import('../pages/partTimerpages/PartTimerIndexPage.jsx'))
const PartTimerListPage = lazy(() => import('../pages/partTimerpages/PartTimerListPage.jsx'))
const PartTimerReadPage = lazy(() => import('../pages/partTimerpages/PartTimerReadPage.jsx'))
const ApplicantListPage = lazy(() => import('../pages/partTimerpages/ApplicantListPage.jsx'))

const PartTimerRouter = {

    path: '/partTimer', element: <PartTimerIndexPage/>,
    children: [

        {path: 'list/:eno', element: <PartTimerListPage/>},
        {path: 'read/:pno', element: <PartTimerReadPage/>},
        {path: 'applicant/list/:eno', element: <ApplicantListPage/>},
    ]

}

export default PartTimerRouter;