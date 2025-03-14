import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
    plugins: [
        react(),
        VitePWA({
            registerType: 'autoUpdate', // 서비스 워커 자동 업데이트
            devOptions: {
                enabled: true, // 개발 환경에서도 PWA 테스트 가능
            },
            manifest: {
                name: 'GooInPro_Employer',
                short_name: 'GooInPro_Employer',
                description: 'GooInPro for Employer',
                theme_color: '#3393EA',
                icons: [
                    {
                        src: '/icons/192_Icon.png',
                        sizes: '192x192',
                        type: 'image/png',
                    },
                    {
                        src: '/icons/512_Icon.png',
                        sizes: '512x512',
                        type: 'image/png',
                    },
                ],
            },
            workbox: {
                globDirectory: 'dist', // 빌드된 파일이 있는 폴더
                globPatterns: ['**/*.{js,css,html,ico,png,svg,webp}'], // 캐싱할 파일들
                globIgnores: ['workbox-*.js', 'sw.js'], // 필요 없는 파일 제외
                runtimeCaching: [
                    {
                        urlPattern: ({ request }) => request.destination === 'document',
                        handler: 'NetworkFirst',
                        options: {
                            cacheName: 'html-cache',
                            expiration: {
                                maxEntries: 10,
                                maxAgeSeconds: 24 * 60 * 60, // 1일
                            },
                        },
                    },
                    {
                        urlPattern: ({ request }) => request.destination === 'script' || request.destination === 'style',
                        handler: 'StaleWhileRevalidate',
                        options: {
                            cacheName: 'static-cache',
                            expiration: {
                                maxEntries: 50,
                                maxAgeSeconds: 7 * 24 * 60 * 60, // 1주일
                            },
                        },
                    },
                    {
                        urlPattern: ({ request }) => request.destination === 'image',
                        handler: 'CacheFirst',
                        options: {
                            cacheName: 'image-cache',
                            expiration: {
                                maxEntries: 100,
                                maxAgeSeconds: 30 * 24 * 60 * 60, // 30일
                            },
                        },
                    },
                ],
            },
        }),
    ],
    define: {
        global: {},
    },
    server: {
        host: "0.0.0.0",
        port: 5173,
    },
});
