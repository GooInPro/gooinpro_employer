// src/routers/MapRouter.jsx
import { lazy, Suspense } from "react";
import { NavermapsProvider } from 'react-naver-maps';
import MapIndexPage from "../pages/mappages/MapIndexPage.jsx";
const MapSearchPage = lazy(() => import("../pages/mappages/MapSearchPage.jsx"));

const MapRouter = {
    path: '/map',
    element: (
        <Suspense fallback={<div>Loading map...</div>}>
            <NavermapsProvider ncpClientId={import.meta.env.VITE_NCP_CLIENT_ID}>
                <MapIndexPage />
            </NavermapsProvider>
        </Suspense>
    ),
    children: [
        {
            path: 'search',
            element: (
                <Suspense fallback={<div>Loading search...</div>}>
                    <MapSearchPage />
                </Suspense>
            )
        }
    ]
};

export default MapRouter;
