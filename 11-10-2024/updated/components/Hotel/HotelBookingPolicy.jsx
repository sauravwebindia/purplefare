import React, { useEffect,useState } from 'react';
import { useRouter } from 'next/router'; 
import parse from 'html-react-parser';

export default function HotelBookingPolicy(props){
    const Router = useRouter();
    const [bookingPolicy,setBookingPolicy] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {  
        let mounted = true;
        if(props==null || props=='' || props==undefined){
            Router.push('/');
        }
        if(props.hotel==null || props.hotel=='' || props.hotel==undefined){
            Router.push('/');
        }
        if(props.hotel.booking_policy!=undefined){
            setBookingPolicy(props.hotel.booking_policy);
            setLoading(false);
        }
        return () => mounted = false;
    }, []);  

    if(!loading){
        return (
            <div className="dtalsTab bookingBox" id="bookingpolicyid">
                <h2>Booking Policy</h2>
                {parse(`${bookingPolicy}`)}
            </div>
        );
    }else{
        return "";
    }   
}