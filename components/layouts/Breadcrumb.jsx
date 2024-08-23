import React, {useEffect,useState} from 'react';
import { baseStoreURL } from '@/repositories/Repository';
import Link from 'next/link';
import { useRouter } from 'next/router';


export default function Breadcrumb(props){
    const Router = useRouter();
    const [cityName,setCityName] = useState("");
    const [listingLink, setListingLink] = useState('/');
    useEffect(() => {  
        let mounted = true;
        if(props.page=='Hotel Details'){
            setCityName(Router.query.cityName);
            setListingLink(`${baseStoreURL}/hotels/hotel-listing/?checkin=${Router.query.checkInDate}&checkout=${Router.query.checkOutDate}&cityName=${Router.query.cityName}&searchSource=${Router.query.searchSource}&searchType=${Router.query.searchType}&searchValue=${Router.query.searchValue}&rooms=${Router.query.rooms}&adults=${Router.query.adults}&child=${Router.query.child}&childAge=${Router.query.childAge}`);
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