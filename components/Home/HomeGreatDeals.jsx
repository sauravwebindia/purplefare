import React, { useState } from 'react';
import dynamic from "next/dynamic";
const OwlCarousel = dynamic(() => import("react-owl-carousel"), {
  ssr: false,
});
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import { baseStoreURL } from '@/repositories/Repository';

export default function HomeMostBookedHotels() {
    let sliderItems = ['images/home/fullslider.jpg', 'images/home/fullslider.jpg', 'images/home/fullslider.jpg', 'images/home/fullslider.jpg','images/home/fullslider.jpg', 'images/home/fullslider.jpg', 'images/home/fullslider.jpg', 'images/home/fullslider.jpg'];
    let BannerView;
    let responsiveObject = {
		0:{
			items:1
		},
		600:{
			items:3
		},
		1000:{
			items:4
		}
	};
    const BannerItems = sliderItems.map((item, i) => (
        <div class="col-sm grabCover" key={i}>
            <div class="bg-white shadow-md border borderRadiComman dealCardInn">
                <div class="borderRadiComman">
                    <img src={`${baseStoreURL}/images/deals/deals-1.jpg`} alt="deals-1.jpg" class="img-fluid" />
                </div>
                <div class="text-center px-1 dealText">
                    <h3 class=" pb-3">Register and Get Discount on Booking First Flight with Us</h3><span>Valid
                        till: 31st Mar, 2024</span>
                </div>
            </div>
        </div>
    ));
    BannerView = (BannerItems);
    if (BannerView != '') {
        return (
            <>
                <div class="container mt-4">
                    <div class="row">
                        <div class="col-sm">
                            <h2 class="title-2 text-center pb-3">Great Deals</h2>
                        </div>
                    </div>
                </div>
                <div class="container gdCover">
                    <div class="row">
                        <OwlCarousel className='owl-theme' margin={10} autoplay={false} responsive={responsiveObject} lazyLoad={true} slideBy={1} dots={false} navText={['<a href="javascript:void(0);" class="ssArrow lSlideArrow"><img src="'+baseStoreURL+'/images/home/left-slider-arrow.png" alt="left-slider-arrow.png" class="img-fluid"/></a>','<a href="javascript:void(0);" class="ssArrow rSlideArrow"><img src="'+baseStoreURL+'/images/home/right-slider-arrow.png" alt="right-slider-arrow.png" class="img-fluid" /></a>']} nav>
                        {BannerView}
                        </OwlCarousel>
                    </div>
                </div>
            </>
        );
    } else {
        return "";
    }
}