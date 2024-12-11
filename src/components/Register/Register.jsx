import React, {useState} from 'react';
import {useForm} from 'react-hook-form';
import {useNavigate} from "react-router-dom";
import {useAuth} from "../../context/AuthContext.jsx";
import {useTranslation} from "react-i18next";
import api from "../../api/api.js";
import MetaTags from "../../common/MetaTags.jsx";


const Register = () => {
    const {t} = useTranslation();
    const {register, handleSubmit, watch, formState: {errors}, trigger} = useForm();
    const password = watch('password');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const navigate = useNavigate();
    const {login} = useAuth();

    const onSubmit = async (data) => {
        // Исключить повторный пароль из данных
        setIsSubmitting(true);
        const {repeat_password, ...formData} = data;

        try {
            const response = await api.post('/auth/local/register', formData);
            login(response);
            navigate('/');
        } catch (error) {
            console.error('Error submitting data:', error);

            // Проверка статуса ошибки
            if (error.response && error.response.status === 400) {
                const errorMessage = error.response.data?.error?.message;

                if (errorMessage.includes('Email or Username are already taken')) {
                    setErrorMessage(t("user_already_exists"));
                } else {
                    setErrorMessage(errorMessage || t('an_unexpected_error_occurred'));
                }
            } else {
                setErrorMessage(t('an_unexpected_error_occurred'));
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <MetaTags page="register"/>
            <div className="h-screen relative flex items-center justify-center">
                <img
                    src='/login.jpg'
                    alt='login'
                    className="w-full h-full object-cover"
                />
                <div className="overlay"></div>
                <div className="absolute z-10 flex justify-center items-center w-full">
                    <form onSubmit={handleSubmit(onSubmit)}
                          className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                        <div className="relative z-0 w-full mb-5 group">
                            <input
                                type="text"
                                name="username"
                                id="username"
                                {...register('username', {required: true})}
                                onBlur={() => trigger('username')}
                                className="block py-2.5 px-0 w-full text-sm text-[var(--footer)] bg-transparent border-0 border-b-2 border-[var(--footer)] appearance-none focus:outline-none focus:ring-0 focus:border-[var(--active)] peer"
                                placeholder=" "
                            />
                            <label htmlFor="username"
                                   className="peer-focus:font-medium absolute text-sm text-[var(--footer)] duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-[var(--green)] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                            >
                                {t("name")}
                            </label>
                            {errors.username && (
                                <span className="text-red-500 text-sm">
                                    {t("field_required")}
                                </span>
                            )}
                        </div>

                        <div className="relative z-0 w-full mb-5 group">
                            <input
                                type="email"
                                name="email"
                                id="email"
                                {...register('email', {
                                    required: t("field_required"),
                                    pattern: {
                                        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                        message: t("valid_email_address"),
                                    }
                                })}
                                onBlur={() => trigger('email')}
                                className="block py-2.5 px-0 w-full text-sm text-[var(--footer)] bg-transparent border-0 border-b-2 border-[var(--footer)] appearance-none focus:outline-none focus:ring-0 focus:border-[var(--active)] peer"
                                placeholder=" "
                            />
                            <label htmlFor="email"
                                   className="peer-focus:font-medium absolute text-sm text-[var(--footer)] duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-[var(--green)] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                            >
                                {t("enter_email")}
                            </label>
                            {errors.email && (
                                <span className="text-red-500 text-sm">{errors.email.message}</span>
                            )}
                        </div>

                        <div className="relative z-0 w-full mb-5 group">
                            <input
                                type="password"
                                name="password"
                                id="password"
                                {...register('password', {required: true, minLength: 6})}
                                onBlur={() => trigger('password')}
                                className="block py-2.5 px-0 w-full text-sm text-[var(--footer)] bg-transparent border-0 border-b-2 border-[var(--footer)] appearance-none focus:outline-none focus:ring-0 focus:border-[var(--active)] peer"
                                placeholder=" "
                            />
                            <label htmlFor="password"
                                   className="peer-focus:font-medium absolute text-sm text-[var(--footer)] duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-[var(--green)] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                            >
                                {t("password")}
                            </label>
                            {errors.password && (
                                <span className="text-red-500 text-sm">
                            {errors.password.type === 'minLength' ? t("password_6_characters") : t("field_required")}
                        </span>
                            )}
                        </div>

                        <div className="relative z-0 w-full mb-5 group">
                            <input
                                type="password"
                                name="repeat_password"
                                id="repeat_password"
                                {...register('repeat_password', {
                                    required: true,
                                    validate: value => value === password
                                })}
                                onBlur={() => trigger('repeat_password')}
                                className="block py-2.5 px-0 w-full text-sm text-[var(--footer)] bg-transparent border-0 border-b-2 border-[var(--footer)] appearance-none focus:outline-none focus:ring-0 focus:border-[var(--active)] peer"
                                placeholder=" "
                            />
                            <label htmlFor="repeat_password"
                                   className="peer-focus:font-medium absolute text-sm text-[var(--footer)] duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-[var(--green)] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                            >
                                {t("confirm_password")}
                            </label>
                            {errors.repeat_password && (
                                <span className="text-red-500 text-sm">
                            {errors.repeat_password.type === 'validate' ? t("passwords_do_not_match") : t("field_required")}
                        </span>
                            )}
                        </div>

                        <div className="relative z-0 w-full mb-10 group">
                            <input
                                type="tel"
                                name="userphone"
                                id="userphone"
                                {...register('userphone', {
                                    required: true,
                                    pattern: /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]{7,14}$/
                                })}
                                onBlur={() => trigger('userphone')}
                                className="block py-2.5 px-0 w-full text-sm text-[var(--footer)] bg-transparent border-0 border-b-2 border-[var(--footer)] appearance-none focus:outline-none focus:ring-0 focus:border-[var(--active)] peer"
                                placeholder=" "
                            />
                            <label htmlFor="userphone"
                                   className="peer-focus:font-medium absolute text-sm text-[var(--footer)] duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-[var(--green)] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                            >
                                {t("telephone")}
                            </label>
                            {errors.userphone && (
                                <span className="text-red-500 text-sm">
                                    {errors.userphone.type === 'pattern' ? t("enter_valid_phone_number") : t("field_required")}
                                </span>
                            )}
                        </div>
                        {errorMessage && (
                            <div className="text-red-500 text-sm mb-10 text-center">
                                {errorMessage}
                            </div>
                        )}
                        <div className='text-center'>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-fit bg-[#9c776c] text-white py-2 px-8 rounded hover:bg-[#8b6a60] transition"
                            >
                                {isSubmitting ? t("registration") : t("register")}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Register;