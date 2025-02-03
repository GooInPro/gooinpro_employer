import React from "react";

const JobPostingRegisterComponent = ({ data, onChange }) => {
    return (
        <div className="space-y-4">
            <h3 className="text-xl font-semibold">모집 조건 및 근무 조건</h3>
            <div>
                <label className="block text-sm font-medium text-gray-700">
                    공고 제목:
                </label>
                <input
                    type="text"
                    name="jpname"
                    value={data.jpname}
                    onChange={onChange}
                    required
                    className="mt-1 block w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">
                    공고 설명:
                </label>
                <textarea
                    name="jpcontent"
                    value={data.jpcontent}
                    onChange={onChange}
                    required
                    className="mt-1 block w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        모집 인원:
                    </label>
                    <input
                        type="number"
                        name="jpvacancies"
                        value={data.jpvacancies}
                        onChange={onChange}
                        min="1"
                        required
                        className="mt-1 block w-full border border-gray-300 rounded p-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        시급:
                    </label>
                    <input
                        type="number"
                        name="jphourlyRate"
                        value={data.jphourlyRate}
                        onChange={onChange}
                        min="0"
                        required
                        className="mt-1 block w-full border border-gray-300 rounded p-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">
                    근무 요일 (예: 1100000):
                </label>
                <input
                    type="text"
                    name="jpworkDays"
                    value={data.jpworkDays}
                    onChange={onChange}
                    maxLength={7}
                    required
                    className="mt-1 block w-full border border-gray-300 rounded p-2 focus:ring-blue-500 focus:border-blue-500"
                />
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        최소 근무 기간 (개월):
                    </label>
                    <input
                        type="number"
                        name="jpminDuration"
                        value={data.jpminDuration}
                        onChange={onChange}
                        min="1"
                        required
                        className="mt-1 block w-full border border-gray-300 rounded p-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        최대 근무 기간 (개월, 제한 없으면 비워두세요):
                    </label>
                    <input
                        type="number"
                        name="jpmaxDuration"
                        value={data.jpmaxDuration || ""}
                        onChange={(e) =>
                            onChange({
                                target: {
                                    name: "jpmaxDuration",
                                    value: e.target.value === "" ? null : e.target.value,
                                },
                            })
                        }
                        className="mt-1 block w-full border border-gray-300 rounded p-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        근무 시작시간 (HH:MM):
                    </label>
                    <input
                        type="time"
                        name="jpworkStartTime"
                        value={data.jpworkStartTime}
                        onChange={onChange}
                        required
                        className="mt-1 block w-full border border-gray-300 rounded p-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        근무 종료시간 (HH:MM):
                    </label>
                    <input
                        type="time"
                        name="jpworkEndTime"
                        value={data.jpworkEndTime}
                        onChange={onChange}
                        required
                        className="mt-1 block w-full border border-gray-300 rounded p-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
            </div>
        </div>
    );
};

export default JobPostingRegisterComponent;
