import React, {Fragment} from 'react';
import { baseUrl } from '@/repositories/Repository';
import NavHeader from "@/components/layouts/NavHeader";
import HomeSearch from "@/components/Home/HomeSearch";
import HomeExploreDestination from "@/components/Home/HomeExploreDestination";
import HomeBannersSlider from "@/components/Home/HomeBannersSlider";
import HomeMostBookedHotels from "@/components/Home/HomeMostBookedHotels";
import HomeGreatDeals from "@/components/Home/HomeGreatDeals";
import HomeAboutUs from "@/components/Home/HomeAboutUs";
import HomeLatestNews from "@/components/Home/HomeLatestNews";
import HomeReviews from "@/components/Home/HomeReviews";
import HomeVideo from "@/components/Home/HomeVideo";
import HomeWhyBookWithUs from "@/components/Home/HomeWhyBookWithUs";
import HomeTrustedPartners from "@/components/Home/HomeTrustedPartners";
import Footer from "@/components/layouts/Footer";
function Home(props) {
	let page_props = props.props.data;
    if(page_props!='' && page_props!=undefined && page_props!=null){
        if(page_props.data.page!=null && page_props.data.page!=undefined && page_props.data.page!=''){
			return (
				<Fragment>
					<NavHeader/>
					<section className="homePage">
						<HomeSearch/>
						<HomeExploreDestination exploreDestination={page_props.data.list_home_destinations}/>
						<HomeBannersSlider/>
						<HomeMostBookedHotels/>
						<HomeGreatDeals/>
						<HomeAboutUs/>
						<HomeLatestNews/>
						<HomeReviews/>
						<HomeVideo/>
						<HomeWhyBookWithUs/>
						<HomeTrustedPartners/>
					</section>
					<Footer/>
				</Fragment>
			);
		}else{
			return (
				<Fragment>
					<NavHeader/>
					<section className="homePage">
						<HomeSearch/>
						<HomeExploreDestination/>
						<HomeBannersSlider/>
						<HomeMostBookedHotels/>
						<HomeGreatDeals/>
						<HomeAboutUs/>
						<HomeLatestNews/>
						<HomeReviews/>
						<HomeVideo/>
						<HomeWhyBookWithUs/>
						<HomeTrustedPartners/>
					</section>
					<Footer/>
				</Fragment>
			);
		}
	}else{
		return (
			<Fragment>
				<NavHeader/>
				<section className="homePage">
					<HomeSearch/>
					<HomeExploreDestination/>
					<HomeBannersSlider/>
					<HomeMostBookedHotels/>
					<HomeGreatDeals/>
					<HomeAboutUs/>
					<HomeLatestNews/>
					<HomeReviews/>
					<HomeVideo/>
					<HomeWhyBookWithUs/>
					<HomeTrustedPartners/>
				</section>
				<Footer/>
			</Fragment>
		);
	}
}


Home.getInitialProps = async(context) => {
    let slug = '/';
    const settings = {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Il9eRmkWQSO8WC0HGO3cwr5LmKvtJA90'
        },
        body: JSON.stringify({'slug':slug})
    };
    const data = await fetch(`${baseUrl}/fetch-homepage`,settings)
    .then(response => response.json());
    return {
		props: { data },
	}
}

export default Home;
