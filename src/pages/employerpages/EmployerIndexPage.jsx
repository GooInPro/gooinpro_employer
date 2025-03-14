import {Outlet} from "react-router-dom";
import BasicLayout from "../../layout/BasicLayout.jsx";


function EmployerIndexPage() {
    return (
        <>
            <BasicLayout>
            <Outlet/>
            </BasicLayout>
        </>
    )
}

export default EmployerIndexPage