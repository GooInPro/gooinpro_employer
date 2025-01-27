import employerStore from "../../stores/employerStore.js";
import { useEffect, useState } from "react";
import { EmployerRead } from "../../api/employerapi/employerAPI.js";

const EmployerDetailComponent = () => {
    const eno = employerStore(state => state.eno);

    const accessToken = employerStore(state => state.accessToken);

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

    useEffect(() => {
        EmployerRead(eno).then((data) => {
            console.log(data.data);
            setFormData({
                ename: data.data.ename,
                eemail: data.data.eemail,
                ebirth: data.data.ebirth,
            });
        });
    }, [eno]);

    return (
        <>
            <div className="mb-6">
                <div>
                    {accessToken}
                </div>
                <label htmlFor="ename" className="block text-lg font-medium text-gray-700 mb-2">
                    이름
                </label>
                <input
                    id="ename"
                    type="text"
                    name="ename"
                    value={formData.ename}
                    onChange={handleChange}
                    className="w-full px-4 py-3 text-gray-900 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-100"
                    placeholder="이름을 입력하세요"
                />
            </div>

            <div className="mb-6">
                <label htmlFor="eemail" className="block text-lg font-medium text-gray-700 mb-2">
                    이메일
                </label>
                <input
                    id="eemail"
                    type="email"
                    name="eemail"
                    value={formData.eemail}
                    onChange={handleChange}
                    className="w-full px-4 py-3 text-gray-900 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-100"
                    placeholder="이메일을 입력하세요"
                />
            </div>

            <div className="mb-6">
                <label htmlFor="ebirth" className="block text-lg font-medium text-gray-700 mb-2">
                    생년월일
                </label>
                <input
                    id="ebirth"
                    type="date"
                    name="ebirth"
                    value={formData.ebirth}
                    onChange={handleChange}
                    className="w-full px-4 py-3 text-gray-900 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-100"
                    placeholder="생년월일을 입력하세요"
                />
            </div>
        </>
    );
};

export default EmployerDetailComponent;