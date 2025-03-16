import { Outlet } from "react-router-dom";
import BasicLayout from "../../layout/BasicLayout.jsx";

function JobPostingIndexPage() {
    return (
        <BasicLayout>
            <Outlet />
        </BasicLayout>
    );
}

export default JobPostingIndexPage;