import React, {useEffect, Fragment} from 'react';
import { useRouter } from 'next/router';
import { baseUrl } from '@/repositories/Repository';
import NavHeader from '@/components/layouts/NavHeader';
import {isMobile} from "react-device-detect";
import HotelReview from '@/components/Hotel/HotelReview';
import Breadcrumb from '@/components/layouts/Breadcrumb';
import Footer from '@/components/layouts/Footer';

const HotelThanksPage = (props) => {	
    return (            
        <Fragment>
            <NavHeader/>
            <section className="innerPage">
                <section className="commanSpace comanTopSpace">
                    <div className="container bookingSucessPage">
                        <div className="row">
                            <div className="col-md-8">
                            </div>
                            <div className="col-md-4">
                                <div className="cartRight">
                                    <div className="cartRightBox mb-3">
                                        <div className="cartPaymentInfo thmanageTrip">
                                            <h3>Manage Your Trip</h3>
                                            <ul className="purchase-props">
                                                <li><Link href=""><span className="fas fa-phone"></span> Contact Property</Link></li>
                                                <li><Link href=""><span className="fas fa-ticket-alt"></span> Cancel Booking</Link></li>
                                                <li><Link href=""><span className="fas fa-hamburger"></span> Add Meal</Link></li>
                                                <li><Link href="add-guest.html"><span className="fas fa-user-plus"></span> Add Guest</Link></li>
                                                <li><Link href=""><span className="fas fa-cloud-download-alt"></span> Download Ticket</Link></li>
                                            </ul>
                                        </div>
                                    </div>
                                    <Link href="my-account-listing.html" className="btn btn-primary w-100 gtmtBtn">Go to My Trip</Link>
                                </div>
                            </div>
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
        body: JSON.stringify({'slug':'hotel-thanks'})
    };
    const data = await fetch(`${baseUrl}/fetch-page`,settings)
    .then(response => response.json());
    return {
		props: { data },
	}
}

export default HotelThanksPage;