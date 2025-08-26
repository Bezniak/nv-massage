import React from 'react';
import {NavLink} from "react-router-dom";
import {ROUTES} from "../../config/routes.js";
import {FaFacebook, FaSquareInstagram} from "react-icons/fa6";
import {FaLinkedin, FaTelegram, FaTiktok, FaViber} from "react-icons/fa";
import {useAuth} from "../../context/AuthContext.jsx";
import useFetchAllData from "../../api/useFetchAllData.js";
import {handleClick} from "../../common/helpers.js";
import {useTranslation} from "react-i18next";
import {Preloader} from "../../common/Preloader/Preloader.jsx";

const Footer = () => {
    const {t} = useTranslation();
    const {locale} = useAuth();
    const {data, loading, error} = useFetchAllData(`/massages?locale=${locale}&populate=*`);
    const currentYear = new Date().getFullYear();

    if (loading) {
        return <Preloader/>
    }

    if (error) {
        return (
            <div className="h-screen flex items-center justify-center">
                <p className="text-xl text-red-500">
                    {t("an_error_occurred")}
                    {error.message || t("loading_error")}
                </p>
            </div>
        );
    }

    return (
        <div className="w-full bg-[var(--footer)] pt-10 pb-5">
            <div className='container mx-auto w-full flex md:flex-row xs:flex-col justify-between items-start'>
                <div>
                    <NavLink to={ROUTES.HOME} onClick={handleClick}>
                        <img src="/logoWhite.svg" alt="logo NV-massage" className='h-20 mx-auto'/>
                    </NavLink>
                    <ul className='flex flex-col md:gap-3 text-[var(--footer-links)] mt-5'>
                        <li className='text-sm'>
                            {t("address")}
                        </li>
                        <li className='text-sm'>
                            {t("telephone")}: &nbsp;
                            <a href={`tel:+375336424878`}
                               className='hover:text-[var(--white)] transition'
                               target="_blank"
                            >
                                +375 33 642-48-78
                            </a>
                        </li>
                        <li className='text-sm'>
                            Email: &nbsp;
                            <a
                                href={`mailto:baranovichimassage@gmail.com`}
                                className='hover:text-[var(--white)] transition'
                            >
                                baranovichimassage@gmail.com
                            </a>
                        </li>
                    </ul>

                    <ul className='mt-8 xs:mb-10 flex flex-row justify-between text-2xl text-[var(--footer-links)]'>
                        <li>
                            <a
                                className='hover:text-[var(--white)] transition'
                                href="https://www.facebook.com/profile.php?id=100059235169418"
                                target="_blank"
                                rel="noreferrer"
                            >
                                <FaFacebook/>
                            </a>
                        </li>
                        <li>
                            <a
                                className='hover:text-[var(--white)] transition'
                                href="https://www.instagram.com/natali.massage_baranovichi/"
                                target="_blank"
                                rel="noreferrer"
                            >
                                <FaSquareInstagram/>
                            </a>
                        </li>
                        <li>
                            <a
                                className='hover:text-[var(--white)] transition'
                                href="https://www.linkedin.com/in/%D0%BD%D0%B0%D1%82%D0%B0%D0%BB%D1%8C%D1%8F-%D0%B2%D0%B8%D0%BA%D1%82%D0%BE%D1%80%D0%BE%D0%B2%D0%BD%D0%B0-78baa82b0/"
                                target="_blank"
                                rel="noreferrer"
                            >
                                <FaLinkedin/>
                            </a>
                        </li>
                        <li>
                            <a
                                className='hover:text-[var(--white)] transition'
                                href="https://www.tiktok.com/@massage_baranovichi?_t=8kjALrIXlpt&_r=1"
                                target="_blank"
                                rel="noreferrer"
                            >
                                <FaTiktok/>
                            </a>
                        </li>
                        <li>
                            <a
                                className="hover:text-[var(--white)] transition"
                                href="https://t.me/NV_massage_baranovichi"
                                target="_blank"
                                rel="noreferrer"
                            >
                                <FaTelegram/>
                            </a>
                        </li>

                        <li>
                            <a
                                className="hover:text-[var(--white)] transition"
                                href="https://invite.viber.com/?number=%2B375336424878"
                                target="_blank"
                                rel="noreferrer"
                            >
                                <FaViber/>
                            </a>
                        </li>


                    </ul>
                </div>

                <div>
                    <h1 className='md:mb-4 xs:mb-2 text-[var(--soft-white)] text-lg font-normal'>
                        {t("footer.types_of_massage")}
                    </h1>
                    {loading && <p className="text-[var(--footer-links)]">{t("loading")}</p>}
                    {error && <p className="text-red-500">{t("error_loading_data")}</p>}
                    {!loading && !error && (
                        <ul className='flex flex-col gap-1'>
                            {data?.map((item) => (
                                <li key={item.id}>
                                    <NavLink to={`/massage/${item.documentId}`}
                                             onClick={handleClick}
                                             className='text-[var(--footer-links)] hover:text-[var(--white)] transition text-sm'
                                    >
                                        {item.title}
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                <div className='md:mt-0 xs:mt-6'>
                    <h1 className='md:mb-4 xs:mb-2 text-[var(--soft-white)] text-lg font-normal'>
                        {t("footer.salon")}
                    </h1>
                    <div className='flex flex-col gap-1 text-[var(--footer-links)]'>
                        <NavLink to={ROUTES.ABOUT_US}
                                 onClick={handleClick}
                                 className='hover:text-[var(--white)] transition text-sm'
                        >
                            {t("footer.about_me")}
                        </NavLink>
                        <NavLink to={ROUTES.REVIEWS}
                                 onClick={handleClick}
                                 className='hover:text-[var(--white)] transition text-sm'
                        >
                            {t("footer.reviews")}
                        </NavLink>
                        <NavLink to={ROUTES.FAQ}
                                 onClick={handleClick}
                                 className='hover:text-[var(--white)] transition text-sm'
                        >
                            {t("footer.faq")}
                        </NavLink>
                        <NavLink to={ROUTES.MEMBERSHIP}
                                 onClick={handleClick}
                                 className='hover:text-[var(--white)] transition text-sm'
                        >
                            {t("footer.certificates_subscriptions")}
                        </NavLink>
                        <NavLink to={ROUTES.CONTACTS}
                                 onClick={handleClick}
                                 className='hover:text-[var(--white)] transition text-sm'
                        >
                            {t("contacts.contacts")}
                        </NavLink>
                        <NavLink to={ROUTES.PRIVACY_POLICY}
                                 onClick={handleClick}
                                 className='hover:text-[var(--white)] transition text-sm'
                        >
                            {t("privacyPolicy.privacy_policy")}
                        </NavLink>
                    </div>
                </div>
            </div>
            <div className='container mt-14 mx-auto w-full flex flex-col items-center justify-center text-center gap-2'>
                <p className='text-[var(--footer-links)] text-sm'>
                    © {currentYear} NV-massage. {t("footer.all_rights_reserved")}.
                </p>
                <p className='text-[var(--footer-links)] text-sm'>
                    {t("footer.application_developed_by")} &nbsp;
                    <a href="https://www.linkedin.com/in/ivan-bezniak-2634a11a0/"
                       rel="noreferrer"
                       target="_blank"
                       className='hover:text-[var(--white)] transition'
                    > {t("footer.ivan_bezniak")}</a>
                </p>
                <p className='text-[var(--footer-links)] text-sm'>
                    <NavLink to={`tel:+375295210417`}
                             className='group-hover:text-[var(--active)] transition'>
                        +375 29 521 04 17
                    </NavLink>
                </p>
            </div>

        </div>
    );
};

export default Footer;
