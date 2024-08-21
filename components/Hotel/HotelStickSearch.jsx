import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import {baseStoreURL} from '@/repositories/Repository';
import Link from 'next/link';

export default function HotelStickSearch () {
    const router = useRouter();
    const [cityName,setCityName] = useState("");
    const [checkInDate,setCheckInDate] = useState(null);
    const [checkOutDate,setCheckOutDate] = useState(null);
    const [totalNights, setTotalNights] = useState(1);
    useEffect(() => {
        let mounted = true;
        let searchParams = null;
        try{
            searchParams = localStorage.getItem('searchParams');
        }catch(e){

        }
        if(searchParams!=null){
            let searchParamsArray = JSON.parse(searchParams);
            let checkInDate = searchParamsArray.checkin;
            setCheckInDate(checkInDate);
            let checkOutDate = searchParamsArray.checkout;
            setCheckOutDate(checkOutDate);
            let adults = searchParamsArray.adults;
            let child = searchParamsArray.child;
            let childAge = searchParamsArray.childAge;
            let searchType = searchParamsArray.searchType;
            let searchValue = searchParamsArray.searchValue;    
            let rooms = searchParamsArray.rooms; 
            let traceId = "";
            let city = searchParamsArray.cityName;
            setCityName(city);
        }
        return () => mounted = false;
    }, []);
    if(checkInDate!=null){
    return (
        <div className="dmobilehd">
            <div className="dmobilehdInn">
                <Link href="javascript:;"><img src={`${baseStoreURL}/images/back-button.png`} alt="back-button.png" className="dmBack" /></Link>
                <div className="dsearch">
                    <span className="dshotelName">{cityName}</span>
                    <span className="dsotherInfo">{new Date(checkInDate)} - {new Date(checkOutDate)} (1 night, 2 adults)</span>
                </div>
            </div>
        </div>
    );
    }else{
        return "";
    }
}