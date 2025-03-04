import { useState } from "react";
import Calendar from "react-calendar";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Slider from "react-slick"; // react-slick 라이브러리

const PartTimerCalendarComponent = () => {
    const [date, setDate] = useState(new Date());

    // Slider 설정 (슬라이드 효과를 위해)
    const settings = {
        infinite: false, // 무한 슬라이드 비활성화
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        afterChange: (index) => {
            const newDate = new Date();
            newDate.setMonth(newDate.getMonth() + index);
            setDate(newDate);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
            <div className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-md">
                {/* Slider를 활용하여 달 넘기기 */}
                <Slider {...settings}>
                    <div>
                        <Calendar
                            value={date}
                            onChange={setDate}
                            className="w-full text-center"
                            tileClassName={({ date, view }) => {
                                const currentMonth = date.getMonth();
                                const currentYear = date.getFullYear();
                                const todayMonth = new Date().getMonth();
                                const todayYear = new Date().getFullYear();

                                return view === "month" &&
                                currentMonth === todayMonth &&
                                currentYear === todayYear
                                    ? "relative flex items-center justify-center p-3 rounded-lg border border-gray-300 text-gray-700 transition-all hover:bg-blue-100"
                                    : "hidden";
                            }}
                            tileDisabled={({ date, view }) => view === "month" && date.getMonth() !== new Date().getMonth()}
                            navigationLabel={({ date, label }) => (
                                <span className="text-lg font-semibold text-gray-900">{label}</span>
                            )}
                            prevLabel={null} // 기본 prev 버튼 제거
                            nextLabel={null} // 기본 next 버튼 제거
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
                </Slider>
            </div>
        </div>
    );
};

export default PartTimerCalendarComponent;
