import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {readPartTimer} from "../../api/partTimerapi/PartTimerAPI.js";


function PartTimerReadComponent() {

    const { pno } = useParams();

    console.log(pno);

    const [data, setData] = useState({});

    useEffect(() => {

        readPartTimer(pno).then((res) => {

            setData(res);
            console.log(res);
        })
    }, [pno]);

    return (
        <div className="flex flex-col items-center p-4">
            <div className="bg-white shadow-lg rounded-lg w-full max-w-sm p-6">
                <h2 className="text-2xl font-semibold text-center mb-4">근로자 상세 정보</h2>
                <div className="space-y-4">
                    <div className="flex justify-between">
                        <span className="font-medium">이름</span>
                        <span className="text-gray-700">{data.pname}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="font-medium">이메일</span>
                        <span className="text-gray-700">{data.pemail}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="font-medium">성별</span>
                        <span
                            className="text-gray-700">{data.pgender ? '남자' : '여자'}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="font-medium">주소</span>
                        <span className="text-gray-700">{data.proadAddress} {data.pdetailAddress}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="font-medium">생년월일</span>
                        <span
                            className="text-gray-700">{data.pbirth ? new Date(data.pbirth).toLocaleDateString() : '정보 없음'}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="font-medium">근무일 수</span>
                        <span className="text-gray-700">{data.workDaysCount}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="font-medium">정시 출근</span>
                        <span className="text-gray-700">{data.onTimeCount}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="font-medium">지각 횟수</span>
                        <span className="text-gray-700">{data.lateCount}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="font-medium">조기 퇴근</span>
                        <span className="text-gray-700">{data.earlyLeaveCount}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="font-medium">결근 횟수</span>
                        <span className="text-gray-700">{data.absenceCount}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PartTimerReadComponent;