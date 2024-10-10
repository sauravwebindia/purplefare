import React, {useEffect, Fragment} from 'react';
import { baseUrl } from '@/repositories/Repository';
import MyAccountListing from '@/components/MyAccount/MyAccountListing';
import NavHeader from '@/components/layouts/NavHeader';
import Footer from '@/components/layouts/Footer';

const MyBookings = (props) => {	
    return (            
        <Fragment>
            <NavHeader/>
            <MyAccountListing/>
            <Footer/>
        </Fragment>
    );
}


MyBookings.getInitialProps = async(context) => {
    const settings = {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Il9eRmkWQSO8WC0HGO3cwr5LmKvtJA90'
        },
        body: JSON.stringify({'slug':'bookings'})
    };
    const data = await fetch(`${baseUrl}/fetch-page`,settings)
    .then(response => response.json());
    return {
		props: { data },
	}
}

export default MyBookings;