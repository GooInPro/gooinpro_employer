import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { getJobPosting } from "../../api/jobpostingapi/jobpostingapi.js";
import employerStore from "../../stores/employerStore";
import { FaFileAlt, FaRegStickyNote, FaUserFriends, FaMoneyBillWave, FaCalendarAlt, FaClock, FaMapMarkerAlt } from "react-icons/fa";

function JobPostingReadComponent() {
    const { jpno } = useParams();
    const navigate = useNavigate();
    const { eno: loggedInEno } = employerStore(); // 현재 로그인한 사용자의 eno
    const [loading, setLoading] = useState(true);
    const [jobPosting, setJobPosting] = useState(null);

    // 근무 요일 변환 함수
    const DAYS_OF_WEEK = ["월", "화", "수", "목", "금", "토", "일"];
    const convertWorkDays = (binaryString) => {
        return binaryString
            .split("")
            .map((char, index) => (char === "1" ? DAYS_OF_WEEK[index] : null))
            .filter((day) => day !== null)
            .join(", ");
    };

    useEffect(() => {
        if (!jpno || !loggedInEno) {
            console.error("필수 파라미터 누락:", { jpno, loggedInEno });
            setLoading(false);
            return;
        }

        getJobPosting(jpno, loggedInEno)
            .then((response) => {
                console.log("조회된 데이터:", response.data);
                setJobPosting(response.data);
            })
            .catch((err) => {
                console.error("조회 실패:", err);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [jpno, loggedInEno]);

    if (loading) return <div>Loading...</div>;
    if (!jobPosting) return <div>구인공고를 찾을 수 없습니다.</div>;

    const imageUrl =
        jobPosting.jpifilenames && jobPosting.jpifilenames.length > 0
            ? `${import.meta.env.VITE_IMAGE_BASE_URL}/${jobPosting.jpifilenames[0]}`
            : "/defaultImage.jpg"

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold text-center mb-4">구인공고 상세</h2>

            <div className="mb-6 flex flex-col items-center w-full">
                <div className="w-full max-w-3xl">
                    <img
                        src={imageUrl}
                        alt="구인 공고 관련 이미지를 넣어주세요"
                        className="w-full aspect-[16/9] object-cover rounded-lg"
                        // className="w-full h-full object-cover"
                    />
                    {!imageUrl && <span>업체에서 등록한 이미지가 없습니다</span>}
                </div>
            </div>

            <div className="space-y-4">
                {/* 공고명 */}
                <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                        <FaFileAlt className="text-blue-500"/>
                        <h3 className="font-semibold">공고명</h3>
                    </div>
                    <p>{jobPosting.jpname}</p>
                </div>

                {/* 공고 내용 */}
                <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                        <FaRegStickyNote className="text-blue-500"/>
                        <h3 className="font-semibold">공고 내용</h3>
                    </div>
                    <p>{jobPosting.jpcontent}</p>
                </div>

                {/* 모집 인원 */}
                <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                        <FaUserFriends className="text-blue-500"/>
                        <h3 className="font-semibold">모집 인원</h3>
                    </div>
                    <p>{jobPosting.jpvacancies}명</p>
                </div>

                {/* 시급 */}
                <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                        <FaMoneyBillWave className="text-blue-500"/>
                        <h3 className="font-semibold">시급</h3>
                    </div>
                    <p>{jobPosting.jphourlyRate}원</p>
                </div>

                {/* 근무 요일 */}
                <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                        <FaCalendarAlt className="text-blue-500"/>
                        <h3 className="font-semibold">근무 요일</h3>
                    </div>
                    <p>{convertWorkDays(jobPosting.jpworkDays)}</p>
                </div>

                {/* 근무 시간 */}
                <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                        <FaClock className="text-blue-500"/>
                        <h3 className="font-semibold">근무 시간</h3>
                    </div>
                    <p>
                        {jobPosting.jpworkStartTime?.substring(0, 5) ?? "00:00"} ~{" "}
                        {jobPosting.jpworkEndTime?.substring(0, 5) ?? "00:00"}
                    </p>
                </div>

                {/* 근무지 주소 */}
                <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                        <FaMapMarkerAlt className="text-blue-500"/>
                        <h3 className="font-semibold">근무지 주소</h3>
                    </div>
                    <p>{jobPosting.WorkPlace?.wroadAddress} {jobPosting.WorkPlace?.wdetailAddress}</p>
                </div>
            </div>

            <div className="mt-6 text-center space-x-4">
                <button
                    onClick={() => navigate("/jobposting/list")}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                >
                    목록으로 돌아가기
                </button>

                {/* 지원자 목록 보기 버튼 (조건부 렌더링) */}
                {jobPosting.eno === loggedInEno && (
                    <Link
                        to={`/partTimer/applicant/list/${jpno}`}
                        className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
                    >
                        지원자 목록 보기
                    </Link>
                )}
            </div>
        </div>
    );
};

export default JobPostingReadComponent;