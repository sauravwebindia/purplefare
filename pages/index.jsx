import React, {Fragment} from 'react';
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
export default function Home() {
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
