import { useEffect, useRef, useState } from "react";
import Calendar from "react-calendar";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Slider from "react-slick";
import { getCalendarData } from "../../api/calendarapi/CalendarAPI.js";

const PartTimerCalendarComponent = () => {
    const [date, setDate] = useState(new Date());
    const [workSchedule, setWorkSchedule] = useState([]);
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedSchedule, setSelectedSchedule] = useState(null);

    const prevMonthRef = useRef({ year: date.getFullYear(), month: date.getMonth() });

    const settings = {
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    // 날짜 변경 시 일정 데이터 가져오기
    useEffect(() => {
        const currentYear = date.getFullYear();
        const currentMonth = date.getMonth() + 1;

        // 이전에 불러온 날짜와 동일한 날짜라면 호출하지 않도록 방지
        if (prevMonthRef.current.month === currentMonth && prevMonthRef.current.year === currentYear) {
            return;
        }

        getCalendarData(currentYear, currentMonth).then((res) => {
            console.log(res);
            setWorkSchedule(res || []);
        });

        prevMonthRef.current = { year: currentYear, month: currentMonth };
    }, [date]);

    // 선택된 날짜의 일정 업데이트
    useEffect(() => {
        if (selectedDate) {
            setSelectedSchedule(getScheduleForDate(selectedDate));
        }
    }, [selectedDate, workSchedule]);

    // 특정 날짜의 일정을 가져오는 함수
    const getScheduleForDate = (date) => {
        if (!workSchedule || workSchedule.length === 0) return null;

        // 로컬 날짜로 포맷
        const localDate = new Date(date);
        const formattedDate =
            `${localDate.getFullYear()}-${(localDate.getMonth() + 1).toString().padStart(2, '0')}-${localDate.getDate().toString().padStart(2, '0')}`;

        const schedule = workSchedule.find((item) => item.date === formattedDate);
        return schedule ? schedule.workers : null;
    };

    // 날짜 클릭 시 선택된 날짜와 해당 일정 표시
    const handleDateClick = (date) => {
        console.log(date);
        setSelectedDate(date);
    };

    // 이전/다음 달 변경 시 초기화
    const handleMonthChange = (newDate) => {
        console.log(workSchedule);
        setDate(newDate);
        setWorkSchedule([]);
        setSelectedDate(null);
        setSelectedSchedule(null);
    };

    return (
        <div className="flex justify-center items-start p-4">
            <div className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-md border border-blue-200">
                {/* 달력 헤더 */}
                <div className="flex justify-between items-center mb-4">
                    <button
                        className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition"
                        onClick={() => handleMonthChange(new Date(date.getFullYear(), date.getMonth() - 1, 1))}
                    >
                        <FaChevronLeft />
                    </button>
                    <h2 className="text-lg font-bold text-blue-600">
                        {date.toLocaleString("ko-KR", { year: "numeric", month: "long" })}
                    </h2>
                    <button
                        className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition"
                        onClick={() => handleMonthChange(new Date(date.getFullYear(), date.getMonth() + 1, 1))}
                    >
                        <FaChevronRight />
                    </button>
                </div>

                {/* 달력 */}
                <Slider {...settings}>
                    <div>
                        <Calendar
                            key={`${date.getFullYear()}-${date.getMonth()}`} // key를 월별로 바꿔줌
                            value={date}
                            onChange={setDate}
                            className="w-full border-none"
                            showNeighboringMonth={false}
                            prevLabel={null}
                            nextLabel={null}
                            prev2Label={null}
                            next2Label={null}
                            formatDay={(locale, date) => date.getDate()}
                            formatShortWeekday={(locale, date) =>
                                ["일", "월", "화", "수", "목", "금", "토"][date.getDay()]
                            }
                            tileClassName={({ date, view }) =>
                                view === "month"
                                    ? "flex flex-col items-center justify-center text-sm font-medium w-16 h-16 border border-gray-300 rounded-xl shadow-lg bg-white hover:bg-blue-50 transition"
                                    : null
                            }
                            tileContent={({ date, view }) => {
                                const workers = getScheduleForDate(date);
                                if (workers) {
                                    const displayedWorkers = workers.slice(0, 2); // 최대 2개만 표시
                                    return (
                                        <div className="text-xs text-center mt-1 space-y-1">
                                            {displayedWorkers.map((worker, index) => (
                                                <div key={index} className="text-gray-600 font-semibold">
                                                    {worker.pname}
                                                </div>
                                            ))}
                                            {workers.length > 2 && (
                                                <button
                                                    className="text-blue-500 text-xs font-bold mt-1"
                                                    onClick={() => handleDateClick(date)} // 날짜 클릭 시 handleDateClick 호출
                                                >
                                                    + 더 보기
                                                </button>
                                            )}
                                        </div>
                                    );
                                }
                                return "X";
                            }}
                            calendarType="gregory"
                            onClickDay={handleDateClick} // 날짜 클릭 시 handleDateClick 호출
                        />
                    </div>
                </Slider>

                {/* 선택된 날짜의 일정 상세보기 */}
                {selectedDate && selectedSchedule && (
                    <div className="mt-6 p-4 bg-gray-100 rounded-lg shadow-sm">
                        <h3 className="text-lg font-semibold text-blue-600">
                            {selectedDate.toLocaleDateString("ko-KR")}
                        </h3>
                        <ul className="mt-2 space-y-2">
                            {selectedSchedule.map((worker, index) => (
                                <li key={index} className="text-gray-700">
                                    {worker.pname} - {worker.jmworkstartTime} : {worker.jmworkendTime}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PartTimerCalendarComponent;
