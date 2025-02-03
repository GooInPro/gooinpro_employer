import React, { useState } from "react";
import { registerJobPosting } from "../../api/jobpostingapi/jobpostingapi";
import { geocodeAddress } from "../../api/mapapi/mapapi";
import { useNavigate } from "react-router-dom";
import JobPostingRegisterComponent from "../../components/jobpostingcomponents/JobPostingRegisterComponent";
import JobPostingPlaceComponent from "../../components/jobpostingcomponents/JobPostingPlaceComponent";
import AddressSearchComponent from "../../common/AddressSearchComponent";
import employerStore from "../../stores/employerStore";
import CommonModal from "../../common/CommonModal";

const JobPostingRegisterPage = () => {
    const { eno } = employerStore();
    const navigate = useNavigate();

    // 모달 상태
    const [showModal, setShowModal] = useState(false);

    // 모집 조건 및 근무 조건 (tbl_jobPostings 관련) 상태
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

    // 근무지 정보 (tbl_workPlace 관련) 상태 – 주소, 우편번호, 좌표 포함
    const [placeInfo, setPlaceInfo] = useState({
        wroadAddress: "",
        wdetailAddress: "",
        zonecode: "",
        latitude: null,
        longitude: null
    });

    // 주소 검색 팝업 노출 여부 상태
    const [showAddressSearch, setShowAddressSearch] = useState(false);

    // 모집 조건 입력 처리 함수
    const handleBaseInfoChange = (e) => {
        const { name, value } = e.target;
        setBaseInfo((prev) => ({ ...prev, [name]: value }));
    };

    // 근무지 정보 입력 처리 함수 (기본 텍스트 입력 필드)
    const handlePlaceInfoChange = (e) => {
        const { name, value } = e.target;
        setPlaceInfo((prev) => ({ ...prev, [name]: value }));
    };

    // AddressSearchComponent의 onComplete 콜백 함수
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
            alert("주소 좌표 변환에 실패했습니다.");
        }
    };

    // 실제 등록 처리 함수
    const processRegister = async () => {
        try {
            const payload = {
                eno,
                ...baseInfo,
                ...placeInfo
            };
            await registerJobPosting(payload);
            // 등록 성공 후 목록 페이지로 이동
            navigate("/main/list");
        } catch (err) {
            console.error("구인공고 등록 실패:", err);
            alert("등록 중 오류가 발생했습니다.");
        }
    };

    // 폼 제출 처리 함수
    const handleSubmit = (e) => {
        e.preventDefault();
        setShowModal(true);  // 모달 표시
    };

    // 모달 닫기 함수
    const closeModal = () => {
        setShowModal(false);
    };

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold text-center mb-4">구인공고 등록</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                {/* 모집 조건 및 근무 조건 입력 컴포넌트 */}
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
                {/* 제출 버튼 */}
                <div className="text-center">
                    <button
                        type="submit"
                        className="mt-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition ease-in-out"
                    >
                        등록
                    </button>
                </div>
            </form>

            {/* 모달 컴포넌트 */}
            {showModal && (
                <CommonModal
                    isOpen={showModal}
                    msg="구인공고를 등록"
                    fn={processRegister}
                    closeModal={closeModal}
                    cancelFn={closeModal}
                />
            )}
        </div>
    );
};

export default JobPostingRegisterPage;
