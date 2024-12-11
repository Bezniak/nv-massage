import React, {useState} from 'react';
import {useForm} from 'react-hook-form';
import {NavLink} from 'react-router-dom';
import {animateScroll as scroll} from 'react-scroll';
import {useTranslation} from "react-i18next";

function Form() {
    const {t} = useTranslation();
    const {
        register,
        handleSubmit,
        formState: {errors},
        reset,
    } = useForm();
    const [isEmailSent, setIsEmailSent] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = async (data) => {
        setIsLoading(true);

        const botToken = import.meta.env.VITE_TELEGRAM_BOT_TOKEN_FEEDBACK;
        const chatId = import.meta.env.VITE_TELEGRAM_CHAT_ID_FEEDBACK;
        const message = `
      Имя: ${data.name}
      Email: ${data.email}
      Телефон: ${data.phone}
      Тема: ${data.topic}
      Сообщение: ${data.message}
    `;

        try {
            const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    chat_id: chatId,
                    text: message,
                }),
            });

            if (response.ok) {
                setIsEmailSent(true);
                reset(); // Сброс формы
            } else {
                console.error('Ошибка при отправке сообщения');
            }
        } catch (error) {
            console.error('Ошибка сети:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleClick = () => {
        scroll.scrollToTop({
            duration: 0,
            smooth: 'easeInOutQuad',
        });
    };

    return (
        <div
            className="md:w-4/6 xs:w-full mx-auto bg-transparent px-8 xs:mt-8 md:mt-0 rounded shadow-md space-y-2 text-[#68564e] font-sans">
            {isEmailSent ? (
                <h2 className="text-xl font-bold text-center">
                    {t("form.letter_sent")} <br/> {t("form.we_will_contact_you_shortly")}
                </h2>
            ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
                    <h2 className=" text-center text-2xl mb-5">
                        {t("form.feedback")}
                    </h2>
                    <p className="text-center">
                        {t("form.have_any_questions")}
                    </p>

                    <div className="space-y-2">
                        <label htmlFor="name" className="block font-medium">
                            {t("name")}
                        </label>
                        <input
                            type="text"
                            id="name"
                            {...register('name', {required: true})}
                            placeholder={t("EKATERINA_SERGEEVNA")}
                            className="w-full border border-[#d8c3bd] p-2 rounded focus:outline-none focus:border-[var(--active)] focus:ring-[var(--active)]"
                        />
                        {errors.name && <span className="text-red-500 text-sm">{t("field_required")}</span>}
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="email" className="block font-medium">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            {...register('email', {
                                required: true,
                                pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            })}
                            placeholder="GMAIL@GMAIL.COM"
                            className="w-full border border-[#d8c3bd] p-2 rounded focus:outline-none focus:border-[var(--active)] focus:ring-[var(--active)]"
                        />
                        {errors.email && <span className="text-red-500 text-sm">{t("field_required")}</span>}
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="phone" className="block font-medium">
                            {t("telephone")}
                        </label>
                        <input
                            type="text"
                            id="phone"
                            {...register('phone', {
                                required: true,
                                pattern: /^\+?[0-9()-]{7,}$/,
                            })}
                            placeholder="+375 (29) 222 22 22"
                            className="w-full border border-[#d8c3bd] p-2 rounded focus:outline-none focus:border-[var(--active)] focus:ring-[var(--active)]"
                        />
                        {errors.phone && <span className="text-red-500 text-sm">{t("field_required")}</span>}
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="topic" className="block font-medium">
                            {t("form.topic")}
                        </label>
                        <input
                            type="text"
                            id="topic"
                            {...register('topic', {required: true})}
                            placeholder="..."
                            className="w-full border border-[#d8c3bd] p-2 rounded focus:outline-none focus:border-[var(--active)] focus:ring-[var(--active)]"
                        />
                        {errors.topic && <span className="text-red-500 text-sm">{t("field_required")}</span>}
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="message" className="block font-medium">
                            {t("form.message")}
                        </label>
                        <textarea
                            id="message"
                            {...register('message', {required: true})}
                            placeholder={t("form.your_message")}
                            className="w-full border border-[#d8c3bd] p-2 rounded focus:outline-none focus:border-[var(--active)] focus:ring-[var(--active)] h-32"
                        />
                        {errors.message && <span className="text-red-500 text-sm">{t("field_required")}</span>}
                    </div>

                    <div className="text-sm text-center">
                        ${t("form.by_submitting_this_form")} {' '}
                        <NavLink
                            to="/privacyPolicy"
                            onClick={handleClick}
                            className="text-[var(--footer)] font-semibold hover:text-[var(--active)] transition"
                        >
                            {t("form.privacy_policy")}
                        </NavLink>{' '}
                        NV-massage.
                    </div>

                    <div className="text-center pb-8">
                        <button
                            disabled={isLoading}
                            type="submit"
                            className="w-2/5 bg-[#9c776c] md:mt-10 xs:mt-4 text-white py-3 px-6 rounded hover:bg-[#8b6a60] transition"
                        >
                            {isLoading ? t("sending") : t("send")}
                        </button>
                    </div>
                </form>
            )}
        </div>
    );
}

export default Form;
