import React, {useEffect, useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import axios from 'axios';
import useFetchAllData from "../../api/useFetchAllData.js";
import {useAuth} from "../../context/AuthContext.jsx";
import CreatableSelect from "react-select/creatable";
import Select from "react-select";
import {customStyles} from "../../common/helpers.js";
import MetaTags from "../../common/MetaTags.jsx";
import {Preloader} from "../../common/Preloader/Preloader.jsx";
import {useTranslation} from "react-i18next";

const Book = () => {
    const {t} = useTranslation();
    const {user} = useAuth();
    const {data, loading, error} = useFetchAllData(`/massages?locale=ru&populate=*`);
    const {
        register,
        handleSubmit,
        watch,
        control
    } =
        useForm();
    const [availableTimes] = useState([
        '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '16:30',
    ]);
    const [bookings, setBookings] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [selectedMassages, setSelectedMassages] = useState([]);
    const [message, setMessage] = useState(null);
    const [isFormVisible, setIsFormVisible] = useState(true);

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/bookings`);
                setBookings(response.data.data);
            } catch (error) {
                console.error('Ошибка при загрузке бронирований:', error);
            }
        };
        fetchBookings();
    }, []);

    const massageType = watch('massageType', []);

    useEffect(() => {
        if (massageType && data) {
            const selectedIds = massageType.map((m) => m.value);
            const selected = data.filter((m) => selectedIds.includes(m.documentId));

            setSelectedMassages((prevSelected) => (
                JSON.stringify(prevSelected) !== JSON.stringify(selected) ? selected : prevSelected
            ));

            const newTotalPrice = selected.reduce((sum, m) => sum + (m.price || 0), 0);
            setTotalPrice((prevPrice) => (prevPrice !== newTotalPrice ? newTotalPrice : prevPrice));
        } else {
            setSelectedMassages([]);
            setTotalPrice(0);
        }
    }, [massageType, data]);

    const sendToTelegram = async (formData) => {
        const token = import.meta.env.VITE_TELEGRAM_BOT_TOKEN_RESERVATION;
        const chatId = import.meta.env.VITE_TELEGRAM_CHAT_ID_RESERVATION;

        // Преобразуем время в строку, если это объект
        const timeValue = typeof formData.time === 'object' && formData.time.value
            ? formData.time.value
            : formData.time;

        const message = `
    *Новое бронирование на сайте!!! Дата бронирования ${new Date().toLocaleDateString('ru-RU')} в ${new Date().toLocaleTimeString('ru-RU', {
            hour: '2-digit',
            minute: '2-digit'
        })}*  
    
    Имя: ${formData.name}  
    Телефон: ${formData.phone}  
    Услуги: ${selectedMassages.map(m => m.title).join(', ')}  
    Дата и время проведения массажа: ${new Date(formData.date).toLocaleDateString('ru-RU')} в ${timeValue}  
    Сумма к оплате: ${totalPrice} BYN
    `;
        try {
            await axios.post(`https://api.telegram.org/bot${token}/sendMessage`, {
                chat_id: chatId,
                text: message,
                parse_mode: 'Markdown',
            });
        } catch (error) {
            console.error('Ошибка при отправке в Telegram:', error);
        }
    };


    const onSubmit = async (formData) => {
        try {
            const {date, time, massageType, name, phone} = formData;

            if (!date || !time) throw new Error(t("book.no_date_or_time_selected"));

            const timeValue = typeof time === 'object' && time.value ? time.value : time;
            const dateTime = new Date(`${date}T${timeValue}:00`);
            const massageIds = massageType.map((m) => m.value);

            const bookingData = {
                data: {
                    name,
                    phone,
                    massageType: massageIds,
                    dateTime: dateTime.toISOString(),
                    totalPrice,
                    user: user?.id || null,
                },
            };

            await axios.post(`${import.meta.env.VITE_API_URL}/bookings`, bookingData);
            await sendToTelegram(formData);

            gtagSendEvent();

            setMessage({
                type: 'success',
                text: `${name}, ${t("book.thank_you_for_reservation")} ${selectedMassages.map(m => m.title).join(', ')}. ${t("book.waiting_for_you")} ${new Date(date).toLocaleDateString('ru-RU')} ${t("book.on_time")} ${timeValue} ${t("book.at_the_address")} \n${t("book.amount_to_be_paid")} ${totalPrice} BYN.`,
            });
            setIsFormVisible(false);
        } catch (error) {
            console.error('Ошибка при создании бронирования:', error.response?.data || error.message);

            setMessage({
                type: 'error',
                text: `Ошибка: ${error.response?.data?.error?.message || error.message}`,
            });
        }
    };

    const filterAvailableTimes = (selectedDate) => {
        const formattedDate = new Date(selectedDate).toLocaleDateString('en-GB');
        const todayDate = new Date().toLocaleDateString('en-GB');

        const bookedTimes = bookings
            .filter(booking => new Date(booking.dateTime).toLocaleDateString('en-GB') === formattedDate)
            .map(booking => new Date(booking.dateTime).toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'}));

        const currentTime = new Date().toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});

        return availableTimes
            .filter(time => formattedDate !== todayDate || time > currentTime)
            .map(time => ({time, isAvailable: !bookedTimes.includes(time)}));
    };
    const selectedDate = watch('date');
    const today = new Date().toISOString().split('T')[0];


    if (loading) {
        return <Preloader/>
    }

    if (error) {
        return (
            <div className="h-screen flex items-center justify-center">
                <p className="text-xl text-red-500">
                    {t("an_error_occurred")} {error.message || t("loading_error")}</p>
            </div>
        );
    }


    return (
        <>
            <MetaTags page="book"/>
            <div className="min-h-screen bg-transparent">
                <div className="h-screen relative flex items-center justify-center">
                    <img src='/book.jpg' alt='book img' className="w-full h-full object-cover"/>
                    <div className="absolute inset-0 bg-black opacity-40"></div>
                    <div
                        className="container text-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 text-white">
                        <h1 className="text-3xl md:text-4xl font-semibold text-shadow-xl">
                            {t("book.optimize_your_massage")}
                        </h1>
                        <p className='mt-8 text-lg mx-auto'>
                            {t("book.website_offers_massage_booking")}
                        </p>
                    </div>
                </div>
                <div
                    className="md:container mx-auto px-4 py-12 bg-white rounded-lg shadow-lg md:w-2/5 xs:w-11/12 mt-20 mb-20">
                    {message && (
                        <div
                            className={`p-4 mb-6 rounded ${message.type === 'success' ? 'text-justify' : 'bg-red-100 text-red-700'}`}>
                            {message.text}
                        </div>
                    )}
                    {isFormVisible && (
                        <>
                            <h1 className="text-2xl font-semibold text-center mb-8">
                                {t("book.book_massage")}
                            </h1>
                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
                                <div>
                                    <label className="block font-medium">
                                        {t("book.name")}
                                    </label>
                                    <input
                                        type="text"
                                        {...register('name', {required: t("book.field_is_required")})}
                                        className="w-full border border-[#d8c3bd] p-2 rounded focus:outline-none focus:border-[var(--active)] focus:ring-[var(--active)]"
                                        placeholder={t("book.ekaterina")}
                                    />
                                </div>
                                <div>
                                    <label className="block font-medium">
                                        {t("book.phone")}
                                    </label>
                                    <input
                                        type="text"
                                        {...register('phone', {required: t("book.field_is_required")})}
                                        className="w-full border border-[#d8c3bd] p-2 rounded focus:outline-none focus:border-[var(--active)] focus:ring-[var(--active)]"
                                        placeholder='+375 29 333-33-33'
                                    />
                                </div>
                                <div>
                                    <label className="block font-medium">
                                        {t("book.massage_type")}
                                    </label>
                                    <Controller
                                        name="massageType"
                                        control={control}
                                        rules={{required: t("book.field_is_required")}}
                                        render={({field}) => (
                                            <CreatableSelect
                                                {...field}
                                                isClearable
                                                placeholder={t("book.choose_a_massage")}
                                                isMulti
                                                options={data?.map((m) => ({
                                                    label: m.title,
                                                    value: m.documentId, // Use id here instead of title
                                                }))}
                                                styles={{
                                                    control: (provided, state) => ({
                                                        ...provided,
                                                        borderColor: state.isFocused ? 'transparent' : '#d8c3bd',
                                                        boxShadow: state.isFocused ? '0 0 0 2px var(--active)' : 'none',
                                                        '&:hover': {
                                                            borderColor: '#d8c3bd',
                                                        },
                                                    }),
                                                    option: (provided, state) => ({
                                                        ...provided,
                                                        backgroundColor: state.isFocused ? 'var(--active)' : 'white',
                                                        color: state.isFocused ? 'white' : 'black',
                                                        '&:active': {
                                                            backgroundColor: 'var(--active)',
                                                        },
                                                    }),
                                                    menu: (provided) => ({
                                                        ...provided,
                                                        zIndex: 10, // Ensures dropdown is above other elements
                                                    }),
                                                }}
                                            />
                                        )}
                                    />
                                </div>
                                <div>
                                    <label className="block font-medium">
                                        {t("book.date")}
                                    </label>
                                    <input
                                        type="date"
                                        {...register('date', {required: t("book.field_is_required")})}
                                        min={today}
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:border-transparent focus:ring-2 focus:ring-[var(--footer)]"
                                    />
                                </div>
                                <div>
                                    <label className="block font-medium">
                                        {t("book.time")}
                                    </label>
                                    <Controller
                                        name="time"
                                        control={control}
                                        rules={{required: t("book.field_is_required")}}
                                        render={({field}) => (
                                            <Select
                                                {...field}
                                                options={selectedDate
                                                    ? filterAvailableTimes(selectedDate).map(({time, isAvailable}) => ({
                                                        value: time,
                                                        label: time,
                                                        isAvailable,
                                                    }))
                                                    : []}
                                                placeholder={t("book.first_select_a_date")}
                                                styles={customStyles}
                                                isOptionDisabled={(option) => !option.isAvailable} // Отключаем недоступные
                                            />
                                        )}
                                    />
                                </div>
                                {selectedMassages.length > 0 && (
                                    <div>
                                        <ul className="space-y-2 mb-6 mt-6">
                                            <h2 className='font-semibold text-center'>
                                                {t("book.selected_services")}
                                            </h2>
                                            {selectedMassages.map((massage) => (
                                                <li key={massage.documentId} className="flex justify-between">
                                                    <span>{massage.title}</span>
                                                    <div>
                                                        <span>{massage.price} BYN</span> &nbsp;
                                                        <span>{massage.timeDuration}</span>
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                        <div className="pt-4 text-xl font-semibold text-right">
                                            {t("book.total")} {totalPrice} BYN
                                        </div>
                                    </div>
                                )}
                                <div className='text-center'>
                                    <button
                                        type="submit"
                                        className="w-fit bg-[#9c776c] text-center mt-3 text-white py-3 px-6 rounded hover:bg-[#8b6a60] transition"
                                    >
                                        {t("book_now")}
                                    </button>
                                </div>
                            </form>
                        </>
                    )}
                </div>
            </div>
        </>
    );
};

export default Book;