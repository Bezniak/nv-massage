import React from 'react';
import PhotoCollection from "../PhotoCollection/PhotoCollection.jsx";
import {handleAddressClick} from "../../common/helpers.js";
import {IoLocation} from "react-icons/io5";
import {NavLink} from "react-router-dom";
import {LuPhone} from "react-icons/lu";
import {IoIosMail} from "react-icons/io";
import {FaSquareInstagram} from "react-icons/fa6";
import {FaTelegram, FaViber} from "react-icons/fa";
import Form from "../Form/Form.jsx";
import MetaTags from "../../common/MetaTags.jsx";
import {useTranslation} from "react-i18next";

const AboutUs = () => {
    const {t} = useTranslation();

    return (
        <>
            <MetaTags page="aboutUs"/>
            <div>
                <div className="h-screen relative flex items-center justify-center">
                    <img
                        src='/aboutUsBG.jpg'
                        alt='about Us img'
                        className="w-full h-full object-cover"
                    />
                    <div className="overlay"></div>
                    <div
                        className='container text-center w-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 text-soft-white'>
                        <h1 className="xs:text-2xl md:text-3xl">
                            {t("aboutUs.nv_massage_paradise")}
                        </h1>
                    </div>
                </div>

                <div className='bg-longListDown bg-bottom'>
                    <div className='md:container xs:p-4 mx-auto w-full mt-10 mb-8'>
                        <h2 className='xs:text-xl md:text-2xl text-center mb-10'>
                            {t("aboutUs.my_path_to_harmony")}
                        </h2>
                        <div className='flex md:flex-row xs:flex-col items-center md:gap-8 xs:gap-10'>
                            <div
                                className="max-w-xs bg-white border border-gray-200 rounded-lg shadow flex flex-col">
                                <img className="rounded-t-lg" src="/photo_1.jpg" alt="my photo"/>
                                <div className="p-4 text-center flex-grow flex flex-col justify-between">
                                    <h5 className="mb-1 text-xl font-semibold text-gray-900">
                                        {t("my_name")}
                                    </h5>
                                    <p className="mb-2 text-sm text-[var(--footer)] font-normal">
                                        {t("aboutUs.seo")}
                                    </p>
                                </div>
                            </div>
                            <p className='leading-10 text-justify'>
                                {t("aboutUs.about_me")}
                            </p>
                        </div>
                    </div>
                </div>

                <div>
                    <div className='md:container xs:p-4 mx-auto flex flex-col justify-center items-center'>
                        <h2 className='xs:text-xl md:text-2xl text-center mb-4'>
                            {t("aboutUs.my_achievements")}
                        </h2>
                        <p className='leading-10 text-justify h-full'>
                            {t("aboutUs.i_proud_to_present")}
                        </p>
                    </div>
                    <PhotoCollection extraImages={[
                        {id: 'extra-1', url: '/certificate-1.png', name: 'certificate-1'},
                        {id: 'extra-2', url: '/certificate-2.png', name: 'certificate-2'}
                    ]}/>
                </div>


                <div className='bg-twoUpList bg-bottom-left bg-no-repeat'>
                    <div
                        className='w-full max-w-7xl mx-auto mt-10 md:mb-20 xs:mb-10 px-3 flex md:flex-row xs:flex-col justify-around items-start'>
                        <div className='flex flex-col items-start'>
                            <h2 className='text-center text-2xl mb-5'>
                                {t("aboutUs.contact_us")}
                            </h2>
                            <h3 className='text-center'>
                                {t("aboutUs.interested_in_our_services")}
                            </h3>
                            <ul className='mt-8 flex flex-col items-start gap-3'>
                                <li onClick={handleAddressClick}
                                    className='mr-3 group flex items-center justify-center rounded'
                                >
                                    <IoLocation
                                        className='mr-3 text-lg text-[var(--active-dark)] group-hover:text-[var(--active)] transition'/>
                                    <NavLink to="" className='group-hover:text-[var(--active)] transition'>
                                        {t("address")}
                                    </NavLink>
                                </li>
                                <li className='group flex items-center justify-center rounded'>
                                    <LuPhone
                                        className='mr-3 text-lg text-[var(--active-dark)] group-hover:text-[var(--active)] transition'/>
                                    <NavLink to={`tel:+375336424878`}
                                             className='group-hover:text-[var(--active)] transition'>
                                        +375 33 642-48-78
                                    </NavLink>
                                </li>
                                <li className='group flex items-center justify-center rounded'>
                                    <IoIosMail
                                        className='mr-3 text-lg text-[var(--active-dark)] group-hover:text-[var(--active)] transition'/>
                                    <NavLink to={`mailto:baranovichimassage@gmail.com`}
                                             className='group-hover:text-[var(--active)] transition'>
                                        baranovichimassage@gmail.com
                                    </NavLink>
                                </li>
                            </ul>
                            <ul className='mx-auto mt-8 flex flex-row justify-center items-start gap-3'>
                                <li className='group flex items-center justify-center rounded'>
                                    <FaSquareInstagram
                                        className='mr-3 text-lg text-[var(--active-dark)] group-hover:text-[var(--active)] transition'/>
                                    <a href={`https://www.instagram.com/natali.massage_baranovichi/`}
                                       rel="noreferrer"
                                       target="_blank"
                                       className='group-hover:text-[var(--active)] transition'
                                    >
                                        Instagram
                                    </a>
                                </li>
                                <li className='group flex items-center justify-center rounded'>
                                    <FaTelegram
                                        className='mr-3 text-lg text-[var(--active-dark)] group-hover:text-[var(--active)] transition'/>
                                    <a
                                        href={`tg://resolve?domain=Natalia_NV_massage`}
                                        rel="noreferrer"
                                        target="_blank"
                                        className='group-hover:text-[var(--active)] transition'
                                    >
                                        Telegram
                                    </a>
                                </li>
                                <li className='group flex items-center justify-center rounded'>
                                    <FaViber
                                        className='mr-3 text-lg text-[var(--active-dark)] group-hover:text-[var(--active)] transition'/>
                                    <a href={`viber://chat?number=+375336424878`}
                                       rel="noreferrer"
                                       target="_blank"
                                       className='group-hover:text-[var(--active)] transition'
                                    >
                                        Viber
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <Form/>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AboutUs;