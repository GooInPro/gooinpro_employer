import { useEffect, useState } from "react";
import PageComponent from "/src/common/pageComponent.jsx";
import { useSearchParams, useNavigate, useLocation } from "react-router-dom";

const init = {
    dtoList: [],
    totalPage: 0,
    nextPage: 0,
    next: false,
    pageRequestDTO: [],
    pageNumList: [],
    total: 0,
    prevPage: 0,
    prev: false,
    current: 0
};

export const formatDate = (dateString) => {
    const date = new Date(dateString);
    date.setHours(date.getHours() + 9);
    return date.toLocaleString("ko-KR", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
    });
};

const getFormattedArray = (value) => {
    if (Array.isArray(value)) {
        return value.join(", ");
    }
    return value || "-";
};

function CommonTableComponent({ name, tableHeader, column, listFn }) {
    const [data, setData] = useState(init);
    const [loading, setLoading] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams();
    const [page, setPage] = useState(1);
    const navigate = useNavigate();
    const location = useLocation();

    const changePage = (pageNum) => {
        setPage(pageNum);
        setSearchParams({ page: pageNum });
    };

    const linkClick = (num) => {
        navigate({
            pathname: `/${name}/read/${num}`,
            search: location.search,
        });
    };

    const renderCell = (col, value) => {
        if (col === "qstatus" || col === "castatus" || col === "cpstatus") {
            return (
                <span
                    className={`px-2 py-1 rounded-lg text-xs font-bold ${
                        value
                            ? "bg-green-500 text-white"
                            : "bg-red-500 text-white"
                    }`}
                >
                    {value ? "답변완료" : "답변대기"}
                </span>
            );
        }
        if (col.endsWith("date") || col.endsWith("birth")) {
            return formatDate(value);
        }
        if (col.endsWith("List")) {
            return getFormattedArray(value);
        }
        return value || "-";
    };

    useEffect(() => {
        const pageQuery = searchParams.get("page") || 1;
        setLoading(true);
        listFn(pageQuery).then((res) => {
            setData(res);
            setLoading(false);
            console.log(res);
        });
    }, [searchParams, name]);

    return (
        <div className="p-4 bg-white rounded-lg shadow-md w-full mx-auto overflow-hidden mb-12">
            {/* 모바일에서 카드 형식으로 리스트를 보여줌 */}
            <div className="space-y-4">
                {loading ? (
                    <div className="text-center text-gray-500">
                        🔄 데이터를 불러오는 중...
                    </div>
                ) : data.dtoList.length > 0 ? (
                    data.dtoList.map((item) => (
                        <div
                            key={item.id || item[column[0]]}
                            className="p-4 bg-white shadow-md rounded-lg border hover:shadow-lg transition"
                            onClick={() => linkClick(item[column[0]])}
                        >
                            {column.slice(1).map((col, index) => (
                                <div key={col} className="flex justify-between py-2">
                                    <span className="font-semibold text-blue-500">
                                        {tableHeader[index]} {/* header 배열에서 전체 항목 사용 */}
                                    </span>
                                    <span>{renderCell(col, item[col])}</span>
                                </div>
                            ))}
                        </div>
                    ))
                ) : (
                    <div className="text-center text-gray-500">
                        ❌ 검색 결과가 없습니다.
                    </div>
                )}
            </div>

            {/* 페이지 네비게이션 */}
            <div className="mt-6">
                <PageComponent pageResponse={data} changePage={changePage} />
            </div>
        </div>
    );
}

export default CommonTableComponent;
