import React, { useEffect,useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router'; 
import { formatCurrency,generateTempArray } from '@/utilities/common-helpers';
import { baseStoreURL } from '@/repositories/Repository';
import { RWebShare } from "react-web-share";

export default function HotelOverview(props){
    const Router = useRouter();
    const [hotelName,setHotelName] = useState(null);
    const [hotelSearchParams, setHotelSearchParams] = useState("");
    useEffect(() => {  
        let mounted = true;
        let searchParams = "";
        let checkInDate = Router.query.checkInDate;
        let checkOutDate = Router.query.checkOutDate;
        let adults = Router.query.adults;
        let child = Router.query.child;
        let childAge = Router.query.childAge;
        let searchType = Router.query.searchType;
        let searchValue = Router.query.searchValue; 
        let searchSource = Router.query.searchSource;   
        let rooms = Router.query.rooms; 
        let traceId = Router.query.traceId;
        let cityName = Router.query.cityName;
        searchParams = {'traceId':traceId,'cityName':cityName,'searchSource':searchSource,'searchType':searchType,'searchValue':searchValue,'checkInDate':checkInDate,'checkOutDate':checkOutDate,'adults':adults,'rooms':rooms,'child':child,'childAge':childAge.split(",")};
        var queryString = Object.keys(searchParams).map(function(key) {
            return key + '=' + searchParams[key];
        }).join('&');
        setHotelSearchParams(queryString);
        if(props==null || props=='' || props==undefined){
            Router.push('/');
        }
        if(props.hotel==null || props.hotel=='' || props.hotel==undefined){
            Router.push('/');
        }
        setHotelName(props.hotel.name);
        return () => mounted = false;
    }, []);  
    
    function titleCase(str) {
        var splitStr = str.toLowerCase().split(' ');
        for (var i = 0; i < splitStr.length; i++) {
            // You do not need to check if i is larger than splitStr length, as your for does that for you
            // Assign it back to the array
            splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
        }
        // Directly return the joined string
        return splitStr.join(' '); 
    }

    if(props.hotel!=null && props.hotel!=undefined && props.hotel!=''){
        return (        
            <div className="row">            
                <div className="col-md-9">
                    <div className="dhName">
                        <h2>{hotelName}
                            {props.hotel.rating!=null && props.hotel.rating!=undefined && props.hotel.rating>0?
                            <div className="hdStrRate">
                                {generateTempArray(props.hotel.rating).map((item,i) => (
                                <img key={i} src={`${baseStoreURL}/images/star-active.png`} alt="star-active.png" className="hstrActive"/>
                                ))}
                                {5-parseInt(props.hotel.rating)>0?
                                generateTempArray(5-parseInt(props.hotel.rating)).map((item,i) => (
                                <img src={`${baseStoreURL}/images/star.png`} alt="star.png" key={i} className="hstr"/>
                                ))
                                :''}
                            </div>
                            :''}
                        </h2>
                        <p><i className="fas fa-map-marker-alt"></i> {titleCase(props.hotel.address)}, {titleCase(props.hotel.city)}, {titleCase(props.hotel.country)} - <Link href={`https://maps.google.com/maps?z=12&q=loc:${props.hotel.lat},${props.hotel.lng}`} target="_blank">View on map</Link></p>
                    </div>
                </div>            
                <div className="col-md-3">
                    <div className="hdRatings">
                    <RWebShare
                        data={{
                            text: props.hotel.name,
                            url: baseStoreURL+props.hotel.hotel_url+'?'+hotelSearchParams,
                            title: props.hotel.name,
                        }}
                        onClick={() => console.log("shared successfully!")}
                    >
                        <a><img src={`${baseStoreURL}/images/share-icon.png`} alt="" className="shareIcon" /></a>
                    </RWebShare>
                        <div className="hdRatingbox">
                            <Link href="javascript:;" className="">{parseFloat(props.hotel.rating).toFixed(1)}</Link>                         
                        </div>
                    </div>
                </div>            
            </div>
        );
    }else{
        return "";
    }
}