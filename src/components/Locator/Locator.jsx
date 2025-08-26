import { useEffect } from "react";

const Locator = () => {
    useEffect(() => {
        const CONFIGURATION = {
            locations: [
                {
                    title: "NV-MASSAGE",
                    address1: "ул. Кирова, 68 (2 этаж)",
                    address2: "Барановичи, Брестская область, Belarus",
                    coords: { lat: 53.1437811, lng: 26.0430961 },
                    placeId: "ChIJ29f_7YrR2EYRD4B-IEwj8vM",
                },
            ],
            mapOptions: {
                center: { lat: 38.0, lng: -100.0 },
                fullscreenControl: true,
                mapTypeControl: false,
                streetViewControl: false,
                zoom: 4,
                zoomControl: true,
                maxZoom: 17,
                mapId: "",
            },
            mapsApiKey: "YOUR_API_KEY_HERE", // Замени на свой API-ключ
            capabilities: {
                input: true,
                autocomplete: true,
                directions: false,
                distanceMatrix: true,
                details: false,
                actions: false,
            },
        };

        const initLocator = async () => {
            await customElements.whenDefined("gmpx-store-locator");
            const locator = document.querySelector("gmpx-store-locator");
            if (locator) locator.configureFromQuickBuilder(CONFIGURATION);
        };

        initLocator();
    }, []);

    return (
        <div style={{ width: "100%", height: "100vh" }}>
            <script
                type="module"
                src="https://ajax.googleapis.com/ajax/libs/@googlemaps/extended-component-library/0.6.11/index.min.js"
            ></script>

            <gmpx-api-loader key="YOUR_API_KEY_HERE" solution-channel="GMP_QB_locatorplus_v11_cABD"></gmpx-api-loader>
            <gmpx-store-locator map-id="DEMO_MAP_ID"></gmpx-store-locator>
        </div>
    );
};

export default Locator;
