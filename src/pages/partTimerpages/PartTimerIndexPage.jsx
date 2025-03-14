import {Outlet} from "react-router-dom";
import BasicLayout from "../../layout/BasicLayout.jsx";

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

export const PartTimerWithPayTableColumn = [
    "pno", "pname", "jpname", "jmhourlyRate", "sum"
]

export const PartTimerWithPayTableHeader = [
    "이름", "공고 이름", "시급", "급여"
]

function PartTimerIndexPage() {
    return (
        <>
          <BasicLayout>
              <Outlet/>
          </BasicLayout>
        </>
    );
}

export default PartTimerIndexPage;