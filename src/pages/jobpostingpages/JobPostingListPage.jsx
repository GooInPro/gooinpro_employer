import React from "react";
import { listJobPostings } from "../../api/jobpostingapi/jobpostingapi";
import employerStore from "../../stores/employerStore";
import { Link, useNavigate } from "react-router-dom";
import BasicLayout from "../../layout/BasicLayout";
import JobPostingTableComponent from "../../components/jobpostingcomponents/JobPostingTableComponent.jsx";

const JobPostingListPage = () => {
    const { eno, ename } = employerStore();
    const navigate = useNavigate();

    // 테이블 헤더와 컬럼 정의
    const tableHeader = ["공고 명", "공고 상세", "주소", "시급", "모집 기간"];
    const column = ["jpname", "jpcontent", "WorkPlace.wroadAddress", "jphourlyRate", "jpminDuration"];

    // 페이지네이션을 위한 데이터 조회 함수
    const getJobPostingList = async (page) => {
        try {
            const response = await listJobPostings(eno, page);
            return {
                dtoList: response.data || [],
                totalPage: response.totalPages || 1,
                pageNumList: response.pageNumList || [],
                current: response.number + 1 || 1,
                next: response.next || false,
                prev: response.prev || false,
                nextPage: response.nextPage || null,
                prevPage: response.prevPage || null
            };
        } catch (error) {
            console.error("구인공고 목록 조회 실패:", error);
            return {
                dtoList: [],
                totalPage: 0,
                pageNumList: [],
                current: 1,
                next: false,
                prev: false,
                nextPage: null,
                prevPage: null
            };
        }
    };

    // ✅ "공고 수정하기" 버튼 렌더링 함수
    const renderEditButton = (item) => (
        <button
            onClick={() => navigate(`/jobposting/edit/${item.jpno}/${eno}`)}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
        >
            공고 수정하기
        </button>
    );

    return (

            <div className="p-6">
                {/* 헤더 영역 */}
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-3xl font-bold">고용인: {ename}</h2>
                    <Link
                        to="/jobposting/register"
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                    >
                        새 공고 등록
                    </Link>
                </div>

                <h3 className="text-2xl font-semibold mb-4">구인공고 목록</h3>

                {/* CommonTableComponent 사용 */}
                <JobPostingTableComponent
                    name="jobposting"
                    tableHeader={tableHeader}
                    column={column}
                    listFn={getJobPostingList}
                    renderActions={renderEditButton} // ✅ 커스텀 버튼 추가
                />
            </div>

    );
};

export default JobPostingListPage;
