import React, {useEffect, Fragment} from 'react';
import { useRouter } from 'next/router';
import { baseUrl } from '@/repositories/Repository';
import NavHeader from '@/components/layouts/NavHeader';
import {isMobile} from "react-device-detect";
import HotelThanks from '@/components/Hotel/HotelThanks';
import Breadcrumb from '@/components/layouts/Breadcrumb';
import Footer from '@/components/layouts/Footer';
import Link from 'next/link';

const HotelThanksPage = (props) => {	
    return (            
        <Fragment>
            <NavHeader/>
            <section className="innerPage">
                <section className="commanSpace comanTopSpace">
                    <div className="container bookingSucessPage">
                        <div className="row">
                            <p>Under Maintenance</p>                        
                        </div>
                    </div>
                </section>
            </section>
        <Footer/>
        </Fragment>
    );
}


HotelThanksPage.getInitialProps = async(context) => {
    const settings = {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Il9eRmkWQSO8WC0HGO3cwr5LmKvtJA90'
        },
        body: JSON.stringify({'slug':'cancel-booking'})
    };
    const data = await fetch(`${baseUrl}/fetch-page`,settings)
    .then(response => response.json());
    return {
		props: { data },
	}
}

export default HotelThanksPage;