import React, {useEffect, useRef, useState} from 'react';
import ReviewForm from "./ReviewForm.jsx";
import useFetchAllData from "../../api/useFetchAllData.js";
import {Preloader} from "../../common/Preloader/Preloader.jsx";
import MetaTags from "../../common/MetaTags.jsx";
import {useTranslation} from "react-i18next";

const Reviews = () => {
    const {t} = useTranslation();
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [visibleReviews, setVisibleReviews] = useState(10);
    const {data, loading, error} = useFetchAllData(`/reviews?populate=*`);
    const loaderRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                setVisibleReviews((prev) => prev + 5);
            }
        }, {
            threshold: 1.0,
        });

        if (loaderRef.current) {
            observer.observe(loaderRef.current);
        }

        return () => {
            if (loaderRef.current) {
                observer.unobserve(loaderRef.current);
            }
        };
    }, []);

    const sortedReviews = data ? [...data].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) : [];

    return (
        <>
            <MetaTags page="reviews"/>
            <div>
                <div className="h-screen relative flex items-center justify-center">
                    <img
                        src='/review.jpg'
                        alt='review img'
                        className="w-full h-full object-cover"
                    />
                    <div className="overlay"></div>
                    <div
                        className='container text-center w-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 text-soft-white'>
                        <h1 className="xs:text-2xl md:text-3xl">
                            {t("footer.reviews")}
                        </h1>
                        <p className='mt-8 text-center'>
                            {t("reviewForm.your_opinion_important")}
                        </p>
                    </div>
                </div>
                <div className='container mx-auto w-full mt-10 mb-8 text-center'>
                    <h2 className='xs:text-xl md:text-2xl text-center mb-10 mt-10'>
                        {t("reviewForm.reviews_way_experience")}
                    </h2>
                    {!isFormVisible && (
                        <div className="flex justify-center">
                            <button
                                className='w-fit bg-[#9c776c] text-white py-3 px-6 rounded hover:bg-[#8b6a60] transition'
                                onClick={() => setIsFormVisible(true)}
                            >
                                {t("reviewForm.add_review")}
                            </button>
                        </div>
                    )}
                    {isFormVisible && <ReviewForm/>}
                </div>

                {/* Reviews Section */}
                <div className='md:container xs:p-4 mx-auto'>
                    {loading && <Preloader/>}
                    {error && <p>{t("error_loading_data")}</p>}
                    {!loading && data &&
                        sortedReviews.slice(0, visibleReviews).map((review) => (
                            <div key={review.id} className="p-4 rounded-md mb-4">
                                <div className="flex flex-col items-start gap-2">
                                    <div className="flex gap-1">
                                        {Array(5).fill(0).map((_, i) => (
                                            <span
                                                key={i}
                                                className={`text-xl ${i < review.grade ? 'text-[#ffc107]' : 'text-gray-300'}`}
                                            >
                                                ★
                                            </span>
                                        ))}
                                    </div>
                                    <h4 className="font-bold">{review.name}</h4>
                                    <p className="text-sm text-gray-500 mb-2">{new Date(review.createdAt).toLocaleDateString()}</p>
                                </div>
                                <p className='text-justify text-lg'>{review.comment}</p>
                            </div>
                        ))}
                </div>

                <div ref={loaderRef} className='h-10 flex justify-center items-center'>
                    {loading && <Preloader/>}
                </div>

                <div className='container mx-auto md:mt-20 md:mb-20 xs:mb-10'>
                    <h2 className='text-center font-semibold text-sm mb-3'>
                        {t("reviewForm.not_publish_reviews")}
                    </h2>
                    <ul className='text-xs'>
                        <li>{t("reviewForm.rule_1")}</li>
                        <li>{t("reviewForm.rule_2")}</li>
                        <li>{t("reviewForm.rule_3")}</li>
                        <li>{t("reviewForm.rule_4")}</li>
                        <li>{t("reviewForm.rule_5")}</li>
                        <li>{t("reviewForm.rule_6")}</li>
                        <li>{t("reviewForm.rule_7")}</li>
                        <li>{t("reviewForm.rule_8")}</li>
                        <li>{t("reviewForm.rule_9")}</li>
                        <li>{t("reviewForm.rule_10")}</li>
                        <li>{t("reviewForm.rule_11")}</li>
                    </ul>
                    <p className='text-center text-sm mt-3 mb-3'>
                        {t("reviewForm.incoming_information")}
                    </p>
                    <p className='text-center text-sm'>
                        {t("reviewForm.review_verification")}
                    </p>
                </div>
            </div>
        </>
    );
};

export default Reviews;
