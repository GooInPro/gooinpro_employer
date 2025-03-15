import { useState } from "react";
import Calendar from "react-calendar";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Slider from "react-slick";

const PartTimerCalendarComponent = () => {
    const [date, setDate] = useState(new Date());

    const settings = {
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
            <div className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-md border border-blue-200">
                {/* 달력 헤더 */}
                <div className="flex justify-between items-center mb-4">
                    <button
                        className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition"
                        onClick={() => setDate(new Date(date.getFullYear(), date.getMonth() - 1))}
                    >
                        <FaChevronLeft />
                    </button>
                    <h2 className="text-lg font-bold text-blue-600">
                        {date.toLocaleString("ko-KR", { year: "numeric", month: "long" })}
                    </h2>
                    <button
                        className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition"
                        onClick={() => setDate(new Date(date.getFullYear(), date.getMonth() + 1))}
                    >
                        <FaChevronRight />
                    </button>
                </div>

                {/* Slider를 활용한 달력 */}
                <Slider {...settings}>
                    <div>
                        <Calendar
                            value={date}
                            onChange={setDate}
                            className="w-full border-none"
                            showNeighboringMonth={false}
                            prevLabel={null}
                            nextLabel={null}
                            prev2Label={null}
                            next2Label={null}
                            formatDay={(locale, date) => date.getDate()} // 날짜를 숫자로만 표시
                            formatShortWeekday={(locale, date) =>
                                ["일", "월", "화", "수", "목", "금", "토"][date.getDay()]
                            }
                            tileClassName={({ date, view }) =>
                                view === "month"
                                    ? "flex items-center justify-center text-sm font-semibold w-12 h-12 border border-gray-300 rounded-md shadow-sm bg-white hover:bg-blue-100 transition"
                                    : null
                            }
                            calendarType="gregory"
                        />
                    </div>
                </Slider>
            </div>
        </div>
    );
};

export default PartTimerCalendarComponent;
