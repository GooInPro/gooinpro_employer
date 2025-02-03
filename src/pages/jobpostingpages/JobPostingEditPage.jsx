// src/pages/jobpostingpages/JobPostingEditPage.jsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getJobPosting, updateJobPosting, deleteJobPosting } from "../../api/jobpostingapi/jobpostingapi";
import JobPostingRegisterComponent from "../../components/jobpostingcomponents/JobPostingRegisterComponent";
import JobPostingPlaceComponent from "../../components/jobpostingcomponents/JobPostingPlaceComponent";
import AddressSearchComponent from "../../common/AddressSearchComponent";
import { geocodeAddress } from "../../api/mapapi/mapapi";

const JobPostingEditPage = () => {
    // "/jobposting/edit/:jpno/:eno"로 경로 설정되어야 함
    const { jpno, eno } = useParams();
    const navigate = useNavigate();
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
        wroadAddress: "",
        wdetailAddress: "",
        zonecode: "",
        latitude: null,
        longitude: null
    });

    // 주소 검색 팝업 노출 여부
    const [showAddressSearch, setShowAddressSearch] = useState(false);

    useEffect(() => {
        // jpno와 eno가 없으면 에러 처리
        if (!jpno || !eno) {
            console.error("필수 파라미터 jpno, eno가 전달되지 않았습니다.");
            setLoading(false);
            return;
        }
        // 기존 구인공고 정보 조회
        getJobPosting(jpno, eno)
            .then((data) => {
                setBaseInfo({
                    jpname: data.jpname,
                    jpcontent: data.jpcontent,
                    jpvacancies: data.jpvacancies,
                    jphourlyRate: data.jphourlyRate,
                    jpworkDays: data.jpworkDays,
                    jpminDuration: data.jpminDuration,
                    jpmaxDuration: data.jpmaxDuration,
                    jpworkStartTime: data.jpworkStartTime,
                    jpworkEndTime: data.jpworkEndTime
                });
                setPlaceInfo({
                    wroadAddress: data.wroadAddress,
                    wdetailAddress: data.wdetailAddress,
                    zonecode: data.zonecode || "",
                    latitude: data.latitude || null,
                    longitude: data.longitude || null
                });
                setLoading(false);
            })
            .catch((err) => {
                console.error("구인공고 정보 조회 실패:", err);
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
            alert("주소 좌표 변환에 실패했습니다.");
        }
    };

    // 수정 처리: updateJobPosting 호출
    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const payload = { ...baseInfo, ...placeInfo };
            const result = await updateJobPosting(jpno, payload);
            alert("구인공고가 성공적으로 수정되었습니다!");
            console.log("수정 결과:", result);
            navigate("/employer/jobposting/list");
        } catch (err) {
            console.error("구인공고 수정 실패:", err);
            alert("수정 중 오류가 발생했습니다.");
        }
    };

    // 삭제 처리: deleteJobPosting 호출
    const handleDelete = async () => {
        if (!window.confirm("정말 삭제하시겠습니까?")) return;
        try {
            const result = await deleteJobPosting(jpno, eno);
            alert("구인공고가 삭제되었습니다.");
            console.log("삭제 결과:", result);
            navigate("/employer/jobposting/list");
        } catch (err) {
            console.error("구인공고 삭제 실패:", err);
            alert("삭제 중 오류가 발생했습니다.");
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold text-center mb-4">구인공고 수정</h2>
            <form onSubmit={handleUpdate} className="space-y-6">
                {/* 재사용: 모집 조건 입력 컴포넌트 */}
                <JobPostingRegisterComponent data={baseInfo} onChange={handleBaseInfoChange} />
                <hr className="border-gray-300" />
                {/* 재사용: 근무지 정보 입력 컴포넌트 및 주소 검색 */}
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
        </div>
    );
};

export default JobPostingEditPage;
