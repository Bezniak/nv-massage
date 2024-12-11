import React, {useEffect, useState} from 'react';
import {NavLink} from "react-router-dom";
import {ROUTES} from "../../config/routes.js";
import {FaArrowRightLong} from "react-icons/fa6";
import Button from "../../common/Button/Button.jsx";
import {useTranslation} from "react-i18next";
import {useAuth} from "../../context/AuthContext.jsx";
import useLanguage from "../../hooks/useLanguage.js";

// Import flag images
import ruFlag from '../../assets/ru.svg';
import enFlag from '../../assets/en.svg';
import cnFlag from '../../assets/cn.svg';
import tmFlag from '../../assets/tm.svg';



const Navbar = () => {
    const {user, logout, role} = useAuth();
    const {t} = useTranslation();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
    const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
    const {currentLanguage, changeLanguage} = useLanguage();

    // Закрытие меню при клике вне меню или прокрутке
    useEffect(() => {
        const handleClickOutside = (event) => {
            const menu = document.getElementById('navbar-dropdown');
            const dropdownMenu = document.getElementById('dropdownNavbar');
            const languageMenu = document.getElementById('languageDropdown');
            const userMenu = document.getElementById('userDropdown');

            if (menu && !menu.contains(event.target) && !event.target.closest('.navbar-toggle') && isMobileMenuOpen) {
                setIsMobileMenuOpen(false);
            }
            if (dropdownMenu && !dropdownMenu.contains(event.target) && !event.target.closest('.dropdown-toggle') && isDropdownOpen) {
                setIsDropdownOpen(false);
            }
            if (languageMenu && !languageMenu.contains(event.target) && !event.target.closest('.language-toggle') && isLanguageDropdownOpen) {
                setIsLanguageDropdownOpen(false);
            }
            if (userMenu && !userMenu.contains(event.target) && !event.target.closest('.user-menu-button') && isUserDropdownOpen) {
                setIsUserDropdownOpen(false);
            }
        };

        const handleScroll = () => {
            if (isMobileMenuOpen || isDropdownOpen || isLanguageDropdownOpen || isUserDropdownOpen) {
                setIsMobileMenuOpen(false);
                setIsDropdownOpen(false);
                setIsLanguageDropdownOpen(false);
                setIsUserDropdownOpen(false);
            }
        };

        // Добавляем слушатели событий
        document.addEventListener('click', handleClickOutside);
        window.addEventListener('scroll', handleScroll);

        // Убираем слушатели при размонтировании компонента
        return () => {
            document.removeEventListener('click', handleClickOutside);
            window.removeEventListener('scroll', handleScroll);
        };
    }, [isMobileMenuOpen, isDropdownOpen, isLanguageDropdownOpen, isUserDropdownOpen]);

    const handleLogout = () => {
        logout();
    };


    return (
        <nav
            className="absolute z-50 top-0 left-1/2 transform -translate-x-1/2 bg-transparent border-gray-200 w-full"
        >
            <div className="max-w-screen-xl mx-auto p-4">
                <div className="flex items-center justify-between mb-10">
                    <NavLink to={ROUTES.HOME} className="flex items-center space-x-3 rtl:space-x-reverse">
                        <img src="/logoWhite.svg" className="md:h-20 xs:h-10" alt="nv logo"/>
                    </NavLink>
                    <div className='hidden md:block'>
                        <Button content={t("book_button")}/>
                    </div>
                    <div className='flex items-center gap-3'>
                        <div className="relative">
                            <button
                                type="button"
                                className="flex items-center text-sm bg-white rounded-full p-2 transition h-10 user-menu-button"
                                aria-expanded="false"
                                data-dropdown-toggle="user-dropdown"
                                data-dropdown-placement="bottom"
                                onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                            >
                                <span className="sr-only">Open user menu</span>
                                <img
                                    className="w-full h-full object-cover"
                                    src="/user.png"
                                    alt="user photo"
                                />
                            </button>

                            {/* user menu content*/}
                            {isUserDropdownOpen && (
                                <div
                                    className="absolute right-0 z-10 mt-2 px-4 py-2 bg-white rounded-lg shadow-lg w-fit"
                                    id="userDropdown"
                                >
                                    {user && (
                                        <div className="px-4 py-3">
                                            <span className="block text-sm text-gray-900 dark:text-white">
                                                {user?.username}
                                            </span>
                                            <span className="block text-sm text-gray-500 truncate dark:text-gray-400">
                                                {user?.email}
                                            </span>
                                        </div>
                                    )}
                                    <ul className="py-2" aria-labelledby="user-menu-button">
                                        {!user && (
                                            <>
                                                <li onClick={() => setIsUserDropdownOpen(false)}>
                                                    <NavLink
                                                        to={ROUTES.LOGIN}
                                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                    >
                                                        {t("login")}
                                                    </NavLink>
                                                </li>
                                                <li onClick={() => setIsUserDropdownOpen(false)}>
                                                    <NavLink
                                                        to={ROUTES.REGISTER}
                                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                    >
                                                        {t("register")}
                                                    </NavLink>
                                                </li>
                                            </>
                                        )}
                                        {user && role === 'admin' && (
                                            <li
                                                onClick={() => {
                                                    setIsUserDropdownOpen(false);
                                                }}
                                            >
                                                <NavLink
                                                    to={ROUTES.ALL_BOOKINGS}
                                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                >
                                                    Все заказы
                                                </NavLink>
                                            </li>
                                        )}
                                        {user && role !== 'admin' && (
                                            <li
                                                onClick={() => {
                                                    setIsUserDropdownOpen(false);
                                                }}
                                            >
                                                <NavLink
                                                    to={ROUTES.MY_BOOKINGS}
                                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                >
                                                    {t("navbar.my_bookings")}
                                                </NavLink>
                                            </li>
                                        )}
                                        {user && (
                                            <li
                                                onClick={() => {
                                                    handleLogout();
                                                    setIsUserDropdownOpen(false);
                                                }}
                                            >
                                                <NavLink
                                                    to={ROUTES.HOME}
                                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                >
                                                    {t("navbar.log_out")}
                                                </NavLink>
                                            </li>
                                        )}
                                    </ul>
                                </div>

                            )}
                        </div>


                        {/* Language selector */}
                        <div className="relative">
                            <button
                                className="flex items-center space-x-4 text-sm bg-transparent p-2 rounded-lg transition language-toggle"
                                onClick={() => setIsLanguageDropdownOpen(!isLanguageDropdownOpen)}
                            >
                                <img
                                    src={currentLanguage === 'ru' ? ruFlag : currentLanguage === 'en' ? enFlag : currentLanguage === 'zh' ? cnFlag : tmFlag}
                                    alt="language flag"
                                    className="md:w-8 md:h-10 xs:w-6 xs:h-6"
                                />
                            </button>

                            {/* Dropdown menu for language selection */}
                            {isLanguageDropdownOpen && (
                                <div id="languageDropdown"
                                     className="absolute right-0 z-10 mt-2 bg-white rounded-lg shadow-lg w-40">
                                    <ul className="text-sm text-gray-700">
                                        <li
                                            onClick={() => {
                                                changeLanguage('ru');
                                                setIsLanguageDropdownOpen(false);
                                            }}
                                            className="flex items-center px-4 py-2 cursor-pointer hover:bg-gray-100"
                                        >
                                            <img src={ruFlag} alt="Русский" className="w-6 h-6 mr-2"/>
                                            Русский
                                        </li>
                                        <li
                                            onClick={() => {
                                                changeLanguage('en');
                                                setIsLanguageDropdownOpen(false);
                                            }}
                                            className="flex items-center px-4 py-2 cursor-pointer hover:bg-gray-100"
                                        >
                                            <img src={enFlag} alt="English" className="w-6 h-6 mr-2"/>
                                            English
                                        </li>
                                        <li
                                            onClick={() => {
                                                changeLanguage('zh');
                                                setIsLanguageDropdownOpen(false);
                                            }}
                                            className="flex items-center px-4 py-2 cursor-pointer hover:bg-gray-100"
                                        >
                                            <img src={cnFlag} alt="中文" className="w-6 h-6 mr-2"/>
                                            中文
                                        </li>
                                        <li
                                            onClick={() => {
                                                changeLanguage('tk');
                                                setIsLanguageDropdownOpen(false);
                                            }}
                                            className="flex items-center px-4 py-2 cursor-pointer hover:bg-gray-100"
                                        >
                                            <img src={tmFlag} alt="Türkmen" className="w-6 h-6 mr-2"/>
                                            Türkmen
                                        </li>
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Кнопка для мобильного меню */}
                    <button
                        className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 navbar-toggle"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        <span className="sr-only">Open main menu</span>
                        <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M1 1h15M1 7h15M1 13h15"
                            />
                        </svg>
                    </button>
                </div>

                {/* Навигация */}
                <div
                    className={`mt-4 w-full ${isMobileMenuOpen ? 'block' : 'hidden'} md:block md:mt-0 md:bg-transparent xs:bg-white`}
                    id="navbar-dropdown"
                >
                    <ul className="flex flex-col space-y-4 md:space-y-0 md:flex-row md:space-x-8 rtl:space-x-reverse justify-center">
                        <li>
                            <NavLink
                                to="/"
                                className="block py-2 px-3 rounded bg-transparent md:text-white md:hover:text-[var(--active)] transition uppercase"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                {t("navbar.home")}
                            </NavLink>
                        </li>
                        {/* Dropdown for user profile */}
                        <li>
                            <button
                                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                className="flex items-center justify-between w-full py-2 px-3 rounded md:border-0 md:text-white md:hover:text-[var(--active)] transition uppercase dropdown-toggle"
                            >
                                {t("navbar.my_office")}
                                <svg
                                    className="w-2.5 h-2.5 ms-2.5"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 10 6"
                                >
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                          strokeWidth="2" d="m1 1 4 4 4-4"/>
                                </svg>
                            </button>

                            {/* Dropdown menu */}
                            <div
                                id="dropdownNavbar"
                                className={`z-10 ${isDropdownOpen ? '' : 'hidden'} absolute mt-6 font-normal bg-white divide-y divide-gray-100 rounded-lg shadow md:w-2/5 xs:w-w-95 px-4`}
                            >
                                <ul className="py-3 text-sm text-gray-500">
                                    {[
                                        {route: ROUTES.ABOUT_US, label: t("navbar.about_me")},
                                        {route: ROUTES.REVIEWS, label: t("navbar.reviews")},
                                        {route: ROUTES.FAQ, label: t("navbar.faq")},
                                    ].map(({route, label}) => (
                                        <li
                                            key={route}
                                            onClick={() => {
                                                setIsDropdownOpen(false);
                                                setIsMobileMenuOpen(false);
                                            }}
                                            className="flex items-center group cursor-pointer px-4 py-2 transition-all duration-300 hover:pl-6 group-hover:bg-[var(--active)]"
                                        >
                                            <FaArrowRightLong
                                                className="mr-5 text-gray-400 opacity-0 group-hover:opacity-100 group-hover:translate-x-2 group-hover:text-[var(--active)] transition-all duration-300 text-lg"
                                            />
                                            <NavLink
                                                to={route}
                                                className="flex-1 transition-colors group-hover:text-[var(--active)] uppercase"
                                            >
                                                {label}
                                            </NavLink>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </li>
                        {/* Other menu items */}
                        <li>
                            <NavLink
                                to={ROUTES.MASSAGES}
                                className="block py-2 px-3 rounded bg-transparent md:text-white md:hover:text-[var(--active)] transition uppercase"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                {t("navbar.services")}
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to={ROUTES.MEMBERSHIP}
                                className="block py-2 px-3 rounded bg-transparent md:text-white md:hover:text-[var(--active)] transition uppercase"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                {t("navbar.certificates_subscriptions")}
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to={ROUTES.CONTACTS}
                                className="block py-2 px-3 rounded bg-transparent md:text-white md:hover:text-[var(--active)] transition uppercase"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                {t("navbar.contacts")}
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
