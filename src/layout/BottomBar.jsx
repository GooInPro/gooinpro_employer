import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Icon } from '@iconify/react';

const BottomBar = () => {
    // 현재 URL 경로 확인 (active 클래스 적용을 위해)
    const location = useLocation();
    // 네비게이션 바 숨김 여부 상태
    const [isHidden, setIsHidden] = useState(false);
    // 맨 위로 이동 버튼 노출 여부 상태
    const [showToTopButton, setShowToTopButton] = useState(false);
    // 마지막 스크롤 위치를 저장 (리렌더링에 영향 주지 않음)
    const lastScrollPosition = useRef(0);

    // 스크롤 이벤트 핸들러
    const handleScroll = () => {
        const currentScrollPosition = window.scrollY;
        // 스크롤을 아래로 내리면서 일정 위치(20px) 이상 이동했을 때 네비게이션 바를 숨김
        setIsHidden(currentScrollPosition > lastScrollPosition.current && currentScrollPosition > 20);
        // 스크롤이 200px 이상이면 맨 위로 이동 버튼 노출
        setShowToTopButton(currentScrollPosition > 200);
        lastScrollPosition.current = currentScrollPosition;
    };

    // 부드럽게 맨 위로 스크롤
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // 컴포넌트 마운트 시 스크롤 이벤트 등록, 언마운트 시 제거
    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // 현재 경로가 특정 path와 일치하는지 판단하는 함수 (active 상태)
    const isActive = (path) => location.pathname.startsWith(path);

    return (
        <>
            {/* 하단 네비게이션 바 */}
            <nav
                className={`fixed bottom-0 left-1/2 transform -translate-x-1/2 bg-white border-t border-gray-200 shadow-lg transition-transform duration-300 z-[9999] w-full max-w-[30rem] ${isHidden ? 'translate-y-full' : ''}`}
            >
                <div className="flex justify-around items-center px-0 py-3">
                    {/* 주변 공고 */}
                    <Link
                        to="/map/search"
                        className={`flex flex-col items-center group ${isActive('/map/search') ? 'text-blue-500' : 'text-gray-600'}`}
                    >
                        <Icon icon="mdi:map-marker" className="text-3xl group-hover:text-blue-400 transition duration-200" />
                        <span className="text-xs mt-1 group-hover:text-blue-400 transition duration-200">주변 공고</span>
                    </Link>
                    {/* 내 공고 */}
                    <Link
                        to="/jobposting/list"
                        className={`flex flex-col items-center group ${isActive('/jobposting/list') ? 'text-blue-500' : 'text-gray-600'}`}
                    >
                        <Icon icon="mdi:clipboard-text-outline" className="text-3xl group-hover:text-blue-400 transition duration-200" />
                        <span className="text-xs mt-1 group-hover:text-blue-400 transition duration-200">내 공고</span>
                    </Link>
                    {/* 내 직원 */}
                    <Link
                        to="/partTimer/list"
                        className={`flex flex-col items-center group ${isActive('/partTimer/list') ? 'text-blue-500' : 'text-gray-600'}`}
                    >
                        <Icon icon="mdi:account-group-outline" className="text-3xl group-hover:text-blue-400 transition duration-200" />
                        <span className="text-xs mt-1 group-hover:text-blue-400 transition duration-200">내 직원</span>
                    </Link>
                    {/* 채팅 */}
                    <Link
                        to="/chat"
                        className={`flex flex-col items-center group ${isActive('/chat') ? 'text-blue-500' : 'text-gray-600'}`}
                    >
                        <Icon icon="mdi:chat-outline" className="text-3xl group-hover:text-blue-400 transition duration-200" />
                        <span className="text-xs mt-1 group-hover:text-blue-400 transition duration-200">채팅</span>
                    </Link>
                    {/* 마이 페이지 */}
                    <Link
                        to="/employer/read/:eno"
                        className={`flex flex-col items-center group ${isActive('/employer/read/:eno') ? 'text-blue-500' : 'text-gray-600'}`}
                    >
                        <Icon icon="mdi:account-outline" className="text-3xl group-hover:text-blue-400 transition duration-200" />
                        <span className="text-xs mt-1 group-hover:text-blue-400 transition duration-200">마이 페이지</span>
                    </Link>
                </div>
            </nav>
            {/* 맨 위로 이동 버튼 */}
            {showToTopButton && (
                <button
                    onClick={scrollToTop}
                    className="fixed bottom-20 right-4 bg-blue-500 text-white p-3 rounded-full shadow-lg hover:bg-blue-600 transition duration-200"
                >
                    <Icon icon="material-symbols:arrow-upward-rounded" className="text-xl" />
                </button>
            )}
        </>
    );
};

export default BottomBar;
