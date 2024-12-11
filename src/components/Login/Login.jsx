import React, {useState} from 'react';
import {useForm} from 'react-hook-form';
import {useTranslation} from "react-i18next";
import {useAuth} from "../../context/AuthContext.jsx";
import {useNavigate} from "react-router-dom";
import api from "../../api/api.js";
import MetaTags from "../../common/MetaTags.jsx";

const Login = () => {
    const {t} = useTranslation();
    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm();
    const [error, setError] = useState('');
    const {login} = useAuth();
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const onSubmit = async (data) => {
        setIsSubmitting(true);
        setError('');

        try {
            const response = await api.post('/auth/local', {
                identifier: data.email,
                password: data.password
            });
            login(response);
            navigate('/');
        } catch (error) {
            if (error?.response?.data?.error) {
                const strapiErrorMessage = error.response.data.error.message;
                setError(strapiErrorMessage);
            } else {
                setError(t("an_unexpected_error_occurred"));
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <MetaTags page="login"/>
            <div className="h-screen relative flex items-center justify-center">
                <img
                    src='/login.jpg'
                    alt='login'
                    className="w-full h-full object-cover"
                />
                <div className="overlay"></div>
                <div className="absolute z-10 flex justify-center items-center w-full">
                    <form
                        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md z-50"
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <div className="relative z-0 w-full mb-10 group">
                            <input
                                type="email"
                                id="email"
                                {...register("email", {
                                    required: t("field_required"),
                                    pattern: {
                                        value: /^\S+@\S+$/i,
                                        message: t("valid_email_address"),
                                    }
                                })}
                                className="block py-2.5 px-0 w-full text-sm text-[var(--footer)] bg-transparent border-0 border-b-2 border-[var(--footer)] appearance-none focus:outline-none focus:ring-0 focus:border-[var(--active)] peer"
                                placeholder=" "
                            />
                            <label
                                htmlFor="email"
                                className="peer-focus:font-medium absolute text-sm text-[var(--footer)] duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-[var(--green)] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                            >
                                {t("logIn")}
                            </label>
                            {errors.email && <p className="text-red-500 text-xs mt-2">{errors.email.message}</p>}
                        </div>
                        <div className="relative z-0 w-full group mb-10">
                            <input
                                type="password"
                                id="password"
                                {...register("password", {required: t("field_required")})}
                                className="block py-2.5 px-0 w-full text-sm text-[var(--footer)] bg-transparent border-0 border-b-2 border-[var(--footer)] appearance-none focus:outline-none focus:ring-0 focus:border-[var(--active)] peer"
                                placeholder=" "
                            />
                            <label
                                htmlFor="password"
                                className="peer-focus:font-medium absolute text-sm text-[var(--footer)] duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-[var(--green)] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                            >
                                {t("password")}
                            </label>
                            {errors.password && <p className="text-red-500 text-xs mt-2">{errors.password.message}</p>}
                        </div>

                        {error && (
                            <div className="text-red-500 text-sm mb-10 text-center">
                                {error}
                            </div>
                        )}
                        <div className='text-center'>
                            <button
                                type="submit"
                                className="w-fit bg-[#9c776c] text-white py-2 px-8 rounded hover:bg-[#8b6a60] transition"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? t("sending") : t("login")}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Login;
