import {Outlet} from "react-router-dom";

export const PartTimerTableColumn = [
    "pno", "pname", "workDaysCount", "onTimeCount", "lateCount", "earlyLeaveCount", "absenceCount"
]

export const PartTimerTableHeader = [
    "이름", "근무 일수", "정시 출근", "지각 횟수", "조퇴 횟수", "결근 횟수"
]

function PartTimerIndexPage() {
    return (
        <>
            <Outlet/>
        </>
    );
}

export default PartTimerIndexPage;