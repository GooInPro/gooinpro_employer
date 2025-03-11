
import CommonTableComponent from "../../common/CommonTableComponent.jsx";
import {getPartTimerList} from "../../api/partTimerapi/PartTimerAPI.js";
import {PartTimerTableColumn, PartTimerTableHeader} from "../../pages/partTimerpages/PartTimerIndexPage.jsx";

function PartTimerListComponent() {

    return (
        <>
            <CommonTableComponent
                name={"partTimer"}
                tableHeader={PartTimerTableHeader}
                column={PartTimerTableColumn}
                listFn={getPartTimerList}
            ></CommonTableComponent>
        </>
    );
}

export default PartTimerListComponent;