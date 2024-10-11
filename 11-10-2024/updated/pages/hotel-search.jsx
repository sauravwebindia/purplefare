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
import HomeMobileSearch from '@/components/Home/HomeMobileSearch';
export default function MobileHotelSearch() {
    return (
      <Fragment>
          <NavHeader/>
          <HomeMobileSearch/>
          <Footer/>
      </Fragment>
    );
}
