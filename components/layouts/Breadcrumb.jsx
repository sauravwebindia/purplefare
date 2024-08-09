import React from 'react';
import { baseStoreURL } from '@/repositories/Repository';
import Link from 'next/link';


export default function Breadcrumb(props){
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
        let hotelDetails = props.hotelDetails;
        return (
            <section class="breadcrumbbx">
                <div class="container">
                    <div class="row">
                        <div class="col-md-12">
                            <Link href={`${baseStoreURL}`}>Home</Link> <span class="brdIcon">/</span> <a href={`${baseStoreURL}`}>List</a> <span class="brdIcon">/</span> <span class="brdNormal">{hotelDetails.HotelName}</span>
                        </div>
                    </div>
                </div>
            </section>	
        );
    }
}