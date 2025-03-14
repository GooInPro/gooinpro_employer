import { Container as MapDiv, NaverMap, Marker } from 'react-naver-maps';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import employerStore from '../../stores/employerStore';
import { getAllWorkplaces, geocodeAddress } from '../../api/mapapi/mapapi';
import CommonTableComponent from '../../common/CommonTableComponent';

const MapSearchPage = () => {
    const navigate = useNavigate();
    const { eno } = employerStore();
    const [workplaceCenter, setWorkplaceCenter] = useState(null);
    const [myWorkplaceInfo, setMyWorkplaceInfo] = useState([]);
    const [otherWorkplaces, setOtherWorkplaces] = useState([]);

    // 테이블 헤더와 컬럼 정의
    const tableHeader = ["공고명", "근무지 주소", "시급", "마감일"];
    const column = ["wpno", "jpname", "wroadAddress", "jphourlyRate", "jpenddate"];

    // 리스트 조회 함수
    const getWorkplaceList = async (page) => {
        try {
            const data = await getAllWorkplaces();
            console.log("[DEBUG] table.... getWorkplaceList raw data:", data);

            // 페이지당 10개씩 표시
            const itemsPerPage = 10;
            const totalItems = data.length;
            const totalPages = Math.ceil(totalItems / itemsPerPage);

            // 현재 페이지의 데이터만 슬라이싱
            const startIndex = (page - 1) * itemsPerPage;
            const endIndex = startIndex + itemsPerPage;
            const paginatedData = data.slice(startIndex, endIndex);

            console.log("[DEBUG] table.... Paginated data:", paginatedData);
            console.log("[DEBUG] table.... Column data available:", paginatedData.map(item => ({
                jpname: item.jpname,
                wroadAddress: item.wroadAddress,
                jphourlyRate: item.jphourlyRate,
                jpregdate: item.jpregdate,
                jpenddate: item.jpenddate
            })));  // 각 필드의 실제 데이터 확인

            // 페이지 번호 배열 생성
            const pageNumList = Array.from({length: totalPages}, (_, i) => i + 1);

            return {
                dtoList: paginatedData,
                totalPage: totalPages,
                pageNumList: pageNumList,
                current: parseInt(page),
                next: page < totalPages,
                prev: page > 1,
                nextPage: page < totalPages ? parseInt(page) + 1 : null,
                prevPage: page > 1 ? parseInt(page) - 1 : null
            };
        } catch (error) {
            console.error("[DEBUG] 근무지 목록 조회 실패:", error);
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

    // 로그인 사용자의 모든 근무지 정보 가져오기
    useEffect(() => {
        if (!eno) {
            console.log('[DEBUG] eno is not set');
            return;
        }

        getAllWorkplaces()
            .then(async (data) => {
                // 로그인한 사용자의 근무지만 필터링
                const myWorkplaces = data.filter(wp => wp.eno === eno);
                console.log('[DEBUG] My workplaces:', myWorkplaces);

                // 각 근무지의 좌표 변환
                const myWorkplacesWithCoords = await Promise.all(
                    myWorkplaces.map(async (wp) => {
                        try {
                            const coords = await geocodeAddress(wp.wroadAddress);
                            return { ...wp, lat: coords.lat, lng: coords.lng };
                        } catch (e) {
                            return null;
                        }
                    })
                );

                // null이 아닌 결과만 필터링
                const validWorkplaces = myWorkplacesWithCoords.filter(wp => wp !== null);

                // 가장 최근 근무지(wpno가 가장 큰)의 좌표를 지도 중심으로 설정
                if (validWorkplaces.length > 0) {
                    const latestWorkplace = validWorkplaces.reduce((prev, current) =>
                        (prev.wpno > current.wpno) ? prev : current
                    );
                    setWorkplaceCenter({ lat: latestWorkplace.lat, lng: latestWorkplace.lng });
                }

                setMyWorkplaceInfo(validWorkplaces);
            })
            .catch(err => {
                console.error('[DEBUG] API 호출 실패:', err);
            });
    }, [eno, navigate]);

    // 다른 사용자들의 근무지 정보 가져오기
    useEffect(() => {
        getAllWorkplaces()
            .then(async (data) => {
                // 다른 사용자의 근무지만 필터링
                const otherWorkplaces = data.filter(wp => wp.eno !== eno);

                const workplacesWithCoords = await Promise.all(
                    otherWorkplaces.map(async (wp) => {
                        try {
                            const coords = await geocodeAddress(wp.wroadAddress);
                            return { ...wp, lat: coords.lat, lng: coords.lng };
                        } catch (e) {
                            return null;
                        }
                    })
                );
                setOtherWorkplaces(workplacesWithCoords.filter(wp => wp !== null));
            })
            .catch(err => {
                console.error("[DEBUG] 전체 근무지 조회 실패:", err);
            });
    }, [eno]);

    return (
        <div className="flex flex-col h-screen">
            <div className="h-1/2">
                <MapDiv style={{ width: '100%', height: '100%' }}>
                    {workplaceCenter ? (
                        <NaverMap
                            defaultCenter={workplaceCenter}
                            defaultZoom={14}
                        >
                            {/* 로그인 사용자의 마커들 (파란색) */}
                            {myWorkplaceInfo.map((wp, idx) => (
                                <Marker
                                    key={`my-${idx}`}
                                    position={{ lat: wp.lat, lng: wp.lng }}
                                    title={`내 근무지: ${wp.wdetailAddress} - ${wp.wroadAddress}`}
                                    icon={{
                                        content: '<div style="background-color: #0066FF; width: 15px; height: 15px; border-radius: 50%;"></div>'
                                    }}
                                />
                            ))}

                            {/* 다른 사용자들의 마커 (초록색) */}
                            {otherWorkplaces.map((wp, idx) => (
                                <Marker
                                    key={`other-${idx}`}
                                    position={{ lat: wp.lat, lng: wp.lng }}
                                    title={`${wp.wdetailAddress} - ${wp.wroadAddress}`}
                                    icon={{
                                        content: '<div style="background-color: #00FF00; width: 15px; height: 15px; border-radius: 50%;"></div>'
                                    }}
                                />
                            ))}
                        </NaverMap>
                    ) : (
                        <div>Loading...</div>
                    )}
                </MapDiv>
            </div>
            <div className="h-1/3 overflow-auto">
                <CommonTableComponent
                    name="workplace"
                    tableHeader={tableHeader}
                    column={column}
                    listFn={getWorkplaceList}
                />
            </div>
        </div>
    );
};

export default MapSearchPage;
