import {lazy} from "react";

const PartTimerIndexPage = lazy(() => import('../pages/partTimerpages/PartTimerIndexPage.jsx'))
const PartTimerListPage = lazy(() => import('../pages/partTimerpages/PartTimerListPage.jsx'))
const PartTimerReadPage = lazy(() => import('../pages/partTimerpages/PartTimerReadPage.jsx'))
const ApplicantListPage = lazy(() => import('../pages/partTimerpages/ApplicantListPage.jsx'))
const ApplicantReadPage = lazy(() => import('../pages/partTimerpages/ApplicantReadPage.jsx'))
const PartTimerCalendarPage = lazy(() => import('../pages/partTimerpages/PartTimerCalendarPage.jsx'))
const PayCheckPage = lazy(() => import('../pages/partTimerpages/PayCheckPage.jsx'))

const PartTimerRouter = {

    path: '/partTimer', element: <PartTimerIndexPage/>,
    children: [

        {path: 'list', element: <PartTimerListPage/>},
        {path: 'read/:pno', element: <PartTimerReadPage/>},
        {path: 'applicant/list/:jpno', element: <ApplicantListPage/>},
        {path: 'applicant/read/:jpano', element: <ApplicantReadPage/>},
        {path: 'calendar', element: <PartTimerCalendarPage/>},
        {path: 'pay', element: <PayCheckPage/>},
    ]

}

export default PartTimerRouter;