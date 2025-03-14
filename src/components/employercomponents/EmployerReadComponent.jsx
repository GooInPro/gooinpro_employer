import employerStore from "../../stores/employerStore.js";
import { useEffect, useState } from "react";
import {EmployerEdit, EmployerRead} from "../../api/employerapi/employerAPI.js";
import CommonModal from "../../common/CommonModal.jsx";
import {useNavigate} from "react-router-dom";

const EmployerDetailComponent = () => {
    const { setEname } = employerStore();
    const eno = employerStore(state => state.eno);
    const [editmodalOpen , setEditModalOpen] = useState(false);

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        ename: "",
        eemail: "",
        ebirth: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleEditClick = () => {

        setEditModalOpen(true)
    }

    const EditFn = () => {
        const updateData = {
            ename: formData.ename,
            ebirth: formData.ebirth
        }
        EmployerEdit(eno, updateData).then((res) => {
            console.log(res);
            setEname(formData.ename);
            // 수정된 데이터 다시 불러오기 (화면 즉시 반영)
            return EmployerRead(eno);
        }).then((data) => {
            setFormData({
                ename: data.data.ename,
                eemail: data.data.eemail,
                ebirth: data.data.ebirth,
            });
            setEditModalOpen(false);
            navigate("/partTimer/calendar")
        });
    }


    useEffect(() => {
        EmployerRead(eno).then((data) => {
            setFormData({
                ename: data.data.ename,
                eemail: data.data.eemail,
                ebirth: data.data.ebirth,
            });
        });
    }, [eno]);

    return (
<>
        {editmodalOpen && (
            <CommonModal
                isOpen={editmodalOpen}
                msg={"수정"}
                fn={EditFn}
                closeModal={() => {
                    setEditModalOpen(false)
                }}
            />
        )}
        <div className="max-w-4xl mx-auto p-8 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">고용주 정보 수정</h2>

            <div className="space-y-6">
                {/* 이름 */}
                <div className="flex flex-col">
                    <label htmlFor="ename" className="text-lg font-medium text-gray-700 mb-2">
                        이름
                    </label>
                    <input
                        id="ename"
                        type="text"
                        name="ename"
                        value={formData.ename}
                        onChange={handleChange}
                        className="w-full px-4 py-3 text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
                        placeholder="이름을 입력하세요"
                    />
                </div>

                {/* 이메일 */}
                <div className="flex flex-col">
                    <label htmlFor="eemail" className="text-lg font-medium text-gray-700 mb-2">
                        이메일
                    </label>
                    <input
                        id="eemail"
                        type="email"
                        name="eemail"
                        value={formData.eemail}
                        onChange={handleChange}
                        className="w-full px-4 py-3 text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
                        placeholder="이메일을 입력하세요"
                        readOnly
                    />
                </div>

                {/* 생년월일 */}
                <div className="flex flex-col">
                    <label htmlFor="ebirth" className="text-lg font-medium text-gray-700 mb-2">
                        생년월일
                    </label>
                    <input
                        id="ebirth"
                        type="date"
                        name="ebirth"
                        value={formData.ebirth}
                        onChange={handleChange}
                        className="w-full px-4 py-3 text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
                    />
                </div>
            </div>

            {/* 수정 버튼 */}
            <button className="w-full mt-6 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onClick={handleEditClick}>
                수정 완료
            </button>
        </div>
</>
    );
};

export default EmployerDetailComponent;