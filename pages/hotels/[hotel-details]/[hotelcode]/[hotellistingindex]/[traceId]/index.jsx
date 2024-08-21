import React, {useEffect,useState,Fragment} from 'react';
import { useRouter } from 'next/router'; 
import { baseUrl } from '@/repositories/Repository';
import NavHeader from '@/components/layouts/NavHeader';
import HotelStickSearch from '@/components/Hotel/HotelStickSearch';
import Breadcrumb from '@/components/layouts/Breadcrumb';
import HotelOverview from '@/components/Hotel/HotelOverview';
import HotelDetailImages from '@/components/Hotel/HotelDetailImages';
import MobileStickyHotelPrice  from '@/components/Hotel/MobileStickyHotelPrice';
import HotelDetailsRoomsSelection from '@/components/Hotel/HotelDetailsRoomsSelection';
import {isMobile,isTablet,MobileView, BrowserView} from "react-device-detect";
import HotelAboutOverview from '@/components/Hotel/HotelAboutOverview';
import HotelAmenities from '@/components/Hotel/HotelAmenities';
import HotelLocationMap from '@/components/Hotel/HotelLocationMap';
import HotelBookingPolicy from '@/components/Hotel/HotelBookingPolicy';
import HotelReviewsRatings from '@/components/Hotel/HotelReviewsRatings';
const HotelDetails = (props) => {
    const Router = useRouter();
    const [hotelDetails,setHotelDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {  
        let mounted = true;
        try{
            localStorage.removeItem('hotel_beds_rooms'); 
        }catch(e){

        }
        if(props!=null && props!='' && props!=undefined){
            if(props.props!=null && props.props!='' && props.props!=undefined){
                if(!props.props.data.success){
                    Router.push('/');
                }             
                if(props.props.data!='' && props.props.data!=null){   
                    if(props.props.data.data!='' && props.props.data.data!=null){                           
                        setHotelDetails(props.props.data.data.hotel);
                        setLoading(false);
                    }else{
                        Router.push('/');
                    }
                }else{
                    Router.push('/');
                }
            }else{
                Router.push('/');
            }
        }else{
            Router.push('/');
        }
        return () => mounted = false;
    }, []);  
    if(!loading){
        if (isMobile) {
            return(
                <Fragment>
                    <NavHeader/>
                    <HotelStickSearch/>
                    <section className="innerPage">
                        <Breadcrumb page="Hotel Details" hotel={hotelDetails}/>
                        <section className="commanSpace hdetailsPage">
                            <div className="container">
                                <HotelOverview hotel={hotelDetails}/>
                                <HotelDetailImages hotel={hotelDetails}/>
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="dtalsTab allInfo">
                                            <div className="allInfoBtns">
                                                <a href="#roomsid">Rooms</a>
                                                <a href="#overviewid">Overview</a>
                                                <a href="#amenitiesid">Amenities</a>
                                                <a href="#locationid">Location</a>
                                                <a href="#bookingpolicyid">Booking Policy</a>
                                                <a href="#ratingid">Rating</a>

                                                <div className="dfixcotent" style={{display:'none'}}>
                                                    <div className="dfixcontinner">
                                                        <strong className="hdtlsPrice">₹ 15000</strong>
                                                        <a href="#" className="btn hdButton mt-4">Select Room</a>
                                                    </div>
                                                </div>
                                            </div>
                                            <HotelDetailsRoomsSelection hotel={hotelDetails}/>
                                            <HotelAboutOverview hotel={hotelDetails}/>
                                            <HotelAmenities hotel={hotelDetails}/>
                                            <HotelLocationMap hotel={hotelDetails}/>
                                            <HotelBookingPolicy hotel={hotelDetails}/>
                                            <HotelReviewsRatings hotel={hotelDetails}/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>                    
                    </section>
                </Fragment>
            );
        }else{              
            return (            
                <Fragment>
                    <NavHeader/>
                    <HotelStickSearch/>
                    <section className="innerPage">
                        <Breadcrumb page="Hotel Details" hotel={hotelDetails}/>
                        <section className="commanSpace hdetailsPage">
                            <div className="container">
                                <HotelOverview hotel={hotelDetails}/>
                                <HotelDetailImages hotel={hotelDetails}/>
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="dtalsTab allInfo">
                                            <div className="allInfoBtns">
                                                <a href="#roomsid">Rooms</a>
                                                <a href="#overviewid">Overview</a>
                                                <a href="#amenitiesid">Amenities</a>
                                                <a href="#locationid">Location</a>
                                                <a href="#bookingpolicyid">Booking Policy</a>
                                                <a href="#ratingid">Rating</a>
                                                <div className="dfixcotent" style={{display:'none'}}>
                                                    <div className="dfixcontinner">
                                                        <strong className="hdtlsPrice">₹ 15000</strong>
                                                        <a href="#" className="btn hdButton mt-4">Select Room</a>
                                                    </div>
                                                </div>
                                            </div>
                                            <HotelDetailsRoomsSelection hotel={hotelDetails}/>
                                            <HotelAboutOverview hotel={hotelDetails}/>
                                            <HotelAmenities hotel={hotelDetails}/>
                                            <HotelLocationMap hotel={hotelDetails}/>
                                            <HotelBookingPolicy hotel={hotelDetails}/>
                                            <HotelReviewsRatings hotel={hotelDetails}/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </section>
                </Fragment>
            );
        }
    }else{
        return "";
    }
}


HotelDetails.getInitialProps = async(context) => {    
    const settings = {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Il9eRmkWQSO8WC0HGO3cwr5LmKvtJA90'
        },
        body: JSON.stringify({'hotelcode':context.query.hotelcode,'listingIndex':context.query.hotellistingindex,'traceId':context.query.traceId})
    };
    const data = await fetch(`${baseUrl}/fetch-hotel-details`,settings)
    .then(response => response.json());
    return {
        props: { data },
    }  
}

export default HotelDetails;