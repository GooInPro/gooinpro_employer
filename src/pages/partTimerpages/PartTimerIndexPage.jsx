import {Outlet} from "react-router-dom";

export const PartTimerTableColumn = [
    "pno", "pifilename", "pname", "jpname"
]

export const PartTimerTableHeader = [
    "사진", "이름", "근무지"

]

export const ApplicantTableColumn = [
    "pno", "pifilename", "pname", "jpname", "jpahourlyRate"
]

export const ApplicantTableHeader = [
    "사진", "이름", "공고 이름", "원하는 시급"
]

function PartTimerIndexPage() {
    return (
        <>
            <Outlet/>
        </>
    );
}

export default PartTimerIndexPage;