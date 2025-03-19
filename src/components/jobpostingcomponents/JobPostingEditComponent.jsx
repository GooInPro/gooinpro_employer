import {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import employerStore from "../../stores/employerStore.js";
import {deleteJobPosting, getJobPosting, updateJobPosting} from "../../api/jobpostingapi/jobpostingapi.js";
import {geocodeAddress} from "../../api/mapapi/mapapi.js";
import {uploadFile} from "../../util/fileUploadUtil.js";
import JobPostingProfileComponent from "./JobPostingProfileComponent.jsx";
import JobPostingPlaceComponent from "./JobPostingPlaceComponent.jsx";
import AddressSearchComponent from "../../common/AddressSearchComponent.jsx";
import CommonModal from "../../common/CommonModal.jsx";

function JobPostingEditComponent() {
    const { jpno } = useParams();
    const navigate = useNavigate();
    const { eno } = employerStore();
    const [loading, setLoading] = useState(true);

    const [images, setImages] = useState([]);
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
        wpno: null,
        wroadAddress: "",
        wdetailAddress: "",
        zonecode: "",
        latitude: null,
        longitude: null
    });

    const [showAddressSearch, setShowAddressSearch] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState("");
    const [modalAction, setModalAction] = useState(() => () => {});

    const handleDelete = async () => {
        try {
            await deleteJobPosting(jpno, eno);
            openModal("구인공고가 삭제되었습니다.", () => navigate("/jobposting/list"));
        } catch (error) {
            openModal("삭제 실패: " + error.message);
        }
    };

    useEffect(() => {
        if (!jpno || !eno) {
            console.error("필수 파라미터 누락:", { jpno, eno });
            setLoading(false);
            return;
        }
        getJobPosting(jpno, eno)
            .then((response) => {
                console.log("조회된 데이터:", response.data);
                const data = response.data;
                setBaseInfo({
                    jpname: data.jpname,
                    jpcontent: data.jpcontent,
                    jpvacancies: data.jpvacancies,
                    jphourlyRate: data.jphourlyRate,
                    jpworkDays: data.jpworkDays,
                    jpminDuration: data.jpminDuration,
                    jpmaxDuration: data.jpmaxDuration,
                    jpworkStartTime: (data.jpworkStartTime || "").substring(0, 5),
                    jpworkEndTime: (data.jpworkEndTime || "").substring(0, 5)
                });
                setPlaceInfo({
                    wpno: data.WorkPlace.wpno,
                    wroadAddress: data.WorkPlace.wroadAddress,
                    wdetailAddress: data.WorkPlace.wdetailAddress,
                    zonecode: data.WorkPlace.zonecode || "",
                    latitude: data.WorkPlace.wlati || null,
                    longitude: data.WorkPlace.wlong || null
                });
                setImages(data.jpifilenames || []); // ✅ 기존 이미지 설정
            })
            .catch((err) => {
                console.error("조회 실패:", err);
                openModal("데이터 조회에 실패했습니다.");
            })
            .finally(() => {
                setLoading(false);
            });
    }, [jpno, eno]);

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
            openModal("주소 좌표 변환에 실패했습니다.");
        }
    };

    const openModal = (message, action = () => {}) => {
        setModalMessage(message);
        setModalAction(() => action);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            let imageFilenames = images; // ✅ 기존 이미지 유지

            // 1. 새 이미지 업로드 (등록 페이지와 동일한 로직)
            if (selectedFiles.length > 0) {
                const baseUrl = import.meta.env.VITE_API_UPLOAD_LOCAL_HOST;
                const uploadUrl = new URL('/upload/api/jobPosting', baseUrl).toString();
                const newFilenames = await uploadFile({
                    files: selectedFiles,
                    uploadUrl: uploadUrl // ✅ 등록 페이지와 동일한 URL 생성 방식
                });
                imageFilenames = [...images, ...newFilenames];
            }

            // 2. 수정 요청 데이터 구성 (기존 로직 유지)
            const payload = {
                ...baseInfo,
                eno,
                wpno: placeInfo.wpno,
                wroadAddress: placeInfo.wroadAddress,
                wdetailAddress: placeInfo.wdetailAddress,
                jpifilenames: imageFilenames
            };

            console.log("[DEBUG] 최종 수정 페이로드:", payload);
            await updateJobPosting(jpno, payload);
            openModal("구인공고가 수정되었습니다.", () => navigate("/jobposting/list"));
        } catch (err) {
            console.error("[ERROR] 수정 실패 상세:", err.response?.data || err);
            openModal(`수정 실패: ${err.response?.data?.error || err.message}`);
        }
    };

    const handleFileSelect = (e) => {
        const files = Array.from(e.target.files);
        if (files.length > 5) {
            setFileError("최대 5개까지 업로드 가능합니다.");
            setSelectedFiles(files.slice(0, 5));
        } else {
            setSelectedFiles(files);
        }
    };

    const handleRemoveImage = (index) => {
        setImages(images.filter((_, i) => i !== index));
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold text-center mb-4">구인공고 수정</h2>
            <form onSubmit={handleUpdate} className="space-y-6">
                <JobPostingProfileComponent data={baseInfo} onChange={handleBaseInfoChange}/>
                <hr className="border-gray-300"/>
                <div className="space-y-4">
                    <JobPostingPlaceComponent data={placeInfo} onChange={handlePlaceInfoChange}/>
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
                            <AddressSearchComponent onComplete={handleAddressComplete}/>
                        </div>
                    )}
                </div>
                <hr className="border-gray-300"/>
                <div>
                    <h3 className="text-lg font-semibold mb-2">공고 이미지 업로드</h3>
                    <p className="text-sm text-gray-500 mb-2">공고에 표시될 이미지를 업로드하세요. (최대 5개)</p>
                    {/* ✅ 기존 이미지 표시 */}
                    <div className="grid grid-cols-5 gap-2 mb-4">
                        {images.map((filename, index) => (
                            <div key={index} className="relative">
                                <img
                                    src={`${import.meta.env.VITE_IMAGE_BASE_URL}/${filename}`}
                                    alt={`이미지 ${index + 1}`}
                                    className="w-full h-24 object-cover rounded"
                                />
                                <button
                                    type="button"
                                    onClick={() => handleRemoveImage(index)}
                                    className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                                >
                                    ×
                                </button>
                            </div>
                        ))}
                    </div>
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

                <div className="flex justify-center space-x-4">
                    <button
                        type="submit"
                        className="mt-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition ease-in-out"
                    >
                        수정
                    </button>
                    <button
                        type="button"
                        onClick={handleDelete}
                        className="mt-4 px-6 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition ease-in-out"
                    >
                        삭제
                    </button>
                </div>
            </form>

            {showModal && (
                <CommonModal
                    isOpen={showModal}
                    msg={modalMessage}
                    fn={modalAction}
                    closeModal={closeModal}
                    cancelFn={closeModal}
                />
            )}
        </div>
    );
};

export default JobPostingEditComponent;