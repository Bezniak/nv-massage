import React, {useEffect, useState} from 'react';
import {Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import {Autoplay, Navigation, Pagination} from 'swiper/modules';
import {Preloader} from '../../common/Preloader/Preloader';
import './Slider.css';
import {useTranslation} from "react-i18next";

export default function Slider() {
    const {t} = useTranslation();
    const desktopImages = ['/slider_1.jpg', '/slider_2.jpg', '/slider_3.jpg'];
    const mobileImages = ['/slider_mobile_3.jpg', '/slider_mobile_2.jpg', '/slider_mobile_1.jpg'];
    const [imagesLoaded, setImagesLoaded] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        // Определяем, является ли устройство мобильным
        const handleResize = () => {
            setIsMobile(window.matchMedia('(max-width: 768px)').matches);
        };
        handleResize(); // Проверка при загрузке
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const images = isMobile ? mobileImages : desktopImages;

    useEffect(() => {
        const imagePromises = images.map((imagePath) => {
            return new Promise((resolve) => {
                const image = new Image();
                image.onload = resolve;
                image.src = imagePath;
            });
        });

        Promise.all(imagePromises).then(() => {
            setImagesLoaded(true);
        });
    }, [images]);

    return (
        <div className="relative overflow-hidden w-screen h-screen">
            {!imagesLoaded ? (
                <Preloader/>
            ) : (
                <>
                    <h1 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 text-soft-white xs:text-4xl md:text-6xl text-center">
                        {t("professional_massage")}
                    </h1>

                    <Swiper
                        spaceBetween={0}
                        centeredSlides={true}
                        loop={true}
                        autoplay={{
                            delay: 4000,
                            disableOnInteraction: false,
                        }}
                        pagination={{
                            clickable: true,
                        }}
                        navigation={false}
                        modules={[Autoplay, Pagination, Navigation]}
                        effect="slide"
                        speed={3000}
                        className="w-full h-full"
                    >
                        {images.map((image, index) => (
                            <SwiperSlide key={index}>
                                <div className="relative w-full h-screen">
                                    <div className="overlay"></div>
                                    <img
                                        src={image}
                                        alt={`slide ${index + 1}`}
                                        className="relative w-full h-full object-cover"
                                    />
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </>
            )}
        </div>
    );
}
