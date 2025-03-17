import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getJobPosting, updateJobPosting, deleteJobPosting } from "../../api/jobpostingapi/jobpostingapi";
import JobPostingRegisterComponent from "../../components/jobpostingcomponents/JobPostingRegisterComponent";
import JobPostingPlaceComponent from "../../components/jobpostingcomponents/JobPostingPlaceComponent";
import AddressSearchComponent from "../../common/AddressSearchComponent";
import { geocodeAddress } from "../../api/mapapi/mapapi";
import employerStore from "../../stores/employerStore";
import CommonModal from "../../common/CommonModal";

const JobPostingEditPage = () => {
    const { jpno } = useParams(); // URL에서 jpno 추출
    const navigate = useNavigate();
    const { eno } = employerStore(); // 현재 로그인한 고용주의 eno 추출
    const [loading, setLoading] = useState(true);

    // 모집 조건 상태 (tbl_jobPostings)
    const [baseInfo, setBaseInfo] = useState({
        jpname: "",
        jpcontent: "",
        jpvacancies: 1,
        jphourlyRate: 0,
        jpworkDays: "0000000",
        jpminDuration: 1,
        jpmaxDuration: null,
        jpworkStartTime: "",
        jpworkEndTime: ""
    });

    // 근무지 정보 상태 (tbl_workPlace)
    const [placeInfo, setPlaceInfo] = useState({
        wpno: null,
        wroadAddress: "",
        wdetailAddress: "",
        zonecode: "",
        latitude: null,
        longitude: null
    });

    // 주소 검색 팝업 노출 여부
    const [showAddressSearch, setShowAddressSearch] = useState(false);

    // 모달 상태
    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState("");
    const [modalAction, setModalAction] = useState(() => () => {}); // 모달 확인 버튼 액션

    // 데이터 조회
    useEffect(() => {
        if (!jpno || !eno) {
            console.error("필수 파라미터 누락:", { jpno, eno });
            setLoading(false);
            return;
        }
        console.log("데이터 조회 시작:", { jpno, eno });
        getJobPosting(jpno, eno)
            .then((response) => {
                console.log("조회된 데이터:", response.data);
                const data = response.data;
                setBaseInfo({
                    jpname: data.jpname,
                    jpcontent: data.jpcontent,
                    jpvacancies: data.jpvacancies,
                    jphourlyRate: data.jphourlyRate,
                    jpworkDays: data.jpworkDays,
                    jpminDuration: data.jpminDuration,
                    jpmaxDuration: data.jpmaxDuration,
                    jpworkStartTime: data.jpworkStartTime.substring(0, 5),
                    jpworkEndTime: data.jpworkEndTime.substring(0, 5)
                });
                setPlaceInfo({
                    wpno: data.wpno,
                    wroadAddress: data.wroadAddress,
                    wdetailAddress: data.wdetailAddress,
                    zonecode: data.zonecode || "",
                    latitude: data.wlati || null,
                    longitude: data.wlong || null
                });
            })
            .catch((err) => {
                console.error("조회 실패:", err);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [jpno, eno]);

    // 모집 조건 입력 변경 처리
    const handleBaseInfoChange = (e) => {
        const { name, value } = e.target;
        setBaseInfo((prev) => ({ ...prev, [name]: value }));
    };

    // 근무지 정보 입력 변경 처리
    const handlePlaceInfoChange = (e) => {
        const { name, value } = e.target;
        setPlaceInfo((prev) => ({ ...prev, [name]: value }));
    };

    // 주소 검색 완료 후 콜백 처리
    const handleAddressComplete = async (data) => {
        setPlaceInfo((prev) => ({
            ...prev,
            zonecode: data.zonecode,
            wroadAddress: data.address
        }));
        setShowAddressSearch(false);
        try {
            const coords = await geocodeAddress(data.address);
            setPlaceInfo((prev) => ({
                ...prev,
                latitude: coords.lat,
                longitude: coords.lng
            }));
        } catch (error) {
            console.error("Geocode API 호출 실패:", error);
            openModal("주소 좌표 변환에 실패했습니다.");
        }
    };

    // 모달 열기 함수
    const openModal = (message, action = () => {}) => {
        setModalMessage(message);
        setModalAction(() => action); // 액션 설정
        setShowModal(true);
    };

    // 모달 닫기 함수
    const closeModal = () => {
        setShowModal(false);
    };

    // 수정 처리
    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const payload = {
                ...baseInfo,
                eno, // ✅ 필수 필드 추가 (현재 로그인한 고용주 ID)
                wpno: placeInfo.wpno,
                wroadAddress: placeInfo.wroadAddress,
                wdetailAddress: placeInfo.wdetailAddress
            };

            console.log("[DEBUG] 최종 수정 요청 payload:", payload);

            await updateJobPosting(jpno, payload);

            openModal("구인공고를 수정", () =>
                navigate("/jobposting/list")
            ); // ✅ 모달 사용
        } catch (err) {
            console.error("[ERROR] 수정 실패 상세:", err.response?.data || err);
            openModal(`수정 실패: ${err.response?.data?.error || err.message}`);
        }
    };

    // 삭제 처리
    const handleDelete = async () => {
        openModal("정말 삭제", async () => {
            try {
                await deleteJobPosting(jpno, eno);
                openModal("구인공고가 삭제되었습니다!", () =>
                    navigate("/jobposting/list")
                );
            } catch (err) {
                console.error("구인공고 삭제 실패:", err);
                openModal("삭제 중 오류가 발생했습니다.");
            }
        });
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold text-center mb-4">구인공고 수정</h2>
            <form onSubmit={handleUpdate} className="space-y-6">
                {/* 모집 조건 입력 컴포넌트 */}
                <JobPostingRegisterComponent data={baseInfo} onChange={handleBaseInfoChange} />
                <hr className="border-gray-300" />
                {/* 근무지 정보 입력 컴포넌트 */}
                <div className="space-y-4">
                    <JobPostingPlaceComponent data={placeInfo} onChange={handlePlaceInfoChange} />
                    <div className="text-center">
                        <button
                            type="button"
                            onClick={() => setShowAddressSearch(true)}
                            className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
                        >
                            주소 검색
                        </button>
                    </div>
                    {showAddressSearch && (
                        <div className="mt-4">
                            <AddressSearchComponent onComplete={handleAddressComplete} />
                        </div>
                    )}
                </div>
                <hr className="border-gray-300" />
                {/* 제출 및 삭제 버튼 */}
                <div className="flex justify-center space-x-4">
                    <button
                        type="submit"
                        className="mt-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition ease-in-out"
                    >
                        수정
                    </button>
                    <button
                        type="button"
                        onClick={handleDelete}
                        className="mt-4 px-6 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition ease-in-out"
                    >
                        삭제
                    </button>
                </div>
            </form>

            {/* 모달 컴포넌트 */}
            {showModal && (
                <CommonModal
                    isOpen={showModal}
                    msg={modalMessage}
                    fn={modalAction}
                    closeModal={closeModal}
                    cancelFn={closeModal}
                />
            )}
        </div>
    );
};

export default JobPostingEditPage;
