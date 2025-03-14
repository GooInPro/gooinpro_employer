import { Outlet } from "react-router-dom";
import BasicLayout from "../../layout/BasicLayout.jsx";

function MapIndexPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
            <div className="w-full max-w-6xl bg-white rounded shadow p-6">
                <BasicLayout>
                  <Outlet />
                </BasicLayout>
            </div>
        </div>
    );
}

export default MapIndexPage;