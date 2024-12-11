import React, {useEffect, useState} from 'react';
import useFetchAllData from "../../api/useFetchAllData.js";
import {ROUTES} from "../../config/routes.js";
import {useAuth} from "../../context/AuthContext.jsx";
import {useNavigate} from "react-router-dom";
import Select from "react-select";
import {
    deleteBooking,
    formatDateTime,
    generateCalendar,
    isToday,
    monthOptions,
    yearOptions
} from "../../common/helpers.js";
import {Preloader} from "../../common/Preloader/Preloader.jsx";


const AllBookings = () => {
    const {role} = useAuth();
    const navigate = useNavigate();
    const {data, loading, error} = useFetchAllData("/bookings?populate=massageType");
    const today = new Date();
    const [selectedYear, setSelectedYear] = useState(today.getFullYear());
    const [selectedMonth, setSelectedMonth] = useState(today.getMonth());
    const calendar = generateCalendar(selectedYear, selectedMonth);

    useEffect(() => {
        if (role !== 'admin') {
            navigate(ROUTES.HOME);
            return;
        }
    }, [role]);

    // Вычисление общей суммы за месяц
    const monthlyTotal = data
        .filter((booking) => {
            const bookingDate = new Date(booking.dateTime);
            return (
                bookingDate.getFullYear() === selectedYear &&
                bookingDate.getMonth() === selectedMonth
            );
        })
        .reduce((sum, booking) => sum + (booking.totalPrice || 0), 0);

    if (loading) return <Preloader/>;
    if (error) return <p>Ошибка загрузки данных: {error.message}</p>;

    return (
        <div>
            <div className="h-screen relative flex items-center justify-center">
                <img
                    src='/allBookings.jpg'
                    alt='all bookings img'
                    className="w-full h-full object-cover"
                />
                <div className="overlay"></div>
                <div
                    className="container text-center w-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 text-soft-white">
                    <h1 className="xs:text-2xl md:text-3xl px-4">
                        "Каждый твой массаж — это не только помощь и забота, но и шаг к твоим мечтам и целям. Помни:
                        твои усилия окупаются, твои руки создают чудеса, а деньги — это результат твоего таланта и
                        труда. Вперёд и только вперёд!" 💆‍♀️💸✨
                    </h1>
                </div>
            </div>
            <div className="md:container xs:p-4 mt-10 md:mb-16 mx-auto w-full">
                <h2 className="text-center text-2xl font-bold mb-6">Календарь записей</h2>
                <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold text-green-400">Заработала за месяц: {monthlyTotal} BYN</h3>
                </div>
                <div className="flex justify-center mb-4 space-x-2">
                    <Select
                        options={yearOptions}
                        value={yearOptions.find((option) => option.value === selectedYear)}
                        onChange={(selectedOption) => setSelectedYear(selectedOption.value)}
                        className="w-40"
                    />
                    <Select
                        options={monthOptions}
                        value={monthOptions.find((option) => option.value === selectedMonth)}
                        onChange={(selectedOption) => setSelectedMonth(selectedOption.value)}
                        className="w-40"
                    />
                </div>


                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {calendar.map((date, index) => {
                        const bookings = date
                            ? data.filter((booking) => {
                                const bookingDate = new Date(booking.dateTime);
                                return (
                                    bookingDate.getDate() === date.getDate() &&
                                    bookingDate.getMonth() === date.getMonth() &&
                                    bookingDate.getFullYear() === date.getFullYear()
                                );
                            })
                                .sort((a, b) => new Date(a.dateTime) - new Date(b.dateTime))
                            : [];

                        const dailyTotal = bookings.reduce(
                            (sum, booking) => sum + (booking.totalPrice || 0),
                            0
                        );

                        return (
                            <div
                                key={index}
                                className={`border p-4 rounded-lg shadow-md ${
                                    date && isToday(date) ? "bg-red-300" : "bg-white"
                                } transition-colors`}
                            >
                                {date ? (
                                    <>
                                        <div className="text-lg font-bold text-center mb-2">
                                            {date.toLocaleDateString("ru-RU", {
                                                weekday: 'long',
                                                day: '2-digit',
                                                month: '2-digit',
                                                year: 'numeric',
                                            })}
                                        </div>
                                        {bookings.length > 0 ? (
                                            <>
                                                <div className="text-center text-2xl font-semibold mb-2 text-green-400">
                                                    Заработала за день: {dailyTotal} BYN
                                                </div>
                                                {bookings.map((booking) => (
                                                    <div key={booking.id}
                                                         className="border border-[var(--footer)] p-2 rounded-lg shadow-sm mb-6 bg-[var(--footer-links)]">
                                                        <div><strong>Имя:</strong> {booking.name}</div>
                                                        <div><strong>Дата и
                                                            время:</strong> {formatDateTime(booking.dateTime)}</div>
                                                        <div><strong>Цена:</strong> {booking.totalPrice} BYN</div>
                                                        <div>
                                                            <strong>Массаж:</strong>{" "}
                                                            {booking.massageType?.map(massage => massage.title).join(", ") || "Нет данных"}
                                                        </div>
                                                        {booking.phone ? (
                                                            <a
                                                                href={`tel:${booking.phone}`}
                                                                className="text-[var(--main)] mt-1 cursor-pointer"
                                                            >
                                                                <strong>Телефон:</strong> {booking.phone}
                                                            </a>
                                                        ) : (
                                                            <a
                                                                href={`tel:${booking.user.userphone}`}
                                                                className="text-[var(--main)] mt-1 cursor-pointer"
                                                            >
                                                                <strong>Телефон:</strong> {booking.phone}
                                                            </a>
                                                        )}

                                                        <div>
                                                            <button
                                                                className="mt-2 bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                                                                onClick={() => deleteBooking(booking.documentId)}
                                                            >
                                                                Отменить бронирование
                                                            </button>
                                                        </div>
                                                    </div>
                                                ))}
                                            </>
                                        ) : (
                                            <p className="text-gray-500 text-sm">Нет записей</p>
                                        )}
                                    </>
                                ) : (
                                    <div className="text-gray-300">Нет данных</div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default AllBookings;
