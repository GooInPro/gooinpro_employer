
import { createRoot } from 'react-dom/client'
import './index.css'
import {RouterProvider} from "react-router-dom";
import mainRouter from "./routers/MainRouter.jsx";

// PWA 지원을 위한 서비스 워커 등록
import { registerSW } from 'virtual:pwa-register';

// 서비스 워커를 등록하고 자동 업데이트 활성화
registerSW({ immediate: true });


createRoot(document.getElementById('root')).render(

    <RouterProvider router={mainRouter}></RouterProvider>
)
