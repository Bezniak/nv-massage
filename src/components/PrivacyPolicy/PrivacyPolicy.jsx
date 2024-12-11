import React from 'react';
import MetaTags from "../../common/MetaTags.jsx";
import {useTranslation} from "react-i18next";

const PrivacyPolicy = () => {
    const {t} = useTranslation();


    return (
        <>
            <MetaTags page="privacyPolicy"/>
            <div>
                <div className="h-screen relative flex items-center justify-center">
                    <img
                        src='/privacyPolicy.jpg'
                        alt='privacy Policy img'
                        className="w-full h-full object-cover"
                    />
                    <div className="overlay"></div>
                    <div
                        className='container text-center w-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 text-soft-white'>
                        <h1 className="xs:text-2xl md:text-3xl">
                            {t("privacyPolicy.privacy_policy")}
                        </h1>
                    </div>
                </div>
                <div className='container mx-auto mt-10 mb-10'>
                    <h2 className='font-semibold mb-3'>
                        {t("privacyPolicy.introduction")}
                    </h2>
                    <p className='pl-8 text-justify'>
                        {t("privacyPolicy.massage_parlor")}
                    </p>
                    <ul className='pl-12'>
                        <li>{t("privacyPolicy.complies_protection_laws")}</li>
                        <li>{t("privacyPolicy.respects_right_privacy")}</li>
                        <li>{t("privacyPolicy.openly_discloses")}</li>
                        <li>{t("privacyPolicy.protects_itself")}</li>
                    </ul>
                    <p className='pl-8 text-justify'>
                        {t("privacyPolicy.privacy_policy_applies")}
                    </p>

                    <h2 className='font-semibold mb-3 mt-3 text-justify'>
                        {t("privacyPolicy.we_collect_personal_data")}
                    </h2>
                    <p className='pl-8 text-justify'>
                        {t("privacyPolicy.collect_personal_data_when")}
                    </p>
                    <p className='pl-8 text-justify'>
                        {t("privacyPolicy.use_analytics_tracking")}
                    </p>
                    <p className='pl-8 text-justify'>
                        {t("privacyPolicy.knowingly_collect_personal_data")}
                    </p>

                    <h2 className='font-semibold mb-3 mt-3'>
                        {t("privacyPolicy.use_your_personal_data")}
                    </h2>
                    <p className='pl-8 text-justify'>
                        {t("privacyPolicy.we_set_out")}
                    </p>
                    <ul className='pl-12'>
                        <li>{t("privacyPolicy.general_categories")}</li>
                        <li>{t("privacyPolicy.purposes_for_which")}</li>
                        <li>{t("privacyPolicy.legal_basis__processing")}</li>
                    </ul>
                    <p className='pl-8 text-justify'>
                        {t("privacyPolicy.do_not_process_personal")}
                    </p>
                    <p className='pl-8 text-justify'>
                        {t("privacyPolicy.usage_data")}
                    </p>
                    <p className='pl-8 text-justify'>
                        {t("privacyPolicy.enquiry_data")}
                    </p>
                    <p className='pl-8 text-justify'>
                        {t("privacyPolicy.customer_relationship_data")}
                    </p>
                    <p className='pl-8 text-justify'>
                        {t("privacyPolicy.necessary_establishment")}
                    </p>
                    <p className='pl-8 text-justify'>
                        {t("privacyPolicy.specific_purposes")}
                    </p>
                    <p className='pl-8 text-justify'>
                        {t("privacyPolicy.balance_potential_impact")}
                    </p>

                    <h2 className='font-semibold mb-3 mt-3'>
                        {t("privacyPolicy.providing_data_others")}
                    </h2>
                    <p className='pl-8 text-justify'>
                        {t("privacyPolicy.do_not_sell_information")}
                    </p>
                    <p className='pl-8 text-justify'>
                        {t("privacyPolicy.do_not_share")}
                    </p>

                    <h2 className='font-semibold mb-3 mt-3'>
                        {t("privacyPolicy.international_transfer")}
                    </h2>
                    <p className='pl-8 text-justify'>
                        {t("privacyPolicy.data_provided_to_us")}
                    </p>

                    <h2 className='font-semibold mb-3 mt-3'>
                        {t("privacyPolicy.your_rights")}
                    </h2>
                    <p className='pl-8 text-justify'>
                        {t("privacyPolicy.you_have_the_right")}
                    </p>
                    <p className='pl-8 text-justify'>
                        {t("privacyPolicy.right_rectification")}
                    </p>
                    <p className='pl-8 text-justify'>
                        {t(".privacyPolicy.right_erasure")}
                    </p>
                    <ul className='pl-12'>
                        <li>
                            {t("privacyPolicy.no_longer_necessary")}
                        </li>
                        <li>
                            {t("privacyPolicy.withdraw_consent")}
                        </li>
                        <li>
                            {t("privacyPolicy.object_processing")}
                        </li>
                        <li>
                            {t("privacyPolicy.processed_unlawfully")}
                        </li>
                    </ul>
                    <p className='pl-8 text-justify'>
                        {t("privacyPolicy.exceptions_right_erasure")}
                    </p>

                    <p className='pl-8 text-justify'>
                        {t("privacyPolicy.right_restrict_processing")}
                    </p>
                    <ul className='pl-12'>
                        <li>
                            {t("privacyPolicy.dispute_the_accuracy")}
                        </li>
                        <li>
                            {t("privacyPolicy.processing_unlawful")}
                        </li>
                        <li>
                            {t("privacyPolicy.no_need_personal_data")}
                        </li>
                    </ul>
                    <p className='pl-8 text-justify'>
                        {t("privacyPolicy.processing_has_been_restricted")}
                    </p>
                    <p className='pl-8 text-justify'>
                        {t("privacyPolicy.right_to_object_data")}
                    </p>
                    <p className='pl-8 text-justify'>
                        {t("privacyPolicy.right_to_data_portability")}
                    </p>
                    <p className='pl-8 text-justify'>
                        {t("privacyPolicy.right_to_complaint")}
                    </p>
                    <p className='pl-8 text-justify'>
                        {t("privacyPolicy.may_exercise_rights")}
                    </p>
                    <p className='pl-8 text-justify'>
                        {t("privacyPolicy.choice_receive_information")}
                    </p>

                    <h2 className='font-semibold mb-3 mt-3'>
                        {t("privacyPolicy.saving_deleting_data")}
                    </h2>
                    <p className='pl-8 text-justify'>
                        {t("privacyPolicy.data_retention_policies")}
                    </p>
                    <p className='pl-8 text-justify'>
                        {t("privacyPolicy.kept_longer")}
                    </p>
                    <p className='pl-8 text-justify'>
                        {t("privacyPolicy.store_data")}
                    </p>
                    <ul className='pl-12'>
                        <li>
                            {t("privacyPolicy.data_collected")}
                        </li>
                        <li>
                            {t("privacyPolicy.stored_for_interested")}
                        </li>
                    </ul>
                    <p className='pl-8 text-justify'>
                        {t("privacyPolicy.retain_data")}
                    </p>

                    <h2 className='font-semibold mb-3 mt-3'>
                        {t("privacyPolicy.technical_aspects")}
                    </h2>
                    <p className='pl-8 text-justify'>
                        {t("privacyPolicy.appropriate_technical")}
                    </p>
                    <p className='pl-8 text-justify'>
                        {t("privacyPolicy.transferred_via_internet")}
                    </p>
                    <p className='pl-8 text-justify'>
                        {t("privacyPolicy.accepted_industry_standards")}
                    </p>
                    <p className='pl-8 text-justify'>
                        {t("privacyPolicy.electronic_storage")}
                    </p>
                    <p className='pl-8 text-justify'>
                        {t("privacyPolicy.security_breach")}
                    </p>

                    <h2 className='font-semibold mb-3 mt-3'>
                        {t("privacyPolicy.cookies")}
                    </h2>
                    <p className='pl-8 text-justify'>
                        {t("privacyPolicy.file_containing")}
                    </p>
                    <p className='pl-8 text-justify'>
                        {t("privacyPolicy.before_using_website")}
                    </p>
                    <p className='pl-8 text-justify'>
                        {t("privacyPolicy.use_cookies")}
                    </p>
                    <ul className='pl-12'>
                        <li>
                            {t("privacyPolicy.authentication")}
                        </li>
                        <li>
                            {t("privacyPolicy.analysis")}
                        </li>
                    </ul>
                    <p className='pl-8 text-justify'>
                        {t("privacyPolicy.stored_on_computer")}
                    </p>
                    <p className='pl-8 text-justify'>
                        {t("privacyPolicy.do_not_want_cookies")}
                    </p>
                    <p className='pl-8 text-justify'>
                        {t("privacyPolicy.blocking_all_cookies")}
                    </p>

                    <h2 className='font-semibold mb-3 mt-3'>
                        {t("privacyPolicy.other_information")}
                    </h2>
                    <p className='pl-8 text-justify'>
                        {t("privacyPolicy.update_privacy_policy")}
                    </p>
                    <p className='pl-8 text-justify'>
                        {t("privacyPolicy.check_this_page")}
                    </p>
                </div>
            </div>
        </>
    );
};

export default PrivacyPolicy;