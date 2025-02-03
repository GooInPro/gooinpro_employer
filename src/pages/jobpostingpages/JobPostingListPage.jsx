// src/pages/jobpostingpages/JobPostingListPage.jsx
import React, { useState, useEffect } from "react";
import { listJobPostings } from "../../api/jobpostingapi/jobpostingapi";
import employerStore from "../../stores/employerStore";
import { Link, useNavigate } from "react-router-dom";

const JobPostingListPage = () => {
    // employerStore에서 eno와 ename 가져오기
    const { eno, ename } = employerStore();
    const [jobPostings, setJobPostings] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        if (!eno) {
            console.log("[DEBUG] eno가 정의되지 않음:", eno);
            return;
        }
        console.log("[DEBUG] employer eno:", eno);
        listJobPostings(eno)
            .then((response) => {
                console.log("[DEBUG] listJobPostings 응답:", response);
                // API 응답이 { status: "success", data: [...] } 형태라면:
                const postings = response.data?.data || response.data;
                console.log("[DEBUG] 추출된 구인공고 목록:", postings);
                setJobPostings(postings);
                setLoading(false);
            })
            .catch((error) => {
                console.error("구인공고 목록 조회 실패:", error);
                setLoading(false);
            });
    }, [eno]);

    if (loading) return <div>Loading...</div>;

    return (
        <div className="p-6">
            {/* 상단에 고용인명 출력 */}
            <h2 className="text-3xl font-bold text-center mb-6">고용인: {ename}</h2>
            <h3 className="text-2xl font-semibold mb-4">구인공고 목록</h3>
            {jobPostings.length === 0 ? (
                <div>등록된 구인공고가 없습니다.</div>
            ) : (
                <ul className="space-y-4">
                    {jobPostings.map((job) => (
                        <li key={job.jpno} className="border p-4 rounded shadow-sm">
                            <div className="mb-2">
                                <span className="font-bold">공고 제목: </span>
                                {job.jpname}
                            </div>
                            <div className="mb-2">
                                <span className="font-bold">설명: </span>
                                {job.jpcontent}
                            </div>
                            <div className="mb-2">
                                <span className="font-bold">도로명 주소: </span>
                                {job.WorkPlace ? job.WorkPlace.wroadAddress : "(주소 정보 없음)"}
                            </div>
                            <div className="mb-2">
                                <span className="font-bold">모집 기간: </span>
                                {job.jpminDuration}개월
                                {job.jpmaxDuration ? ` ~ ${job.jpmaxDuration}개월` : " (제한없음)"}
                            </div>
                            <div className="mt-2">
                                {/* 수정 버튼: 수정/삭제 페이지로 이동 */}
                                <Link
                                    to={`/jobposting/edit/${job.jpno}/${eno}`}
                                    className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
                                >
                                    수정하기
                                </Link>
                                {/* 상세보기 페이지 링크도 추가 가능 */}
                                {/*<Link*/}
                                {/*    to={`/jobposting/detail/${job.jpno}`}*/}
                                {/*    className="ml-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"*/}
                                {/*>*/}
                                {/*    상세보기*/}
                                {/*</Link>*/}
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default JobPostingListPage;
