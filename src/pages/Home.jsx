import React from 'react';
import Slider from "../components/Slider/Slider.jsx";
import Introduction from "../components/Introduction/Introduction.jsx";
import PhotoCollection from "../components/PhotoCollection/PhotoCollection.jsx";
import MetaTags from "../common/MetaTags.jsx";
import {useTranslation} from "react-i18next";

const Home = () => {
    const {t} = useTranslation();


    return (
        <>
            <MetaTags page="home"/>
            <div className='overflow-hidden'>
                <Slider/>
                <Introduction title={t("home.welcome_place_peace")}
                              description={t("home.everyone_looking_for_place")}
                />
                <PhotoCollection title={t("home.detailed_look_into_world")}/>
                <Introduction title={t("home.cozy_corner")}
                              description={t("home.relax_with_massage")}
                />
            </div>
        </>
    );
};

export default Home;