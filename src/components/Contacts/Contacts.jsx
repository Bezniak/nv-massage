import React from 'react';
import {handleAddressClick} from "../../common/helpers.js";
import {IoLocation} from "react-icons/io5";
import {NavLink} from "react-router-dom";
import {LuPhone} from "react-icons/lu";
import {IoIosMail} from "react-icons/io";
import {FaFacebook, FaSquareInstagram} from "react-icons/fa6";
import {FaLinkedin, FaTelegram, FaTiktok, FaViber} from "react-icons/fa";
import Map from "./Map.jsx";
import MetaTags from "../../common/MetaTags.jsx";
import {useTranslation} from "react-i18next";

const Contacts = () => {
    const {t} = useTranslation();


    return (
        <>
            <MetaTags page="contacts"/>
            <div>
                <div className="h-screen relative flex items-center justify-center">
                    <img
                        src='/locations.jpg'
                        alt='faq img'
                        className="w-full h-full object-cover"
                    />
                    <div className="overlay"></div>
                    <div
                        className='container text-center w-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 text-soft-white'>
                        <h1 className="xs:text-2xl md:text-3xl">
                            {t("contacts.contacts")}
                        </h1>
                    </div>
                </div>
                <div
                    className='md:container xs:p-4 mt-10 mb-32 md:w-10/12 mx-auto flex md:flex-row xs:flex-col justify-center items-start md:gap-20'>
                    <div className='flex flex-1 flex-col items-start justify-start'>
                        <div className='mx-auto'>
                            <h2 className='text-2xl text-center'>
                                {t("contacts.location")}
                            </h2>
                            <ul className='mt-8 flex flex-col items-start gap-3'>
                                <li onClick={handleAddressClick}
                                    className='mr-3 group flex items-center justify-center rounded'
                                >
                                    <IoLocation
                                        className='mr-3 text-lg text-[var(--footer)] group-hover:text-[var(--active)] transition'/>
                                    <NavLink to="" className='group-hover:text-[var(--active)] transition'>
                                        {t("address")}
                                    </NavLink>
                                </li>
                                <li className='group flex items-center justify-center rounded'>
                                    <LuPhone
                                        className='mr-3 text-lg text-[var(--footer)] group-hover:text-[var(--active)] transition'/>
                                    <NavLink to={`tel:+375336424878`}
                                             className='group-hover:text-[var(--active)] transition'>
                                        +375 33 642-48-78
                                    </NavLink>
                                </li>
                                <li className='group flex items-center justify-center rounded'>
                                    <IoIosMail
                                        className='mr-3 text-lg text-[var(--footer)] group-hover:text-[var(--active)] transition'/>
                                    <NavLink to={`mailto:baranovichimassage@gmail.com`}
                                             className='group-hover:text-[var(--active)] transition'>
                                        baranovichimassage@gmail.com
                                    </NavLink>
                                </li>
                            </ul>
                        </div>
                        <div className='mx-auto'>
                            <h2 className='text-2xl text-center mt-10 mb-8'>
                                {t("contacts.join_us_on_social_media")}
                            </h2>
                            <ul className='flex flex-row justify-between text-2xl text-[var(--footer)]'>
                                <li>
                                    <a
                                        className='hover:text-[var(--active)] transition'
                                        href="https://www.facebook.com/profile.php?id=100059235169418"
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        <FaFacebook/>
                                    </a>
                                </li>
                                <li>
                                    <a
                                        className='hover:text-[var(--active)] transition'
                                        href="https://www.instagram.com/natali.massage_baranovichi/"
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        <FaSquareInstagram/>
                                    </a>
                                </li>
                                <li>
                                    <a
                                        className='hover:text-[var(--active)] transition'
                                        href="https://www.linkedin.com/in/%D0%BD%D0%B0%D1%82%D0%B0%D0%BB%D1%8C%D1%8F-%D0%B2%D0%B8%D0%BA%D1%82%D0%BE%D1%80%D0%BE%D0%B2%D0%BD%D0%B0-78baa82b0/"
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        <FaLinkedin/>
                                    </a>
                                </li>
                                <li>
                                    <a
                                        className='hover:text-[var(--active)] transition'
                                        href="https://www.tiktok.com/@massage_baranovichi?_t=8kjALrIXlpt&_r=1"
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        <FaTiktok/>
                                    </a>
                                </li>
                                <li>
                                    <a
                                        className='hover:text-[var(--active)] transition'
                                        href="https://t.me/NV_massage_baranovichi"
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        <FaTelegram/>
                                    </a>
                                </li>
                                <li>
                                    <a
                                        className='hover:text-[var(--active)] transition'
                                        href="https://invite.viber.com/?number=%2B375336424878"
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        <FaViber/>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className='flex-1 mx-auto'>
                        <h2 className='text-2xl text-center mb-5 mt-10'>
                            {t("contacts.opening_hours")}
                        </h2>
                        <div className='flex justify-center gap-20'>
                            <ul>
                                <li>{t("contacts.monday")}</li>
                                <li>{t("contacts.tuesday")}</li>
                                <li>{t("contacts.wednesday")}</li>
                                <li>{t("contacts.thursday")}</li>
                                <li>{t("contacts.friday")}</li>
                                <li>{t("contacts.saturday")}</li>
                                <li>{t("contacts.sunday")}</li>
                            </ul>
                            <ul>
                                <li>09:00 - 17:30</li>
                                <li>09:00 - 17:30</li>
                                <li>09:00 - 17:30</li>
                                <li>09:00 - 17:30</li>
                                <li>09:00 - 17:30</li>
                                <li>09:00 - 17:30</li>
                                <li>09:00 - 17:30</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <Map/>
            </div>
        </>
    );
};

export default Contacts;