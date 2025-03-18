import React, { useState } from "react";
import { registerJobPosting } from "../../api/jobpostingapi/jobpostingapi";
import { geocodeAddress } from "../../api/mapapi/mapapi";
import { useNavigate } from "react-router-dom";
import JobPostingRegisterComponent from "../../components/jobpostingcomponents/JobPostingRegisterComponent";
import JobPostingPlaceComponent from "../../components/jobpostingcomponents/JobPostingPlaceComponent";
import AddressSearchComponent from "../../common/AddressSearchComponent";
import employerStore from "../../stores/employerStore";
import CommonModal from "../../common/CommonModal";
import { uploadFile } from "../../util/fileUploadUtil";

const JobPostingRegisterPage = () => {
    const { eno } = employerStore();
    const navigate = useNavigate();

    const [showModal, setShowModal] = useState(false);
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [fileError, setFileError] = useState("");


    const [baseInfo, setBaseInfo] = useState({
        jpname: "",
        jpcontent: "",
        jpvacancies: 1,
        jphourlyRate: 0,
        jpworkDays: "0000000",
        jpminDuration: 1,
        jpmaxDuration: null,
        jpworkStartTime: "",
        jpworkEndTime: ""
    });

    const [placeInfo, setPlaceInfo] = useState({
        wroadAddress: "",
        wdetailAddress: "",
        zonecode: "",
        latitude: null,
        longitude: null
    });

    const [showAddressSearch, setShowAddressSearch] = useState(false);

    const handleBaseInfoChange = (e) => {
        const { name, value } = e.target;
        setBaseInfo((prev) => ({ ...prev, [name]: value }));
    };

    const handlePlaceInfoChange = (e) => {
        const { name, value } = e.target;
        setPlaceInfo((prev) => ({ ...prev, [name]: value }));
    };

    const handleAddressComplete = async (data) => {
        setPlaceInfo((prev) => ({
            ...prev,
            zonecode: data.zonecode,
            wroadAddress: data.address
        }));
        setShowAddressSearch(false);
        try {
            const coords = await geocodeAddress(data.address);
            setPlaceInfo((prev) => ({
                ...prev,
                latitude: coords.lat,
                longitude: coords.lng
            }));
        } catch (error) {
            console.error("Geocode API 호출 실패:", error);
        }
    };

    const processRegister = async () => {
        try {
            // 이미지 업로드
            let imageFilenames = [];
            if (selectedFiles.length > 0) {
                const baseUrl = import.meta.env.VITE_API_UPLOAD_LOCAL_HOST;
                const uploadUrl = new URL('/upload/api/jobPosting', baseUrl).toString();
                imageFilenames = await uploadFile({
                    files: selectedFiles,
                    uploadUrl: uploadUrl
                });
            }

            // 구인공고 등록 요청
            const response = await registerJobPosting({
                eno,
                ...baseInfo,
                ...placeInfo,
                jpifilenames: imageFilenames
            });

            navigate("/jobposting/list");
        } catch (error) {
            console.error("등록 실패:", error);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    const handleFileSelect = (e) => {
        const files = Array.from(e.target.files);
        if (files.length > 5) {
            setFileError("최대 5개까지 업로드 가능합니다.");
            setSelectedFiles(files.slice(0, 5));
        } else {
            setFileError("");
            setSelectedFiles(files);
        }
    };

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold text-center mb-4">구인공고 등록</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                <JobPostingRegisterComponent data={baseInfo} onChange={handleBaseInfoChange} />
                <hr className="border-gray-300" />
                <div className="space-y-4">
                    <JobPostingPlaceComponent data={placeInfo} onChange={handlePlaceInfoChange} />
                    <div className="text-center">
                        <button
                            type="button"
                            onClick={() => setShowAddressSearch(true)}
                            className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
                        >
                            주소 검색
                        </button>
                    </div>
                    {showAddressSearch && (
                        <div className="mt-4">
                            <AddressSearchComponent onComplete={handleAddressComplete} />
                        </div>
                    )}
                </div>
                <hr className="border-gray-300" />
                <div>
                    <h3 className="text-lg font-semibold mb-2">공고 이미지 업로드</h3>
                    <p className="text-sm text-gray-500 mb-2">공고에 표시될 이미지를 업로드하세요. (최대 5개)</p>
                    <input
                        type="file"
                        multiple
                        onChange={handleFileSelect}
                        className="block w-full text-sm text-gray-500
                                  file:mr-4 file:py-2 file:px-4
                                  file:rounded file:border-0
                                  file:text-sm file:font-semibold
                                  file:bg-blue-50 file:text-blue-700
                                  hover:file:bg-blue-100"
                    />
                    {selectedFiles.length > 0 && (
                        <p className="mt-2 text-sm text-green-600">{selectedFiles.length}개 파일 선택됨</p>
                    )}
                </div>
                <div className="text-center mb-20">
                    <button
                        type="submit"
                        className="mt-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition ease-in-out"
                    >
                        등록
                    </button>
                </div>
            </form>

            {showModal && (
                <CommonModal
                    isOpen={showModal}
                    msg="구인공고를 등록하시겠습니까?"
                    fn={processRegister}
                    closeModal={closeModal}
                    cancelFn={closeModal}
                />
            )}
        </div>
    );
};

export default JobPostingRegisterPage;
