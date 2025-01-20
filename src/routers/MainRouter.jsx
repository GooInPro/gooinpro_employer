import {createBrowserRouter} from "react-router-dom";
import IndexPage from "../pages/IndexPage.jsx";
import EmployerRouter from "./EmployerRouter.jsx";


const MainRouter = createBrowserRouter([
    {
        path: '/',
        element: <IndexPage />
    },
    EmployerRouter,


])

export default MainRouter;