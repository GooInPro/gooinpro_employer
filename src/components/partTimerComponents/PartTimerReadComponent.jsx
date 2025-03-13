import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {readPartTimer} from "../../api/partTimerapi/PartTimerAPI.js";


function PartTimerReadComponent() {

    const { pno } = useParams();

    console.log(pno);

    const [data, setData] = useState({
        partTimer: {},
        workLogs: {}
    });


    useEffect(() => {

        readPartTimer(pno).then((res) => {

            setData(res);
            console.log(res);
        })
    }, [pno]);

    return (
        <div className="flex flex-col items-center p-4">
            <div className="bg-white shadow-md rounded-lg w-full p-6 border">
                {/* 근로자 정보 */}
                <h2 className="text-2xl font-bold text-center text-blue-500 mb-6">근로자 상세 정보</h2>
                <div className="grid grid-cols-2 gap-6">
                    <div className="flex flex-col">
                        <span className="text-lg font-bold text-gray-700">이름</span>
                        <span className="text-gray-800">{data.partTimer.pname ?? "정보 없음"}</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-lg font-bold text-gray-700">이메일</span>
                        <span className="text-gray-800">{data.partTimer.pemail ?? "정보 없음"}</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-lg font-bold text-gray-700">성별</span>
                        <span className="text-gray-800">
                    {data.partTimer.pgender !== undefined ? (data.partTimer.pgender ? "남자" : "여자") : "정보 없음"}
                </span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-lg font-bold text-gray-700">생년월일</span>
                        <span className="text-gray-800">
                    {data.partTimer.pbirth ? new Date(data.partTimer.pbirth).toLocaleDateString() : "정보 없음"}
                </span>
                    </div>
                    <div className="flex flex-col col-span-2">
                        <span className="text-lg font-bold text-gray-700">주소</span>
                        <span className="text-gray-800">
                    {data.partTimer.proadAddress && data.partTimer.pdetailAddress
                        ? `${data.partTimer.proadAddress} ${data.partTimer.pdetailAddress}`
                        : "정보 없음"}
                </span>
                    </div>
                </div>

                {/* 근무 현황 */}
                <h3 className="text-xl font-bold text-blue-500 mt-8 mb-4">근무 현황</h3>
                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-blue-50 rounded-lg p-3 flex flex-col items-center">
                        <span className="text-lg font-bold text-gray-700">근무일 수</span>
                        <span className="text-2xl font-bold text-blue-600">{data.workLogs.workDaysCount ?? 0}</span>
                    </div>
                    <div className="bg-blue-50 rounded-lg p-3 flex flex-col items-center">
                        <span className="text-lg font-bold text-gray-700">정시 출근</span>
                        <span className="text-2xl font-bold text-blue-600">{data.workLogs.onTimeCount ?? 0}</span>
                    </div>
                    <div className="bg-blue-50 rounded-lg p-3 flex flex-col items-center">
                        <span className="text-lg font-bold text-gray-700">지각 횟수</span>
                        <span className="text-2xl font-bold text-blue-600">{data.workLogs.lateCount ?? 0}</span>
                    </div>
                    <div className="bg-blue-50 rounded-lg p-3 flex flex-col items-center">
                        <span className="text-lg font-bold text-gray-700">조기 퇴근</span>
                        <span className="text-2xl font-bold text-blue-600">{data.workLogs.earlyLeaveCount ?? 0}</span>
                    </div>
                    <div className="bg-blue-50 rounded-lg p-3 flex flex-col items-center col-span-2">
                        <span className="text-lg font-bold text-gray-700">결근 횟수</span>
                        <span className="text-2xl font-bold text-blue-600">{data.workLogs.absenceCount ?? 0}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PartTimerReadComponent;