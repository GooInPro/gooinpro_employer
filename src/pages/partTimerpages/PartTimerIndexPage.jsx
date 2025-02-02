import {Outlet} from "react-router-dom";

export const PartTimerTableColumn = [
    "pno", "pifilename", "pname", "jpname"
]

export const PartTimerTableHeader = [
    "사진", "이름", "근무지"

]

function PartTimerIndexPage() {
    return (
        <>
            <Outlet/>
        </>
    );
}

export default PartTimerIndexPage;