import React, {useEffect, Fragment} from 'react';
import { useRouter } from 'next/router';
import { baseUrl } from '@/repositories/Repository';
import NavHeader from '@/components/layouts/NavHeader';
import HotelListingHeader from "@/components/Hotel/HotelListingHeader";
import HotelListingMobileHeader from "@/components/Hotel/HotelListingMobileHeader";
import HotelStickSearch from '@/components/Hotel/HotelStickSearch';
import HotelModifySearch from '@/components/Hotel/HotelModifySearch';
import {isMobile,isTablet,MobileView, BrowserView} from "react-device-detect";
import HotelFilters from '@/components/Hotel/HotelFilters';
import HotelsListing from '@/components/Hotel/HotelsListing';
import Breadcrumb from '@/components/layouts/Breadcrumb';
const HotelListing = (props) => {	
    const Router = useRouter();
    if (isMobile) {
        return(
            <Fragment>
                <NavHeader/>
                <section className="innerPage">                    
                    <HotelStickSearch/>
                    <section className="commanSpace">
                        <div className="container listing">
                            <Breadcrumb page="Hotel Listing" cityName={Router.query.cityName}/>
                            <div className="row">
                                <div className="col-md-3">
                                    <HotelFilters/>
                                </div>
                                <div className="col-md-9">
                                    <HotelsListing listing={props.props.data}/>
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
                <section className="innerPage">                    
                    <HotelStickSearch/>
                    <HotelModifySearch/>
                    <section className="commanSpace">
                        <div className="container listing">
                            <Breadcrumb page="Hotel Listing" cityName={Router.query.cityName}/>
                            <div className="row">
                                <div className="col-md-3">
                                    <HotelFilters/>
                                </div>
                                <div className="col-md-9">
                                    <HotelsListing listing={props.props.data}/>
                                </div>
                            </div>
                        </div>
                    </section>
                </section>
            </Fragment>
        );
    }
}


HotelListing.getInitialProps = async(context) => {
    let searchType = context.query.searchType;
    let searchValue = context.query.searchValue;  
    const settings = {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Il9eRmkWQSO8WC0HGO3cwr5LmKvtJA90'
        },
        body: JSON.stringify({'searchValue':searchValue})
    };
    let endURL = "";
    if(searchType=='Hotel'){
        endURL = 'fetch-hotel-meta-details';
    }else{
        endURL = 'fetch-hotels-listing-meta-details';
    }
    const data = await fetch(`${baseUrl}/${endURL}`,settings)
    .then(response => response.json());
    return {
		props: { data },
	}
}

export default HotelListing;