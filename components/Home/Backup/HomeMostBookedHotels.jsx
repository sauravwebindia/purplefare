import React, {useState} from 'react';
import dynamic from "next/dynamic";
const OwlCarousel = dynamic(() => import("react-owl-carousel"), {
	ssr: false,
  });
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import { baseStoreURL } from '@/repositories/Repository';

export default function HomeMostBookedHotels(){
	let sliderItems = ['images/home/fullslider.jpg','images/home/fullslider.jpg','images/home/fullslider.jpg','images/home/fullslider.jpg'];
	let BannerView;
	const BannerItems = sliderItems.map((item,i) => (
		<div className="col-sm expCover" key={i}>
			<div className="expText"><span>Hotel</span>
				<h2>Bosten</h2>
			</div>
			<img src={`${baseStoreURL}/images/home/losangeles.jpg`} alt="losangeles.jpg" className="img-fluid" />
		</div>
	));	
	BannerView = (BannerItems);
	let responsiveObject = {
		0:{
			items:1
		},
		600:{
			items:2
		},
		1000:{
			items:3
		}
	};
	if(BannerView!=''){
		return(
			<>
				<div className="container mt-4">
					<div className="row">
						<div className="col-sm">
							<h2 className="title-2 text-center pb-3">Most Booked Hotels With Us</h2>
						</div>
					</div>
				</div>
				<div className="container hMbhCover">
					<div className="row">
						<OwlCarousel className='owl-theme' responsive={responsiveObject} slideBy={1} loop={false} lazyLoad={true} autoplay={false} dots={false} margin={10} navText={['<a href="javascript:void(0);" class="ssArrow lSlideArrow"><img src="'+baseStoreURL+'/images/home/left-slider-arrow.png" alt="left-slider-arrow.png" class="img-fluid"/></a>','<a href="javascript:void(0);" class="ssArrow rSlideArrow"><img src="'+baseStoreURL+'/images/home/right-slider-arrow.png" alt="right-slider-arrow.png" class="img-fluid" /></a>']} nav>
							{BannerView}
						</OwlCarousel>
					</div>
				</div>
			</>
		);
	}else{
		return "";
	}
}