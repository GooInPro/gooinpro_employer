import { Container as MapDiv, NaverMap, Marker } from 'react-naver-maps';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import employerStore from '../../stores/employerStore';

const MapIndexPage = () => {
    const navigate = useNavigate();
    const { eno } = employerStore();
    const [workplaceLocation, setWorkplaceLocation] = useState(null);

    useEffect(() => {
        if (!eno) {
            console.log('[DEBUG] eno is not set');
            return;
        }
        console.log('[DEBUG] eno:', eno);

        // 1) eno로 근무지 주소 조회
        axios.get(`/api/map/workplace/${eno}`)
            .then(async (res) => {
                console.log('[DEBUG] Received workplace data:', res.data);
                const { wroadAddress } = res.data;
                console.log('[DEBUG] wroadAddress:', wroadAddress);

                // 2) 백엔드 프록시 엔드포인트 호출 (주소 → 좌표 변환)
                return axios.get('/api/map/geocode', { params: { query: wroadAddress } });
            })
            .then(geocodeRes => {
                console.log('[DEBUG] Geocode response:', geocodeRes.data);
                const { addresses } = geocodeRes.data;
                if (addresses && addresses.length > 0) {
                    const { x: lng, y: lat } = addresses[0];
                    console.log('[DEBUG] Parsed coordinates:', lat, lng);
                    setWorkplaceLocation({ lat: parseFloat(lat), lng: parseFloat(lng) });
                } else {
                    console.error('[DEBUG] 주소를 좌표로 변환할 결과가 없습니다.');
                }
            })
            .catch(err => {
                if (err.response?.status === 404) {
                    console.warn('[DEBUG] 근무지 정보가 없으므로 근무지 등록 페이지로 이동');
                    navigate('/workplace/register'); // 근무지 등록 페이지로 이동
                } else {
                    console.error('[DEBUG] API 호출 실패:', err);
                }
            });
    }, [eno, navigate]);

    return (
        <MapDiv style={{ width: '100%', height: '100vh' }}>
            {workplaceLocation ? (
                <NaverMap defaultCenter={workplaceLocation} defaultZoom={14}>
                    <Marker position={workplaceLocation} animation={2} />
                </NaverMap>
            ) : (
                <div>Loading...</div>
            )}
        </MapDiv>
    );
};

export default MapIndexPage;
