import React from "react";

const JobPostingPlaceComponent = ({ data, onChange }) => {
    return (
        <div className="space-y-4">
            <h3 className="text-xl font-semibold">근무지 정보</h3>
            <div>
                <label className="block text-sm font-medium text-gray-700">
                    도로명 주소:
                </label>
                <input
                    type="text"
                    name="wroadAddress"
                    value={data.wroadAddress}
                    onChange={onChange}
                    required
                    className="mt-1 block w-full border border-gray-300 rounded p-2 focus:ring-blue-500 focus:border-blue-500"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">
                    상세 주소:
                </label>
                <input
                    type="text"
                    name="wdetailAddress"
                    value={data.wdetailAddress}
                    onChange={onChange}
                    className="mt-1 block w-full border border-gray-300 rounded p-2 focus:ring-blue-500 focus:border-blue-500"
                />
            </div>
        </div>
    );
};

export default JobPostingPlaceComponent;
