import React, { useEffect, useState } from 'react';
import ReactMapGL, { FlyToInterpolator, Marker } from '@goongmaps/goong-map-react';
import * as d3 from 'd3-ease';
import { Flex, Image } from '@chakra-ui/react';
import location_icon from '../../assets/images/location_resize.png';

const GOONG_MAP_KEY = 'Vpy7zM578xJZmcYvocXEkW7oyB6njBkPamMfRH0v';
const Map = ({ locations = [] }) => {

    const [viewport, setViewport] = useState({
        latitude: 21.026264,
        longitude: 105.829754,
        zoom: 14
    });

    useEffect(() => {
        if (locations.length > 0) {
            setViewport(prev => ({
                ...prev,
                latitude: locations[0].coordinate[0],
                longitude: locations[0].coordinate[1],
                zoom: 14,
                transitionDuration: 5000,
                transitionInterpolator: new FlyToInterpolator(),
                transitionEasing: d3.easeCubic
            }));
        }
    }, [locations])

    //console.log(locations);
    return (
        <Flex h='100%'>
            <ReactMapGL
                {...viewport}
                width='100%'
                height='100%'
                onViewportChange={nextViewport => setViewport(nextViewport)}
                //mapStyle="https://tiles.goong.io/assets/goong_map.json"
                goongApiAccessToken={GOONG_MAP_KEY}
            >
                {locations.map((item, index) => <Marker key={index} latitude={item.coordinate[0]} longitude={item.coordinate[1]}><Image src={location_icon}/></Marker>)}
            </ReactMapGL>
        </Flex>
    )
}

export default Map;