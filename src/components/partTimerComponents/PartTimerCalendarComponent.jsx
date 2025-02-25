import { useState } from "react";
import Calendar from "react-calendar";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const PartTimerCalendarComponent = () => {
    const [date, setDate] = useState(new Date());

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
            <div className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-md">
                <Calendar
                    value={date}
                    onChange={setDate}
                    className="w-full text-center"
                    tileClassName={({ date, view }) => {
                        // 해당 달의 날짜에만 스타일 적용
                        const currentMonth = date.getMonth();
                        const currentYear = date.getFullYear();
                        const todayMonth = new Date().getMonth();
                        const todayYear = new Date().getFullYear();

                        // 현재 달에 맞는 날짜만 보여주고 나머지는 숨기기
                        return view === "month" &&
                        currentMonth === todayMonth &&
                        currentYear === todayYear
                            ? "relative flex items-center justify-center p-3 rounded-lg border border-gray-300 text-gray-700 transition-all hover:bg-blue-100"
                            : "hidden";  // 다른 달은 숨기기
                    }}
                    tileDisabled={({ date, view }) => {
                        // 현재 달에 속하지 않은 날짜 비활성화
                        return view === "month" && date.getMonth() !== new Date().getMonth();
                    }}
                    navigationLabel={({ date, label }) => (
                        <span className="text-lg font-semibold text-gray-900">{label}</span>
                    )}
                    prevLabel={
                        <button className="p-2 bg-gray-200 hover:bg-gray-300 rounded-full transition-all">
                            <FaChevronLeft className="text-gray-600" />
                        </button>
                    }
                    nextLabel={
                        <button className="p-2 bg-gray-200 hover:bg-gray-300 rounded-full transition-all">
                            <FaChevronRight className="text-gray-600" />
                        </button>
                    }
                    prev2Label={null}
                    next2Label={null}
                    formatShortWeekday={(locale, date) =>
                        ["일", "월", "화", "수", "목", "금", "토"][date.getDay()]
                    }
                    tileContent={({ date, view }) =>
                        date.toDateString() === new Date().toDateString() ? (
                            <div className="absolute bottom-1 right-1 text-xs bg-blue-500 text-white px-2 py-1 rounded-full">
                                오늘
                            </div>
                        ) : null
                    }
                />
            </div>
        </div>
    );
};

export default PartTimerCalendarComponent;
