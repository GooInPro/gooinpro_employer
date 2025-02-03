import React from 'react';
import DaumPostcode from 'react-daum-postcode';

const AddressSearchComponent = ({ onComplete }) => {
    const handleComplete = (data) => {
        let address = "";
        if (data.userSelectedType === "R") {
            address = data.roadAddress;
        } else {
            address = data.jibunAddress;
        }
        // 선택된 주소를 확인하는 디버그 로그 추가
        console.log("[DEBUG] 선택된 주소:", address);

        // onComplete 함수에 필요한 데이터 전송 (우편번호, 주소)
        onComplete({
            zonecode: data.zonecode,
            address: address
        });
    };

    return (
        <div>
            <DaumPostcode onComplete={handleComplete} />
        </div>
    );
};

export default AddressSearchComponent;
