import React, {useEffect,Fragment} from 'react';
import { useRouter } from 'next/router'; 
import { baseUrl } from '@/repositories/Repository';
import NavHeader from '@/components/layouts/NavHeader';
import HotelStickSearch from '@/components/Hotel/HotelStickSearch';
import Breadcrumb from '@/components/layouts/Breadcrumb';
import HotelDetailsOverview from '@/components/Hotel/HotelOverview';
import {isMobile,isTablet,MobileView, BrowserView} from "react-device-detect";
const HotelDetails = (props) => {
    const Router = useRouter();
    let hotelDetails = "";
    useEffect(() => {  
        let mounted = true;
        if(props!=null && props!='' && props!=undefined){
            if(props.props!=null && props.props!='' && props.props!=undefined){
                if(!props.props.data.success){
                    Router.push('/');
                }
                if(props.props.data!='' && props.props.data!=null){
                    if(props.props.data.data!='' && props.props.data.data!=null){
                        hotelDetails = props.props.data.data.hotelDetails;
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
    if (isMobile) {
        return(
            <Fragment>
                <NavHeader/>
                <HotelStickSearch/>
                <section className="innerPage">
                    <Breadcrumb page="Hotel Details" hotelDetails={hotelDetails}/>
                    <section className="commanSpace hdetailsPage">
                        <div className="container">
                            <HotelDetailsOverview hotelDetails={hotelDetails}/>
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
                    <Breadcrumb page="Hotel Details" hotelDetails={hotelDetails}/>
                    <section className="commanSpace hdetailsPage">
                        <div className="container">
                            <HotelDetailsOverview hotelDetails={hotelDetails}/>
                        </div>
                    </section>
                </section>
            </Fragment>
        );
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