import Header from "./Header.jsx";
import BottomBar from "./BottomBar.jsx";

// BasicLayout 컴포넌트는 전체 레이아웃을 구성합니다.
// 상단에 Header, 중앙에 children, 하단에 BottomBar가 위치합니다.
function BasicLayout({ children }) {

    return (
        <div className="flex flex-col h-screen w-screen max-w-full bg-white">
            <Header />
            <div className="flex-1 overflow-auto px-0 pb-16">
                {children}
            </div>
            <BottomBar/>
        </div>
    );
}

export default BasicLayout;
