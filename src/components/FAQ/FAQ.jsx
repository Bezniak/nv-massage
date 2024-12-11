import React, {useState} from 'react';
import useFetchAllData from "../../api/useFetchAllData.js";
import {useAuth} from "../../context/AuthContext.jsx";
import {Preloader} from "../../common/Preloader/Preloader.jsx";
import MetaTags from "../../common/MetaTags.jsx";
import {useTranslation} from "react-i18next";

const Faq = () => {
    const {t} = useTranslation();
    const {locale} = useAuth();
    const {data, loading, error} = useFetchAllData(`/faqs?locale=${locale}&populate=*`);

    // Track multiple open items with an array
    const [openItemIds, setOpenItemIds] = useState([]);

    const toggleItem = (id) => {
        setOpenItemIds((prevIds) =>
            prevIds.includes(id)
                ? prevIds.filter((itemId) => itemId !== id) // Close if it's already open
                : [...prevIds, id] // Open if it's closed
        );
    };

    // Loading and error handling
    if (loading) {
        return <Preloader/>
    }

    if (error) {
        return (
            <div className="flex items-center justify-center h-screen">
                <p className="text-red-500">
                    {t("error_loading")}
                </p>
            </div>
        );
    }

    return (
        <>
            <MetaTags page="faq"/>
            <div>
                <div className="h-screen relative flex items-center justify-center">
                    <img
                        src='/faq.jpg'
                        alt='faq img'
                        className="w-full h-full object-cover"
                    />
                    <div className="overlay"></div>
                    <div
                        className='container text-center w-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 text-soft-white'>
                        <h1 className="xs:text-2xl md:text-3xl">
                            {t("faq.faq")}
                        </h1>
                    </div>
                </div>
                <div className='bg-twoDown top-left bg-no-repeat'>
                    <div className="md:container xs:p-4 mx-auto px-4 mt-12 mb-20">
                        <h2 className='text-center text-2xl mb-5'>
                            {t("faq.most_frequently_asked_questions")}
                        </h2>
                        <p className='text-center mb-10 text-lg'>
                            {t("faq.answered_some_questions")}
                        </p>
                        <div className="flex flex-wrap gap-8">
                            {data?.map((item) => (
                                <div
                                    id={`accordion-collapse-${item.id}`}
                                    key={item.id}
                                    className="md:w-2/5 xs:w-full mx-auto"
                                >
                                    <h2 id={`accordion-collapse-heading-${item.id}`}>
                                        <button
                                            type="button"
                                            className="flex items-center justify-between w-full p-5 font-medium border border-[var(--footer)] rounded"
                                            onClick={() => toggleItem(item.id)}
                                            aria-expanded={openItemIds.includes(item.id)}
                                            aria-controls={`accordion-collapse-body-${item.id}`}
                                        >
                                            <span className="text-lg">{item.ask}</span>
                                            <svg
                                                data-accordion-icon
                                                className={`w-3 h-3 shrink-0 transform ${
                                                    openItemIds.includes(item.id) ? "" : "rotate-180"
                                                }`}
                                                aria-hidden="true"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 10 6"
                                            >
                                                <path
                                                    stroke="currentColor"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="M9 5 5 1 1 5"
                                                />
                                            </svg>
                                        </button>
                                    </h2>
                                    <div
                                        id={`accordion-collapse-body-${item.id}`}
                                        className={`${openItemIds.includes(item.id) ? "" : "hidden"}`}
                                        aria-labelledby={`accordion-collapse-heading-${item.id}`}
                                    >
                                        <div className="text-lg px-2 text-justify mt-3">
                                            <p className="mb-2 text-gray-500">{item.answer}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Faq;
