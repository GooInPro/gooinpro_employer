import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {readApplicant} from "../../api/partTimerapi/PartTimerAPI.js";


function ApplicantReadComponent() {

    const { pno } = useParams();

    const [data, setData] = useState({});

    useEffect(() => {

        readApplicant(0, pno).then((res) => {

            setData(res);
        })
    }, [pno]);

    return (
        <div>

        </div>
    );
}

export default ApplicantReadComponent;