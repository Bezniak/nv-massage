import React from 'react';
import Button from "../../common/Button/Button.jsx";
import {useTranslation} from "react-i18next";

const Introduction = ({title, description}) => {
    const {t} = useTranslation();

    return (
        <div className="bg-down-list bg-no-repeat bg-top-right bg-contain">
            <div
                className='md:container xs:p-4 h-screen mx-auto flex flex-col items-center justify-center md:gap-20 xs:gap-12'>
                <img src="/logoBlack.png" alt="logo NV-massage" className="md:h-28 xs:h-24"/>
                <h1 className="md:text-4xl xs:text-2xl text-center">
                    {title}
                </h1>
                <p className="text-center" style={{lineHeight: '2'}}>
                    {description}
                </p>
                <Button content={t("sign_up_for_massage")} color={'#000'}/>
            </div>
        </div>
    );
};

export default Introduction;
