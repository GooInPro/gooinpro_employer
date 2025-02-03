import { Outlet } from "react-router-dom";

function JobPostingIndexPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
            <div className="w-full max-w-3xl bg-white rounded shadow p-6">
                <Outlet />
            </div>
        </div>
    );
}

export default JobPostingIndexPage;
