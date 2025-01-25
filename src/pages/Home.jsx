import React from 'react';
import Slider from "../components/Slider/Slider.jsx";
import Introduction from "../components/Introduction/Introduction.jsx";
import PhotoCollection from "../components/PhotoCollection/PhotoCollection.jsx";
import MetaTags from "../common/MetaTags.jsx";
import {useTranslation} from "react-i18next";
import { motion, useInView } from 'framer-motion';

const Home = () => {
    const {t} = useTranslation();

    return (
        <>
            <MetaTags page="home"/>
            <div className='overflow-hidden'>
                <SectionWrapper>
                    <Slider />
                </SectionWrapper>
                <SectionWrapper>
                    <Introduction
                        title={t("home.welcome_place_peace")}
                        description={t("home.everyone_looking_for_place")}
                    />
                </SectionWrapper>
                <SectionWrapper>
                    <PhotoCollection title={t("home.detailed_look_into_world")} />
                </SectionWrapper>
                <SectionWrapper>
                    <Introduction
                        title={t("home.cozy_corner")}
                        description={t("home.relax_with_massage")}
                    />
                </SectionWrapper>
            </div>
        </>
    );
};

const SectionWrapper = ({ children }) => {
    const ref = React.useRef(null);
    const inView = useInView(ref, { once: true });

    return (
        <motion.div
            ref={ref}
            initial={{opacity: 0, y: 100}}
            animate={{opacity: inView ? 1 : 0, y: inView ? 0 : 100}}
            transition={{duration: 0.6, ease: "easeOut"}}
            className="mb-16"
        >
            {children}
        </motion.div>
    );
};

export default Home;
