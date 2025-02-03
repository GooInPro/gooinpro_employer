
import CommonTableComponent from "../../common/CommonTableComponent.jsx";
import {ApplicantTableColumn, ApplicantTableHeader} from "../../pages/partTimerpages/PartTimerIndexPage.jsx";
import {getApplicantList} from "../../api/partTimerapi/PartTimerAPI.js";

function ApplicantListComponent() {

    return (
        <div>
            <CommonTableComponent
                name={"partTimer/applicant"}
                tableHeader={ApplicantTableHeader}
                column={ApplicantTableColumn}
                listFn={getApplicantList}
            ></CommonTableComponent>
        </div>
    );
}

export default ApplicantListComponent;