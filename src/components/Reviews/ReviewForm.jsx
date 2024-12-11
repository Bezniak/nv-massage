import React, {useState} from 'react';
import {useForm} from 'react-hook-form';
import {NavLink} from 'react-router-dom';
import {FaRegStar} from 'react-icons/fa6';
import axios from 'axios';
import {handleClick} from "../../common/helpers.js";
import {useTranslation} from "react-i18next";

function ReviewForm() {
    const {t} = useTranslation();
    const [rating, setRating] = useState(0);
    const [isFormSend, setIsFormSend] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        reset,
        handleSubmit,
        clearErrors,
        formState: {errors},
        trigger,
    } = useForm();

    const onSubmit = async (data) => {
        setIsLoading(true);

        const botToken = import.meta.env.VITE_TELEGRAM_BOT_TOKEN_FEEDBACK; // Telegram bot token
        const chatId = import.meta.env.VITE_TELEGRAM_CHAT_ID_FEEDBACK; // Chat ID to receive the message
        const message = `
      Оставлен отзыв на сайте:
      Имя: ${data.name}
      Комментарий: ${data.comment}
      Телефон: ${data.phone}
      Email: ${data.email}
      Оценка: ${rating} из 5
      Дата: ${new Date().toLocaleString()}
    `;

        try {
            // Send the review message to the Telegram bot
            await axios.post(`https://api.telegram.org/bot${botToken}/sendMessage`, {
                chat_id: chatId,
                text: message,
            });

            // Submit the review data to your Strapi backend (set status as 'draft')
            await axios.post(import.meta.env.VITE_API_URL + `/reviews`, {
                data: {...data, grade: rating},
            }, {
                params: {status: 'draft'},  // Set the status to 'draft'
            });

            setIsFormSend(true);
        } catch (error) {
            console.error('Error submitting comment or sending Telegram message:', error);
        } finally {
            setIsLoading(false);
        }

        reset();  // Reset the form
        setRating(0);  // Reset the rating
    };

    const handleBlur = async (field) => {
        await trigger(field);
    };


    return (
        <div className="flex justify-center items-center min-h-screen bg-transparent">
            {isFormSend ? (
                <h1 className="text-center text-2xl">
                    {t("reviewForm.thank_for_feedback")} <br/>
                    {t("reviewForm.will_published_after_moderator")}
                </h1>
            ) : (
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="md:w-2/3 xs:w-full p-6 shadow-lg rounded text-left"
                >
                    {/* Имя */}
                    <div className="flex flex-col mb-4">
                        <label className='font-semibold'>
                            {t("name")}
                        </label>
                        <input
                            {...register('name', {
                                required: t("field_required"),
                            })}
                            className="w-full mt-2  border border-[#d8c3bd] p-2 rounded focus:outline-none focus:border-[var(--active)] focus:ring-[var(--active)]"
                            onBlur={() => handleBlur('name')}
                            placeholder={t("catherine")}
                        />
                        {errors.name && <span className='text-xs text-red-500 font-medium'>{errors.name.message}</span>}
                    </div>

                    {/* Телефон */}
                    <div className='mb-4'>
                        <label className="mb-2 font-semibold">
                            {t("telephone")}
                        </label>
                        <input
                            {...register('phone', {
                                required: t("field_required"),
                                pattern: {
                                    value: /^\+?\d{1,3}(\s?|\(\d{1,4}\))?([\s.-]?\d{1,4}){2,}$/,
                                    message: t("enter_valid_phone_number"),
                                },
                            })}
                            className="w-full mt-2 border border-[#d8c3bd] p-2 rounded focus:outline-none focus:border-[var(--active)] focus:ring-[var(--active)]"
                            onBlur={() => handleBlur('phone')}
                            placeholder="+375 29 333 33 33"
                        />
                        <span className="text-xs inline-block font-medium">
                            {t("reviewForm.provide_phone_number")}
                        </span>
                        <br/>
                        {errors.phone &&
                            <span className='text-xs text-red-500 font-medium'>{errors.phone.message}</span>}
                    </div>

                    {/* Email */}
                    <div className='mb-4'>
                        <label className="mb-2 font-semibold">
                            {t("email")}
                        </label>
                        <input
                            type="email"
                            {...register('email', {
                                required: t("field_required"),
                                pattern: {
                                    value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
                                    message: t("valid_email_address"),
                                },
                            })}
                            className="w-full mt-2 border border-[#d8c3bd] p-2 rounded focus:outline-none focus:border-[var(--active)] focus:ring-[var(--active)]"
                            onBlur={() => handleBlur('email')}
                            placeholder="kate@gmail.com"
                        />
                        <span className="text-xs inline-block font-medium">
                            {t("reviewForm.will_not_be_displayed")}
                        </span>
                        <br/>
                        {errors.email &&
                            <span className='text-xs text-red-500 font-medium'>{errors.email.message}</span>
                        }
                    </div>

                    {/* Отзыв */}
                    <div className='mb-4'>
                        <label className="mb-2 font-semibold">
                            {t("reviewForm.review")}
                        </label>
                        <textarea
                            {...register('comment', {
                                required: t("field_required"),
                            })}
                            className="w-full mt-2 border border-[#d8c3bd] p-2 rounded focus:outline-none focus:border-[var(--active)] focus:ring-[var(--active)] h-32 resize-none"
                            onBlur={() => handleBlur('comment')}
                            placeholder="..."
                        />
                        {errors.comment &&
                            <span className='text-xs text-red-500 font-medium'>{errors.comment.message}</span>}
                    </div>

                    {/* Оценка */}
                    <div className='mb-10'>
                        <label className="mb-2 font-semibold" htmlFor="grade">
                            {t("reviewForm.grade")}
                        </label>
                        <div className="flex gap-2">
                            {Array.from({length: 5}, (_, index) => (
                                <FaRegStar
                                    key={index}
                                    color={index < rating ? '#ffc107' : 'gray'}
                                    size={28}
                                    onClick={() => {
                                        setRating(index + 1);
                                        clearErrors('grade');
                                    }}
                                    className="mt-2 cursor-pointer hover:text-[#ffc107]"
                                />
                            ))}
                        </div>
                        {errors.grade &&
                            <span className='text-xs text-red-500 font-medium'>{errors.grade.message}</span>
                        }
                    </div>

                    {/* Политика конфиденциальности */}
                    <div className="text-sm text-center font-semibold">
                        {t("form.by_submitting_this_form")} {' '}
                        <NavLink
                            to="/privacyPolicy"
                            onClick={handleClick}
                            className="text-[var(--footer)] font-semibold hover:text-[var(--active)] transition"
                        >
                            {t("form.privacy_policy")}
                        </NavLink>{' '}
                        NV-massage.
                    </div>

                    {/* Кнопка отправки */}
                    <div className="text-center pb-8">
                        <button
                            disabled={isLoading}
                            type="submit"
                            className="md:w-2/5 xs:w-fit bg-[#9c776c] md:mt-10 xs:mt-4 text-white py-3 px-6 rounded hover:bg-[#8b6a60] transition"
                        >
                            {isLoading ? t("sending") : t("send")}
                        </button>
                    </div>
                    <p className='text-xs text-justify'>
                        {t("reviewForm.we_kindly_request")}
                    </p>
                    <p className='text-xs mt-2 text-red-500 font-medium'>
                        {t("reviewForm.reviews_are_processed")}
                    </p>
                </form>
            )}
        </div>

    );
}

export default ReviewForm;
