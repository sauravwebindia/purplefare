import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import {baseStoreURL} from '@/repositories/Repository';
import Link from 'next/link';
import { clearHotelBooking } from '@/store/booking/action';
import { useDispatch } from 'react-redux';

export default function HotelStickSearch () {
    const router = useRouter();
    const dispatch = useDispatch();
    const [cityName,setCityName] = useState("");
    const [totalAdults,setTotalAdults] = useState(null);
    const [checkInDate,setCheckInDate] = useState(null);
    const [checkOutDate,setCheckOutDate] = useState(null);
    const [totalNights, setTotalNights] = useState(1);
    const [searchString,setSearchParams] = useState("");
    const [bookingNight,setBookingNights] = useState(1);
    useEffect(() => {  
        let mounted = true;        
        let searchParams = "";
        let checkInDate = router.query.checkInDate!=undefined?router.query.checkInDate:router.query.checkin;
        let checkOutDate = router.query.checkOutDate!=undefined?router.query.checkInDate:router.query.checkout;
        let adults = router.query.adults;
        let child = router.query.child;
        let childAge = router.query.childAge;
        let searchType = router.query.searchType;
        let searchValue = router.query.searchValue; 
        let searchSource = router.query.searchSource;   
        let rooms = router.query.rooms; 
        let traceId = router.query.traceId;
        let cityName = router.query.cityName;
        searchParams = {'traceId':traceId,'cityName':cityName,'searchSource':searchSource,'searchType':searchType,'searchValue':searchValue,'checkInDate':checkInDate,'checkOutDate':checkOutDate,'adults':adults,'rooms':rooms,'child':child,'childAge':childAge.split(",")};
        var queryString = Object.keys(searchParams).map(function(key) {
            return key + '=' + searchParams[key];
        }).join('&');
        setSearchParams(queryString);
        setCityName(router.query.cityName);
        setTotalAdults(router.query.adults);
        setCheckInDate(router.query.checkin!=undefined?router.query.checkin:router.query.checkInDate);
        setCheckOutDate(router.query.checkout!=undefined?router.query.checkout:router.query.checkOutDate);
        var date1 = new Date(checkInDate);
        var date2 = new Date(checkOutDate);
        var timeDiff = Math.abs(date2.getTime() - date1.getTime());
        var numberOfNights = Math.ceil(timeDiff / (1000 * 3600 * 24)); 
        setBookingNights(numberOfNights);
        return () => mounted = false;
    }, []);

    const handleModifySearchForm = (e) => {
        dispatch(clearHotelBooking);
        router.push(`${baseStoreURL}/hotel-search?${searchString}`);
    }

    return (
        <div className="dmobilehd" onClick={(e) => handleModifySearchForm(e)}>
            <div className="dmobilehdInn">
                <Link href="javascript:;" onClick={() => router.back()}><img src={`${baseStoreURL}/images/back-button.png`} alt="back-button.png" className="dmBack" /></Link>
                <div className="dsearch">
                    <span className="dshotelName">{cityName}</span>
                    <span className="dsotherInfo">{checkInDate} - {checkOutDate}({bookingNight} night, {totalAdults} adults)</span>
                </div>
            </div>
        </div>
    );
}