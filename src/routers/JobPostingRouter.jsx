import { lazy } from "react";
import JobPostingIndexPage from "../pages/jobpostingpages/JobPostingIndexPage.jsx";

const JobPostingRegisterPage = lazy(() => import("../pages/jobpostingpages/JobPostingRegisterPage.jsx"));
const JobPostingEditPage = lazy(() => import("../pages/jobpostingpages/JobPostingEditPage.jsx"));
const JobPostingListPage = lazy(() => import("../pages/jobpostingpages/JobPostingListPage.jsx"));
const JobPostingReadPage = lazy(() => import("../pages/jobpostingpages/JobPostingReadPage.jsx"));

const JobPostingRouter = {
    path: "/jobposting",
    element: <JobPostingIndexPage />,
    children: [
        {
            path: "register",
            element: <JobPostingRegisterPage />,
        },
        {
            path: "edit/:jpno/:eno",
            element: <JobPostingEditPage />,
        },
        {
            path: "list",
            element: <JobPostingListPage />,
        },
        {
            path: "read/:jpno",
            element: <JobPostingReadPage />,
        },
    ],
};

export default JobPostingRouter;
