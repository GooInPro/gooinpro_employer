import { Container as MapDiv, NaverMap, Marker } from 'react-naver-maps';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import employerStore from '../../stores/employerStore';
import { getAllWorkplaces, geocodeAddress } from '../../api/mapapi/mapapi';
import { listJobPostings } from '../../api/jobpostingapi/jobpostingapi';
import CommonTableComponent from '../../common/CommonTableComponent';

const MapSearchPage = () => {
    const navigate = useNavigate();
    const { eno } = employerStore();
    const [workplaceCenter, setWorkplaceCenter] = useState(null);
    const [myWorkplaceInfo, setMyWorkplaceInfo] = useState([]);
    const [otherWorkplaces, setOtherWorkplaces] = useState([]);

    const tableHeader = ["공고 명", "공고 상세", "주소", "시급", "모집 기간"];
    const column = ["jpname", "jpcontent", "WorkPlace.wroadAddress", "jphourlyRate", "jpminDuration"];

    const getJobPostingList = async (page) => {
        try {
            const response = await listJobPostings(eno);
            const data = response.data || [];

            // 페이지네이션 로직
            const itemsPerPage = 10;
            const totalItems = data.length;
            const totalPages = Math.ceil(totalItems / itemsPerPage);
            const startIndex = (page - 1) * itemsPerPage;
            const endIndex = startIndex + itemsPerPage;
            const paginatedData = data.slice(startIndex, endIndex);

            return {
                dtoList: paginatedData,
                totalPage: totalPages,
                pageNumList: Array.from({ length: totalPages }, (_, i) => i + 1),
                current: parseInt(page),
                next: page < totalPages,
                prev: page > 1,
                nextPage: page < totalPages ? parseInt(page) + 1 : null,
                prevPage: page > 1 ? parseInt(page) - 1 : null
            };
        } catch (error) {
            console.error("[ERROR] 구인공고 목록 조회 실패:", error);
            return {
                dtoList: [],
                totalPage: 0,
                pageNumList: [],
                current: 1,
                next: false,
                prev: false,
                nextPage: null,
                prevPage: null
            };
        }
    };

    useEffect(() => {
        if (!eno) return;

        getAllWorkplaces()
            .then(async (data) => {
                const myWorkplaces = data.filter(wp => wp.eno === eno);
                const workplacesWithCoords = await Promise.all(
                    myWorkplaces.map(async (wp) => {
                        try {
                            const coords = await geocodeAddress(wp.wroadAddress);
                            return { ...wp, lat: coords.lat, lng: coords.lng };
                        } catch {
                            return null;
                        }
                    })
                );

                const validWorkplaces = workplacesWithCoords.filter(Boolean);

                if (validWorkplaces.length > 0) {
                    const latest = validWorkplaces.reduce((a, b) => a.wpno > b.wpno ? a : b);
                    setWorkplaceCenter({ lat: latest.lat, lng: latest.lng });
                } else {
                    setWorkplaceCenter({ lat: 35.1795543, lng: 129.0756416 });
                }

                setMyWorkplaceInfo(validWorkplaces);
            })
            .catch(err => {
                console.error('[ERROR] 근무지 정보 조회 실패:', err);
            });
    }, [eno]);

    useEffect(() => {
        getAllWorkplaces()
            .then(async (data) => {
                const otherWorkplaces = data.filter(wp => wp.eno !== eno);
                const workplacesWithCoords = await Promise.all(
                    otherWorkplaces.map(async (wp) => {
                        try {
                            const coords = await geocodeAddress(wp.wroadAddress);
                            return { ...wp, lat: coords.lat, lng: coords.lng };
                        } catch {
                            return null;
                        }
                    })
                );

                setOtherWorkplaces(workplacesWithCoords.filter(Boolean));
            })
            .catch(err => {
                console.error("[ERROR] 전체 근무지 조회 실패:", err);
            });
    }, [eno]);

    return (
        <div className="flex flex-col h-screen">
            <div className="h-1/2">
                <MapDiv style={{ width: '100%', height: '100%' }}>
                    {workplaceCenter ? (
                        <NaverMap defaultCenter={workplaceCenter} defaultZoom={14}>
                            {myWorkplaceInfo.map((wp) => (
                                <Marker
                                    key={`my-${wp.wpno}`}
                                    position={{ lat: wp.lat, lng: wp.lng }}
                                    title={`${wp.wdetailAddress} - ${wp.wroadAddress}`}
                                    icon={{
                                        content: '<div style="background-color: #0066FF; width: 15px; height: 15px; border-radius: 50%;"></div>'
                                    }}
                                />
                            ))}
                            {otherWorkplaces.map((wp) => (
                                <Marker
                                    key={`other-${wp.wpno}`}
                                    position={{ lat: wp.lat, lng: wp.lng }}
                                    title={`${wp.wdetailAddress} - ${wp.wroadAddress}`}
                                    icon={{
                                        content: '<div style="background-color: #00FF00; width: 15px; height: 15px; border-radius: 50%;"></div>'
                                    }}
                                />
                            ))}
                        </NaverMap>
                    ) : (
                        <div>지도 로딩 중...</div>
                    )}
                </MapDiv>
            </div>

            <div className="h-1/3 overflow-auto">
                <CommonTableComponent
                    name="jobposting"
                    tableHeader={tableHeader}
                    column={column}
                    listFn={getJobPostingList}
                />
            </div>
        </div>
    );
};

export default MapSearchPage;
