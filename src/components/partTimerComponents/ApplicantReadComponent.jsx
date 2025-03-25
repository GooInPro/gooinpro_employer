import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { readApplicant, acceptJobApplication } from "../../api/partTimerapi/PartTimerAPI.js";

function ApplicantReadComponent() {
    const { jpano } = useParams();
    const [data, setData] = useState({});
    const [status, setStatus] = useState(null); // null, 'accepted', 'rejected'
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        readApplicant(jpano).then((res) => {
            setData(res);
            console.log(res);
        });
    }, [jpano]);

    const handleAccept = async () => {
        try {
            setLoading(true);
            const eno = localStorage.getItem('eno'); // 고용주 ID를 로컬 스토리지에서 가져옴
            await acceptJobApplication(jpano, eno);
            setStatus('accepted');
            console.log("지원이 성공적으로 수락되었습니다.");
        } catch (error) {
            console.error("지원 수락 실패:", error);
            console.log("지원 수락 중 오류가 발생했습니다.");
        } finally {
            setLoading(false);
        }
    };

    const handleReject = async () => {
        // 실제 거절 API가 구현되면 여기에 추가
        try {
            setLoading(true);
            // 더미 구현: 실제로는 API 호출이 필요
            setTimeout(() => {
                setStatus('rejected');
                alert("지원이 거절되었습니다.");
                setLoading(false);
            }, 500);
        } catch (error) {
            console.error("지원 거절 실패:", error);
            alert("지원 거절 중 오류가 발생했습니다.");
            setLoading(false);
        }
    };

    const goBack = () => {
        navigate(-1); // 이전 페이지로 이동
    };

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

            {/* 상태 메시지 */}
            {status === 'accepted' && (
                <div className="mt-6 p-3 bg-green-100 text-green-700 rounded-md w-full text-center font-bold">
                    지원이 수락되었습니다. 파트타이머에게 알림이 전송되었습니다.
                </div>
            )}
            {status === 'rejected' && (
                <div className="mt-6 p-3 bg-red-100 text-red-700 rounded-md w-full text-center font-bold">
                    지원이 거절되었습니다.
                </div>
            )}

            {/* 버튼 그룹 */}
            <div className="flex gap-4 mt-6 w-full">
                <button
                    onClick={goBack}
                    className="flex-1 bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition"
                >
                    목록으로
                </button>

                {!status && (
                    <>
                        <button
                            onClick={handleReject}
                            disabled={loading}
                            className="flex-1 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition disabled:opacity-50"
                        >
                            {loading ? '처리 중...' : '거절하기'}
                        </button>
                        <button
                            onClick={handleAccept}
                            disabled={loading}
                            className="flex-1 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition disabled:opacity-50"
                        >
                            {loading ? '처리 중...' : '수락하기'}
                        </button>
                    </>
                )}
            </div>
        </div>
    );
}

export default ApplicantReadComponent;
