import React, { useState, useEffect } from "react";
import { listJobPostings } from "../../api/jobpostingapi/jobpostingapi";
import employerStore from "../../stores/employerStore";
import { Link } from "react-router-dom";
import BasicLayout from "../../layout/BasicLayout";

const JobPostingListPage = () => {
    const { eno, ename } = employerStore();
    const [jobPostings, setJobPostings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!eno) {
            console.log("[DEBUG] eno가 정의되지 않음:", eno);
            return;
        }
        console.log("[DEBUG] employer eno:", eno);
        listJobPostings(eno)
            .then((response) => {
                console.log("[DEBUG] listJobPostings 원본 응답:", response);
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

    return (
        <BasicLayout>
            <div className="p-6">
                {/* 고용인 정보 및 새 공고 등록 버튼 */}
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-3xl font-bold">고용인: {ename}</h2>
                    <Link
                        to="/jobposting/register" // ✅ JobPostingRegisterPage 경로
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                    >
                        새 공고 등록
                    </Link>
                </div>

                <h3 className="text-2xl font-semibold mb-4">구인공고 목록</h3>
                {loading ? (
                    <div>로딩 중...</div>
                ) : jobPostings && jobPostings.length > 0 ? (
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
                                    {/* 수정 버튼 */}
                                    <Link
                                        to={`/jobposting/edit/${job.jpno}/${eno}`}
                                        className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
                                    >
                                        수정하기
                                    </Link>
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <div>등록된 구인공고가 없습니다.</div>
                )}
            </div>
        </BasicLayout>
    );
};

export default JobPostingListPage;
