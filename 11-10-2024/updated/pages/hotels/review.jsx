import React, {useEffect, Fragment} from 'react';
import { useRouter } from 'next/router';
import { baseUrl } from '@/repositories/Repository';
import NavHeader from '@/components/layouts/NavHeader';
import {isMobile} from "react-device-detect";
import HotelReview from '@/components/Hotel/HotelReview';
import Breadcrumb from '@/components/layouts/Breadcrumb';
import Footer from '@/components/layouts/Footer';

const HotelReviewPage = (props) => {	
    return (            
        <Fragment>
            <NavHeader/>
            <section className="innerPage">
                <section className="commanSpace comanTopSpace">
                    <div className="container cart">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="progressBar">
                                    <ol className="progressbarInn">
                                        <li className="step-done">Choose Room</li>
                                        <li className="step-active">Your Details</li>
                                        <li className="step-todo">Confirmation</li>
                                    </ol>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12">
                                    <p className="mb-2"><strong className="purpleColor">Almost done!</strong> Enter your details and complete your booking now.</p>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <HotelReview/>
                        </div>
                    </div>
                </section>
            </section>
        <Footer/>
        </Fragment>
    );
}


HotelReviewPage.getInitialProps = async(context) => {
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
    const data = await fetch(`${baseUrl}/fetch-hotel-review-page-meta-details`,settings)
    .then(response => response.json());
    return {
		props: { data },
	}
}

export default HotelReviewPage;