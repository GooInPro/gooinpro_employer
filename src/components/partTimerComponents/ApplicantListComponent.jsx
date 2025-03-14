
import CommonTableComponent from "../../common/CommonTableComponent.jsx";
import {ApplicantTableColumn, ApplicantTableHeader} from "../../pages/partTimerpages/PartTimerIndexPage.jsx";
import {getApplicantList} from "../../api/partTimerapi/PartTimerAPI.js";
import {useParams} from "react-router-dom";

function ApplicantListComponent() {

    const { jpno } = useParams();

    return (
        <div>
            <CommonTableComponent
                name={"partTimer/applicant"}
                tableHeader={ApplicantTableHeader}
                column={ApplicantTableColumn}
                listFn={() => getApplicantList(jpno)}
            ></CommonTableComponent>
        </div>
    );
}

export default ApplicantListComponent;