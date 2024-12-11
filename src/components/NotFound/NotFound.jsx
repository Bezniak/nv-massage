import React from 'react';
import {NavLink} from "react-router-dom";
import {ROUTES} from "../../config/routes.js";
import {useTranslation} from "react-i18next";

const NotFound = () => {
    const {t} = useTranslation();


    return (
        <div className="h-screen relative flex items-center justify-center">
            <img
                src='/notFound.jpg'
                alt='not found'
                className="w-full h-full object-cover"
            />
            <div className="overlay"></div>
            <div
                className='container text-center w-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 text-soft-white'>
                <h1 className="xs:text-2xl md:text-3xl">
                    404
                </h1>
                <p className='mt-8 text-lg mx-auto mb-10'>
                    {t("notFound.page_not_found")}
                </p>
                <NavLink to={ROUTES.HOME}
                         className="w-fit bg-[#9c776c] text-center mt-3 text-white py-3 px-6 rounded hover:bg-[#8b6a60] transition">
                    {t("notFound.to_the_main_page")}
                </NavLink>
            </div>
        </div>
    );
};

export default NotFound;