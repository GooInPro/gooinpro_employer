import Header from "./Header.jsx";
import BottomBar from "./BottomBar.jsx";

// BasicLayout 컴포넌트는 전체 레이아웃을 구성합니다.
// 상단에 Header, 중앙에 children, 하단에 BottomBar가 위치합니다.
function BasicLayout({ children }) {
    return (
        // flex-col으로 세로 방향 레이아웃을 만들고, h-screen으로 화면 전체 높이를 사용합니다.
        <div className="flex flex-col h-screen bg-white">
            {/* 상단 Header 영역 */}
            <Header />
            {/* 중앙 컨텐츠 영역: flex-1로 남은 공간을 모두 사용하며, overflow-auto로 스크롤 가능 */}
            <div className="flex-1 p-6 overflow-auto">
                {children}
            </div>
            {/* 하단 BottomBar 영역 */}
            <BottomBar />
        </div>
    );
}

export default BasicLayout;
