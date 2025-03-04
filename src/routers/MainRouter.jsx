import {createBrowserRouter} from "react-router-dom";
import IndexPage from "../pages/IndexPage.jsx";
import EmployerRouter from "./EmployerRouter.jsx";
import ChatRouter from "./ChatRouter.jsx";
import LoginRouter from "./LoginPageRouter.jsx";
import MainSelectRouter from "./MainSelectRouter.jsx";
import EmployerRegisterRouter from "./EmployerRegisterRouter.jsx";
import PartTimerRouter from "./PartTimerRouter.jsx";
import MapRouter from "./MapRouter.jsx";
import JobPostingRouter from "./JobPostingRouter.jsx";


const MainRouter = createBrowserRouter([
    {
        path: '/',
        element: <IndexPage />
    },
    EmployerRouter,
    ChatRouter,
    LoginRouter,
    MainSelectRouter,
    EmployerRegisterRouter,
    PartTimerRouter,
    MapRouter,
    JobPostingRouter,
])

export default MainRouter;