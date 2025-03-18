import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { readApplicant } from "../../api/partTimerapi/PartTimerAPI.js";

function ApplicantReadComponent() {

    const { jpano } = useParams();
    const [data, setData] = useState({});

    useEffect(() => {

        readApplicant(jpano).then((res) => {

            setData(res);
            console.log(res);
        });
    }, [jpano]);

    return (
        <div className="flex flex-col items-center p-4 max-w-md mx-auto">
            {/* 프로필 이미지 */}
            <div className="w-24 h-24 rounded-full overflow-hidden border border-gray-300">
                <img
                    src={data.pifilename ? `http://localhost/profile/${data.pifilename}` : "/public/default_image.png"}
                    alt="프로필 사진"
                    className="w-full h-full object-cover"
                />
            </div>

            {/* 지원자 정보 */}

            <div className="bg-white shadow-md rounded-lg w-full p-6 border mt-4">
                <h2 className="text-2xl font-bold text-blue-500 text-center">지원자 정보</h2>
                <div className="grid grid-cols-2 gap-4 mt-4">
                    <div className="flex flex-col">
                        <span className="text-lg font-bold text-gray-700">이름</span>
                        <span className="text-gray-800">{data.pname ?? "정보 없음"}</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-lg font-bold text-gray-700">성별</span>
                        <span className="text-gray-800">{data.pgender !== undefined ? (data.pgender ? "남자" : "여자") : "정보 없음"}</span>
                    </div>
                    <div className="flex flex-col col-span-2">
                        <span className="text-lg font-bold text-gray-700">생년월일</span>
                        <span className="text-gray-800">{data.pbirth ? new Date(data.pbirth).toLocaleDateString() : "정보 없음"}</span>
                    </div>
                    <div className="flex flex-col col-span-2">
                        <span className="text-lg font-bold text-gray-700">원하는 시급</span>
                        <span className="text-gray-800">{data.jpahourlyRate ? `${data.jpahourlyRate}원` : "정보 없음"}</span>
                    </div>
                </div>

                {/* 지원 메모 */}
                <h3 className="text-xl font-bold text-blue-500 mt-6">지원 메모</h3>
                <p className="text-gray-600 text-sm mt-2 border rounded-md p-3 bg-gray-50">
                    {data.jpacontent || "등록된 메모가 없습니다."}
                </p>
            </div>
        </div>
    );
}

export default ApplicantReadComponent;