import {createBrowserRouter} from "react-router-dom";
import IndexPage from "../pages/IndexPage.jsx";
import EmployerRouter from "./EmployerRouter.jsx";
import LoginRouter from "./LoginPageRouter.jsx";


const MainRouter = createBrowserRouter([
    {
        path: '/',
        element: <IndexPage />
    },
    EmployerRouter,
    LoginRouter,


])

export default MainRouter;