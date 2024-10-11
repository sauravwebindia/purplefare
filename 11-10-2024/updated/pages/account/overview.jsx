import React, {useEffect, Fragment} from 'react';
import { baseUrl } from '@/repositories/Repository';
import AccountOverview from '@/components/MyAccount/AccountOverview';
import NavHeader from '@/components/layouts/NavHeader';
import Footer from '@/components/layouts/Footer';

const Overview = (props) => {	
    return (            
        <Fragment>
            <NavHeader/>
            <AccountOverview/>
            <Footer/>
        </Fragment>
    );
}


Overview.getInitialProps = async(context) => {
    const settings = {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Il9eRmkWQSO8WC0HGO3cwr5LmKvtJA90'
        },
        body: JSON.stringify({'slug':'overview'})
    };
    const data = await fetch(`${baseUrl}/fetch-page`,settings)
    .then(response => response.json());
    return {
		props: { data },
	}
}

export default Overview;