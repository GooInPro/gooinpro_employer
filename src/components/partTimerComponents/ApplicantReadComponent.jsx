import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { JobApplicationAceept, readApplicant } from "../../api/partTimerapi/PartTimerAPI.js";
import CommonModal from "../../common/CommonModal.jsx";

function ApplicantReadComponent() {

    const { jpano } = useParams();
    const [data, setData] = useState({});
    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState(""); // 모달 메시지
    const [actionType, setActionType] = useState(""); // 수락/거절 여부
    const navigate = useNavigate();

    const onClickAccept = () => {
        setActionType("accept");
        setModalMessage("지원자를 수락"); // 수락 메시지
        setShowModal(true); // 모달 띄우기
    }

    const onClickDenied = () => {
        setActionType("deny");
        setModalMessage("지원자를 거절"); // 거절 메시지
        setShowModal(true); // 모달 띄우기
    }

    const handleModalConfirm = () => {
        JobApplicationAceept(jpano, actionType === "accept" ? 1 : 2);
        setShowModal(false);
        navigate(-1); // 이전 페이지로 이동
    }

    const handleModalCancel = () => {
        setShowModal(false); // 모달 닫기
    }
    
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
                    src={data.pifilename ? `https://esnack24admin.store/profile/${data.pifilename}` : "/public/default_image.png"}
                    // alt="프로필 사진"
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

            {/* 수락, 거절 버튼 */}
            <div className="flex justify-between w-full mt-6">
                <button
                    onClick={onClickAccept}
                    className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-200 w-full mr-2"
                >
                    수락
                </button>

                <button
                    onClick={onClickDenied}
                    className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-200 w-full"
                >
                    거절
                </button>
            </div>

            {/* 모달 */}
            {showModal && (
                <CommonModal
                    isOpen={showModal}
                    msg={modalMessage}
                    fn={handleModalConfirm}
                    closeModal={handleModalCancel}
                    cancelFn={handleModalCancel}
                />
            )}
        </div>
    );
}

export default ApplicantReadComponent;