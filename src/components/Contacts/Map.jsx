import React, {useEffect, useState} from 'react';
import {MapContainer, Marker, Popup, TileLayer} from 'react-leaflet';
import L from 'leaflet';
import {Preloader} from "../../common/Preloader/Preloader.jsx";
import 'leaflet/dist/leaflet.css';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerIconShadow from 'leaflet/dist/images/marker-shadow.png';
import {useTranslation} from "react-i18next";


// Настраиваем иконку маркера
const defaultIcon = new L.Icon({
    iconUrl: markerIcon,
    shadowUrl: markerIconShadow,
    iconAnchor: [12, 41],
    popupAnchor: [0, -41]
});

L.Marker.prototype.options.icon = defaultIcon;

const Map = () => {
    const {t} = useTranslation();
    const coordinateString = '53.148179, 26.039851';
    const [coordinate, setCoordinate] = useState(null);

    useEffect(() => {
        if (coordinateString) {
            const [lat, lng] = coordinateString.split(',').map(parseFloat);
            setCoordinate([lat, lng]);
        }
    }, [coordinateString]);

    return (
        <div className="filter grayscale">
            {coordinate ? (
                <MapContainer
                    center={coordinate}
                    zoom={13}
                    className="h-[600px] w-full"
                >
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png"
                    />
                    <Marker position={coordinate}>
                        <Popup className="text-center">
                            ${t("address")} <br/> ${t('welcome')}
                        </Popup>
                    </Marker>
                </MapContainer>
            ) : (
                <Preloader/>
            )}
        </div>
    );
};

export default Map;
