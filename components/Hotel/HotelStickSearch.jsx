import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import {baseStoreURL} from '@/repositories/Repository';
import Link from 'next/link';

export default function HotelStickSearch () {
    const router = useRouter();
    const [cityName,setCityName] = useState("");
    useEffect(() => {
        let mounted = true;
        let checkInDate = router.query.checkin;
        let checkOutDate = router.query.checkout;
        let adults = router.query.adults;
        let child = router.query.child;
        let childAge = router.query.childAge;
        let searchType = router.query.searchType;
        let searchValue = router.query.searchValue;    
        let rooms = router.query.rooms; 
        let traceId = "";
        let city = router.query.cityName;
        try{
            if(city==''){
                city = localStorage.getItem('cityName');
            }
        }catch(e){
            city = "";
        }
        setCityName(city);
        return () => mounted = false;
    }, []);

    return (
        <div className="dmobilehd">
            <div className="dmobilehdInn">
                <Link href="javascript:;"><img src={`${baseStoreURL}/images/back-button.png`} alt="back-button.png" className="dmBack" /></Link>
                <div className="dsearch">
                    <span className="dshotelName">{cityName}</span>
                    <span className="dsotherInfo">Tue, Jun 18 - Wed, Jun 19 (1 night, 2 adults)</span>
                </div>
            </div>
        </div>
    );
}