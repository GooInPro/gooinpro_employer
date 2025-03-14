import { useEffect, useState } from "react";
import {
    getPartTimerListWithPay,
    getPayByYear,
    getPayByYearMonth,
    getTotalPay
} from "../../api/partTimerapi/PartTimerAPI.js";
import CommonTableComponent from "../../common/CommonTableComponent.jsx";
import {
    PartTimerWithPayTableColumn,
    PartTimerWithPayTableHeader
} from "../../pages/partTimerpages/PartTimerIndexPage.jsx";

function PayCheckComponent() {
    const [month, setMonth] = useState(2);
    const [year, setYear] = useState(2024);

    const [totalPay, setTotalPay] = useState(0);
    const [yearPay, setYearPay] = useState(0);
    const [monthPay, setMonthPay] = useState(0);

    useEffect(() => {
        getTotalPay().then((res) => {
            console.log(res);
            setTotalPay(res.data);
        });
    }, []);

    useEffect(() => {
        getPayByYear(year).then((res) => {
            console.log(res);
            setYearPay(res.sum);
        });

        getPayByYearMonth(year, month).then((res) => {
            console.log(res);
            setMonthPay(res.sum);
        });
    }, [year, month]);

    return (
        <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-bold mb-4 text-gray-700">급여 조회</h2>

            {/* 급여 정보 */}
            <div className="mb-6 p-4 bg-gray-100 rounded-lg">
                <p className="text-lg font-semibold">총 지급액: {totalPay}원</p>
                <p className="text-lg font-semibold">올해 지급액: {yearPay}원</p>
                <p className="text-lg font-semibold">이번 달 지급액: {monthPay}원</p>
            </div>

            <CommonTableComponent
                name={"partTimer"}
                tableHeader={PartTimerWithPayTableHeader}
                column={PartTimerWithPayTableColumn}
                listFn={getPartTimerListWithPay}
            ></CommonTableComponent>

        </div>
    );
}

export default PayCheckComponent;
