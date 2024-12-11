import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import './PhotoCollection.css';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import { EffectCoverflow, Navigation, Pagination } from "swiper/modules";
import { Preloader } from "../../common/Preloader/Preloader.jsx";
import { useTranslation } from "react-i18next";

export default function PhotoCollection({ data = [], loading, error, title, extraImages = [] }) {
    const { t } = useTranslation();

    // // Локальный массив изображений по умолчанию
    // const defaultImages = Array.from({length: 11}, (_, i) => ({
    //     id: `local-${i + 1}`,
    //     url: `/photo_${i + 1}.jpg`,
    //     name: `Photo ${i + 1}`
    // }));

    // Локальный массив изображений по умолчанию
    const defaultImages = [
        { id: 'local-1', url: '/photo_1.jpg', name: 'Photo 1' },
        { id: 'local-2', url: '/photo_2.jpg', name: 'Photo 2' },
        { id: 'local-3', url: '/photo_3.jpg', name: 'Photo 3' },
        { id: 'local-4', url: '/photo_4.jpg', name: 'Photo 4' },
        { id: 'local-5', url: '/photo_5.jpg', name: 'Photo 5' },
        { id: 'local-6', url: '/photo_6.jpg', name: 'Photo 6' },
        { id: 'local-7', url: '/photo_7.jpg', name: 'Photo 7' },
        { id: 'local-8', url: '/photo_8.jpg', name: 'Photo 8' },
        { id: 'local-9', url: '/photo_9.jpg', name: 'Photo 9' },
        { id: 'local-10', url: '/photo_10.jpg', name: 'Photo 10' },
        { id: 'local-11', url: '/photo_11.jpg', name: 'Photo 11' },
    ];

    // Определяем массив изображений для отображения на основе приоритета
    const images =
        extraImages.length > 0
            ? extraImages
            : data.length > 0
                ? data.map(image => ({
                    id: image.id,
                    url: `${import.meta.env.VITE_UPLOAD_URL}${image.url}`,
                    name: image.name || `Image ${image.id}`
                }))
                : defaultImages;

    return (
        <div className="photoCollection">
            <h1 className="xs:text-2xl md:text-3xl text-center container">
                {title}
            </h1>

            {/* Состояние загрузки */}
            {loading && <Preloader />}

            {/* Обработка ошибки */}
            {error && (
                <div className="error">
                    {t("error_loading_data")}: {error.message || t("something_went_wrong")}
                </div>
            )}

            {/* Отображение карусели */}
            {!loading && !error && (
                <Swiper
                    effect={'coverflow'}
                    grabCursor={true}
                    centeredSlides={true}
                    slidesPerView={'auto'}
                    coverflowEffect={{
                        rotate: 50,
                        stretch: 0,
                        depth: 100,
                        modifier: 1,
                        slideShadows: true,
                    }}
                    navigation={true}
                    pagination={{
                        clickable: true,
                    }}
                    modules={[EffectCoverflow, Pagination, Navigation]}
                    className="mySwiper2"
                >
                    {images.map((image) => (
                        <SwiperSlide key={image.id}>
                            <img
                                src={image.url}
                                alt={image.name}
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
            )}
        </div>
    );
}
