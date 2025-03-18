import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { getJobPosting } from "../../api/jobpostingapi/jobpostingapi";
import employerStore from "../../stores/employerStore";

const JobPostingReadPage = () => {
    const { jpno } = useParams();
    const navigate = useNavigate();
    const { eno: loggedInEno } = employerStore(); // 현재 로그인한 사용자의 eno
    const [loading, setLoading] = useState(true);
    const [jobPosting, setJobPosting] = useState(null);

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

    return (
        <div className="p-6">

            <div className="mt-6">
                <h3 className="text-lg font-semibold mb-4">공고 이미지</h3>
                <div className="grid grid-cols-3 gap-4">
                    {jobPosting.jpifilenames?.map((filename, index) => (
                        <img
                            key={index}
                            src={`http://localhost/jobPosting/${filename}`}
                            alt={`공고 이미지 ${index + 1}`}
                            className="w-full h-32 object-cover rounded-lg border"
                        />
                    ))}
                </div>
            </div>

            <h2 className="text-2xl font-bold text-center mb-4">구인공고 상세</h2>
            <div className="space-y-4">
                <div>
                    <h3 className="font-semibold">공고명</h3>
                    <p>{jobPosting.jpname}</p>
                </div>
                <div>
                    <h3 className="font-semibold">공고 내용</h3>
                    <p>{jobPosting.jpcontent}</p>
                </div>
                <div>
                    <h3 className="font-semibold">모집 인원</h3>
                    <p>{jobPosting.jpvacancies}명</p>
                </div>
                <div>
                    <h3 className="font-semibold">시급</h3>
                    <p>{jobPosting.jphourlyRate}원</p>
                </div>
                <div>
                    <h3 className="font-semibold">근무 요일</h3>
                    <p>{jobPosting.jpworkDays}</p>
                </div>
                <div>
                    <h3 className="font-semibold">근무 기간</h3>
                    <p>{jobPosting.jpminDuration}개월
                        ~ {jobPosting.jpmaxDuration ? `${jobPosting.jpmaxDuration}개월` : '무기한'}</p>
                </div>
                <div>
                    <h3 className="font-semibold">근무 시간</h3>
                    <p>
                        {jobPosting.jpworkStartTime?.substring(0, 5) ?? '00:00'} ~
                        {jobPosting.jpworkEndTime?.substring(0, 5) ?? '00:00'}
                    </p>
                </div>
                <div>
                    <h3 className="font-semibold">근무지 주소</h3>
                    <p>{jobPosting.wroadAddress} {jobPosting.wdetailAddress}</p>
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

export default JobPostingReadPage;
