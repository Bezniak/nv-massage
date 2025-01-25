import React from 'react';
import { useTranslation } from "react-i18next";
import { useAuth } from "../../context/AuthContext.jsx";
import useFetchAllData from "../../api/useFetchAllData.js";
import { NavLink } from "react-router-dom";
import { deleteBooking, handleClick } from "../../common/helpers.js";
import { Preloader } from "../../common/Preloader/Preloader.jsx";

const MyBookings = () => {
    const { t } = useTranslation();
    const { user, locale } = useAuth();
    const {
        data,
        loading,
        error
    } = useFetchAllData(`/bookings?filters[user][id][$eq]=${user?.id}&locale=${locale}&populate[massageType][populate]=*&populate[user][populate]=*&`);

    if (loading) {
        return <Preloader />;
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

    const sortedData = data?.slice().sort((a, b) => new Date(b.dateTime) - new Date(a.dateTime)) || [];

    return (
        <div>
            <div className="h-screen relative flex items-center justify-center">
                <img
                    src='/myOrders.jpg'
                    alt='myOrders'
                    className="w-full h-full object-cover"
                />
                <div className="overlay"></div>
                <div
                    className='container text-center w-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 text-soft-white'>
                    <h1 className="xs:text-2xl md:text-3xl">
                        {user?.username}, {t("myBookings.welcome_to_account")}
                    </h1>
                </div>
            </div>

            <div className="md:container xs:p-4 mt-10 md:mb-16 mx-auto w-full">
                {sortedData.length === 0 ? (
                    <div className="text-center py-10">
                        <p className="text-lg text-gray-700">{t("myBookings.no_bookings")}</p>
                    </div>
                ) : (
                    sortedData.map((booking) => {
                        const formattedDateTime = new Date(booking?.dateTime).toLocaleString('ru-RU', {
                            day: '2-digit',
                            month: '2-digit',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                            hour12: false,
                        });

                        return (
                            <div key={booking.id} className="mb-10 mt-10">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                    <div
                                        className="max-w-sm bg-white border border-gray-200 rounded-lg shadow h-full flex flex-col">
                                        <div className="relative group">
                                            <img
                                                className="rounded-t-lg"
                                                src='/myBookMassage.jpg'
                                                alt='myBookMassage img'
                                            />
                                        </div>
                                        <div className="p-5 flex-grow flex flex-col items-center justify-center">
                                            <h5 className="mb-8 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                                {t("myBookings.booking")} № {booking.id}
                                            </h5>
                                            <p className="mb-4 font-normal text-center text-gray-700 dark:text-gray-400">
                                                {t("myBookings.you_signed_up_for")} {formattedDateTime.replace(',', t("book.on_time"))}
                                            </p>
                                            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                                                {t("myBookings.amount_to_be_paid")} {booking?.totalPrice} BYN
                                            </p>
                                            {booking?.user?.id === user?.id && (
                                                <button
                                                    onClick={() => deleteBooking(booking.documentId)}
                                                    className="mt-4 px-4 py-2 w-fit text-sm bg-red-500 text-white rounded hover:bg-red-600 transition"
                                                >
                                                    {t("myBookings.cancel_booking")}
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                    {booking.massageType.map((type) => (
                                        <div key={type.id}
                                             className="bg-white border border-gray-200 rounded-lg shadow flex flex-col overflow-hidden h-full">
                                            <NavLink to={`/massage/${type?.documentId}`} onClick={handleClick}>
                                                <div className="relative group">
                                                    {/*<img*/}
                                                    {/*    className="rounded-t-lg transform transition-transform duration-300 group-hover:scale-110"*/}
                                                    {/*    src={import.meta.env.VITE_UPLOAD_URL + type.bgImg?.url}*/}
                                                    {/*    alt={type.title}*/}
                                                    {/*/>*/}
                                                    <img
                                                        className="rounded-t-lg transform transition-transform duration-300 group-hover:scale-110"
                                                        src={type.bgImg?.url}
                                                        alt={type.title}
                                                    />
                                                </div>
                                            </NavLink>
                                            <div className="p-5 flex-grow flex flex-col">
                                                <NavLink to={`/massage/${type?.documentId}`} onClick={handleClick}>
                                                    <h5 className="mb-2 text-2xl font-bold text-center tracking-tight text-gray-900 hover:text-[var(--active)] transition">
                                                        {type.title}
                                                    </h5>
                                                </NavLink>
                                                <p className="mb-3 font-normal text-gray-700 flex-grow text-justify">
                                                    {type.description}
                                                </p>
                                                <p className="font-normal flex-grow text-gray-700">
                                                    {type.timeDuration}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <hr className="w-full h-0.5 my-8 bg-[var(--footer)] border-0 rounded"/>
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
};

export default MyBookings;