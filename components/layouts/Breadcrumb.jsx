import React, {useEffect,useState} from 'react';
import { baseStoreURL } from '@/repositories/Repository';
import Link from 'next/link';


export default function Breadcrumb(props){
    const [cityName,setCityName] = useState("");
    const [listingLink, setListingLink] = useState('/');
    useEffect(() => {  
        let mounted = true;
       if(props.page=='Hotel Details'){
            let searchParams = localStorage.getItem('searchParams');
            let params = JSON.parse(searchParams);
            setCityName(params.cityName);
            setListingLink(`${baseStoreURL}/hotels/hotel-listing/?checkin=${params.checkInDate}&checkout=${params.checkOutDate}&cityName=${params.cityName}&searchSource=${params.searchSource}&searchType=${params.searchType}&searchValue=${params.searchValue}&rooms=${params.rooms}&adults=${params.adults}&child=${params.child}&childAge=${params.childAge}`);
        }
        return () => mounted = false;
    }, []); 

	if(props.page=='Hotel Listing'){
        return (
            <div class="row">
                <div class="col-md-12">
                    <div>
                        <ol class="cd-breadcrumb">
                            <li><Link href={`${baseStoreURL}`}><i class="fa fa-home"></i></Link></li>
                            <li><a href="javascript:;">Hotel</a></li>
                            <li class="current"><em>{props.cityName}</em></li>
                        </ol>
                    </div>
                </div>
            </div>
        );
    }else if(props.page=='Hotel Details'){
        if(props!=null && props!='' && props!=undefined){
            let hotelDetails = props.hotel;
            
            if(hotelDetails!=null && hotelDetails!='' && hotelDetails!=undefined){
                return (
                    <section class="breadcrumbbx">
                        <div class="container">
                            <div class="row">
                                <div class="col-md-12">
                                    <Link href={`${baseStoreURL}`}>Home</Link> <span class="brdIcon">/</span> <a href={`${listingLink}`}>{cityName}</a> <span class="brdIcon">/</span> <span class="brdNormal">{hotelDetails.name}</span>
                                </div>
                            </div>
                        </div>
                    </section>	
                );
            }else{
                return "";
            }
        }else{
            return "";
        }
    }
}