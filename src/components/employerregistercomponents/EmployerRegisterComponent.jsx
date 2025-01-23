import { useEffect, useState } from "react";
import employerStore from "../../stores/employerStore.js";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {RegisterEmp} from "../../api/employerregisterapi/employerRegisterAPI.js";
import {useNavigate} from "react-router-dom"; // 기본 스타일 가져오기

function EmployerRegisterComponent() {
    const eno = employerStore((state) => state.eno);

    const navigate = useNavigate();

    const [ename, setEname] = useState("");
    const [egender, setEgender] = useState(false);
    const [ebirth, setEbirth] = useState(null);

    const formatDate = (date) => {
        if (!date) return "";
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
    };

    const handleChange = (e) => {
        setEname(e.target.value);
    };

    const handleButtonClick = () => {
        // EmployerRegisterDTO 객체 생성
        const employerRegisterDTO = {
            ename,
            egender,
            ebirth: formatDate(ebirth),
        };

        console.log({eno, employerRegisterDTO});

        // RegisterEmp 함수 호출
        RegisterEmp(eno, employerRegisterDTO);
        navigate('/main/list')
    };



    useEffect(() => {}, [eno]);

    return (
        <div className="flex flex-col items-center justify-start p-8 bg-gradient-to-r min-h-screen">
            <h2 className="text-3xl font-semibold text-gray-800 mb-8">추가 정보 입력</h2>

            {/* 이름 입력 */}
            <div className="w-full max-w-lg mb-6">
                <label className="block text-gray-600 font-medium mb-2">이름</label>
                <input
                    id="qregdate"
                    type="text"
                    value={ename}
                    className="w-full px-5 py-3 text-lg border border-gray-300 bg-white rounded-xl shadow-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
                    onChange={handleChange}
                    placeholder="이름을 입력하세요"
                />
            </div>

            {/* 성별 선택 */}
            <div className="w-full max-w-lg mb-6">
                <label className="block text-gray-600 font-medium mb-2">성별</label>
                <select
                    id="egender"
                    value={egender.toString()}
                    onChange={(e) => setEgender(e.target.value === "true")}
                    className="w-full px-5 py-3 text-lg border border-gray-300 bg-white rounded-xl shadow-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
                >
                    <option value="false">여자</option>
                    <option value="true">남자</option>
                </select>
            </div>

            {/* 생년월일 선택 */}
            <div className="w-full max-w-lg mb-6">
                <label className="block text-gray-600 font-medium mb-2">생년월일</label>
                <DatePicker
                    selected={ebirth}
                    onChange={(date) => setEbirth(date)}
                    dateFormat="yyyy-MM-dd"
                    placeholderText="생년월일을 선택하세요"
                    maxDate={new Date()}
                    showYearDropdown
                    showMonthDropdown
                    dropdownMode="select"
                    className="w-full px-5 py-3 text-lg border border-gray-300 bg-white rounded-xl shadow-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
                    calendarClassName="text-lg" // 달력 크기 확대
                    yearDropdownItemNumber={100} // 연도 드롭다운 항목 확장
                />
            </div>

            {/* 출력 섹션 */}
            <div className="text-lg text-gray-700 mb-8">
                <div>
                    이름: <span className="font-semibold">{ename || "입력 필요"}</span>
                </div>
                <div className="mt-3">
                    성별: <span className="font-semibold">{egender ? "남자" : "여자"}</span>
                </div>
                <div className="mt-3">
                    생년월일:{" "}
                    <span className="font-semibold text-blue-600">
                        {formatDate(ebirth) || "선택 필요"}
                    </span>
                </div>
            </div>

            {/* 전송 버튼 */}
            <button
                onClick={handleButtonClick}
                className="px-8 py-4 bg-blue-500 text-white text-lg rounded-lg shadow-xl hover:bg-blue-600 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                등록하기
            </button>
        </div>
    );
}

export default EmployerRegisterComponent;