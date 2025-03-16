import { Outlet } from "react-router-dom";
import BasicLayout from "../../layout/BasicLayout.jsx";

function MapIndexPage() {
    return (
        <BasicLayout>
            <Outlet />
        </BasicLayout>
    );
}

export default MapIndexPage;
