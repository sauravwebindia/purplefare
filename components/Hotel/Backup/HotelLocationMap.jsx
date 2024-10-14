import React, { useEffect,useState } from 'react';
import { useRouter } from 'next/router'; 
import GoogleMapReact from 'google-map-react';
import {markerStyle} from '@/utilities/marker-place.js';
const LocationMarker = ({ text }) => <div style={markerStyle}>{text}</div>;

export default function HotelLocationMap(props){
    const Router = useRouter();
    const defaultProps = {
        center: {
            lat: props.hotel.lat,
            lng: props.hotel.lng
        },
        zoom: 15
    };
    useEffect(() => {  
        let mounted = true;
        if(props==null || props=='' || props==undefined){
            Router.push('/');
        }
        if(props.hotel==null || props.hotel=='' || props.hotel==undefined){
            Router.push('/');
        }
        return () => mounted = false;
    }, []);  


    return (
        <div className="dtalsTab locationBox" id="locationid">
            <h2>Location</h2>
            <div className="locationMap" style={{ height: '100vh', width: '100%' }}>
            <GoogleMapReact
                bootstrapURLKeys={{ key: "AIzaSyCaHYzVRcE45ESprCDybG0POCki36YtGAc" }}
                center={defaultProps.center}
                zoom={defaultProps.zoom}
            >
                <LocationMarker
                    lat={props.hotel.lat}
                    lng={props.hotel.lng}
                    text={props.hotel.name}
                />
            </GoogleMapReact>
            </div>
        </div>
    );
}