import {Outlet} from "react-router-dom";
import BottomBar from "../../layout/BottomBar.jsx";


function MainIndexPage() {
    return (
        <div>
            <Outlet/>
            <BottomBar />
        </div>
    );
}

export default MainIndexPage;