import React from 'react';
import Button from "../../common/Button/Button.jsx";
import MetaTags from "../../common/MetaTags.jsx";
import {useTranslation} from "react-i18next";

const MemberShip = () => {
    const {t} = useTranslation();


    return (
        <>
            <MetaTags page="membership"/>
            <div>
                <div className="h-screen relative flex items-center justify-center">
                    <img
                        src='/memberShip.jpg'
                        alt='memberShip img'
                        className="w-full h-full object-cover"
                    />
                    <div className="overlay"></div>
                    <div
                        className='container text-center w-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 text-soft-white'>
                        <h1 className="xs:text-2xl md:text-3xl">
                            {t("memberShip.unique_certificates_subscriptions")}
                        </h1>
                        <p className='mt-8 text-center text-lg'>
                            {t("memberShip.find_perfect_gift")}
                        </p>
                    </div>
                </div>

                <div className='md:container xs:p-4 mx-auto md:mt-20 xs:mt-10 mb-20'>
                    <div
                        className='flex md:flex-row xs:flex-col items-center justify-center md:gap-20 xs:gap-10 md:mb-20 xs:mb-10'>
                        <div className='flex-1'>
                            <img src="/sertificateImg.png" alt="sertificate img"
                                 className='w-full h-full object-cover rounded-lg'/>
                        </div>
                        <div className='flex-1'>
                            <h2 className='text-2xl text-center mb-8'>
                                {t("memberShip.give_the_gift_of_care")}
                            </h2>
                            <p className='text-lg text-justify leading-10'>
                                {t("memberShip.certificate_great_way_show_care")}
                            </p>
                        </div>
                    </div>

                    <div
                        className='flex md:flex-row xs:flex-col items-center justify-center md:gap-20 xs:gap-10 md:mb-20 xs:mb-10'>
                        <div className='flex-1'>
                            <h2 className='text-2xl text-center mb-8'>
                                {t("memberShip.regular_massage_sessions")}
                            </h2>
                            <p className='text-lg text-justify leading-10'>
                                {t("memberShip.subscriptions_provide_opportunity")}
                            </p>
                        </div>
                        <div className='flex-1'>
                            <img src="/subscriptionImg.png" alt="subscription img"
                                 className='w-full h-full object-cover rounded-lg'/>
                        </div>
                    </div>

                    <p className='text-lg md:text-center xs:text-justify leading-10 md:mb-20 xs:mb-10'>
                        {t("memberShip.purchasing_certificates_and_subscriptions")}
                    </p>

                    <div className='text-center'>
                        <Button content={t("memberShip.book_now")} color={'black'}/>
                    </div>
                </div>
            </div>
        </>
    );
};

export default MemberShip;