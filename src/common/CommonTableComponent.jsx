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
        <div className="p-4 bg-white rounded-lg shadow-md">
            <div className="overflow-x-auto">
                <table className="w-full text-xs md:text-sm text-gray-700 border border-gray-300 rounded-lg shadow-md">
                    <thead className="bg-gradient-to-r from-blue-500 to-blue-700 text-white">
                    <tr className="text-xs md:text-sm font-semibold text-left tracking-wide">
                        {tableHeader.map((item) => (
                            <th
                                key={item}
                                className="px-4 py-3 text-center whitespace-nowrap"
                            >
                                {item}
                            </th>
                        ))}
                    </tr>
                    </thead>
                    <tbody className="bg-white">
                    {loading ? (
                        <tr>
                            <td colSpan={tableHeader.length} className="text-center py-4 text-gray-500">
                                🔄 데이터를 불러오는 중...
                            </td>
                        </tr>
                    ) : data.dtoList.length > 0 ? (
                        data.dtoList.map((item) => (
                            <tr
                                key={item.id || item[column[0]]}
                                className="hover:bg-gray-200 border-b border-gray-200 transition cursor-pointer"
                                onClick={() => linkClick(item[column[0]])}
                            >
                                {column.slice(1).map((col) => (
                                    <td key={col} className="px-4 py-3 text-center truncate">
                                        {renderCell(col, item[col])}
                                    </td>
                                ))}
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={tableHeader.length} className="text-center py-4 text-gray-500">
                                ❌ 검색 결과가 없습니다.
                            </td>
                        </tr>
                    )}
                    </tbody>
                    <tfoot>
                    <tr>
                        <td colSpan={column.length} className="py-4">
                            <div className="flex justify-center">
                                <PageComponent pageResponse={data} changePage={changePage} />
                            </div>
                        </td>
                    </tr>
                    </tfoot>
                </table>
            </div>
        </div>
    );
}

export default CommonTableComponent;
