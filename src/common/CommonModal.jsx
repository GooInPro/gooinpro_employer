import React, { useState } from "react";

const CommonModal = ({ isOpen, msg, fn, closeModal, cancelFn }) => {
    const [isFirstModalOpen, setIsFirstModalOpen] = useState(isOpen);
    const [isSecondModalOpen, setIsSecondModalOpen] = useState(false);

    // 확인 버튼 클릭 시 실행
    const confirmAction = () => {
        fn(); // 부모에서 전달받은 함수 실행
        setIsFirstModalOpen(false); // 첫 번째 모달 닫기
        setIsSecondModalOpen(true); // 두 번째 모달 열기
    };

    // 취소 버튼 클릭 시 실행
    const cancelAction = () => {
        setIsFirstModalOpen(false); // 첫 번째 모달 닫기
        setIsSecondModalOpen(false);
        cancelFn(); // 부모에게 모달 닫힘 전달
    };

    // 두 번째 모달 닫기
    const closeModals = () => {
        setIsSecondModalOpen(false);
        closeModal(false); // 부모에게 모달 닫힘 전달
    };

    return (
        isOpen && (
            <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
                {/* 첫 번째 모달 */}
                {isFirstModalOpen && (
                    <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-sm mx-auto transition-transform transform-gpu">
                        <p className="text-center text-gray-800 text-lg font-semibold mb-4">
                            {msg}하시겠습니까?
                        </p>
                        <div className="flex justify-center space-x-4 mt-6">
                            <button
                                className="px-6 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition duration-200 focus:outline-none focus:ring focus:ring-gray-300"
                                onClick={cancelAction}
                            >
                                취소
                            </button>
                            <button
                                className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200 focus:outline-none focus:ring focus:ring-blue-500"
                                onClick={confirmAction}
                            >
                                확인
                            </button>
                        </div>
                    </div>
                )}

                {/* 두 번째 모달 */}
                {isSecondModalOpen && (
                    <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-sm mx-auto transition-transform transform-gpu">
                        <p className="text-center text-green-600 text-lg font-semibold mb-4">
                            {msg}되었습니다!
                        </p>
                        <div className="flex justify-center">
                            <button
                                className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-200 focus:outline-none focus:ring focus:ring-green-500"
                                onClick={closeModals}
                            >
                                확인
                            </button>
                        </div>
                    </div>
                )}
            </div>
        )
    );
};

export default CommonModal;