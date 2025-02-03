import { useState, useEffect } from 'react';

const useMapGeolocation = () => {
    const [currentLocation, setCurrentLocation] = useState({
        lat: 37.5666805,  // 기본값: 서울시청
        lng: 126.9784147
    });

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setCurrentLocation({
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    });
                },
                (error) => {
                    console.error('현재 위치를 가져올 수 없습니다:', error);
                }
            );
        }
    }, []);

    return { currentLocation };
};

export default useMapGeolocation;
