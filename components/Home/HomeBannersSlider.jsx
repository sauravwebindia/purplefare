import React, {useState} from 'react';
import { baseStoreURL } from '@/repositories/Repository';
import dynamic from "next/dynamic";
const OwlCarousel = dynamic(() => import("react-owl-carousel"), {
	ssr: false,
  });
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

export default function HomeBannersSlider(){
	let sliderItems = ['images/home/fullslider.jpg','images/home/fullslider.jpg','images/home/fullslider.jpg'];
	let BannerView;
	let responsiveObject = {
		0:{
			items:1
		},
		600:{
			items:1
		},
		1000:{
			items:1
		}
	};
	if (sliderItems != null && sliderItems != undefined && sliderItems != '') {
		const BannerItems = sliderItems.map((item,i) => (
			<img src={`${item}`} key={i} alt="" className="img-fluid borderRadiComman" />
		));
		BannerView = (BannerItems);
		if (BannerView != '') {
			return(
				<div className="container mt-4 exploreTop">
					<div className="row">
						<div className="col-md-12">
							<div className="hSingleSlider">
								<OwlCarousel className='owl-theme' responsive={responsiveObject} slideBy={1} loop={false} lazyLoad={true} autoplay={false} dots={false} margin={10} navText={['<a href="javascript:void(0);" class="ssArrow lSlideArrow"><img src="'+baseStoreURL+'/images/home/left-slider-arrow.png" alt="left-slider-arrow.png" class="img-fluid"/></a>','<a href="javascript:void(0);" class="ssArrow rSlideArrow"><img src="'+baseStoreURL+'/images/home/right-slider-arrow.png" alt="right-slider-arrow.png" class="img-fluid" /></a>']} nav>
									{BannerView}
								</OwlCarousel>
							</div>
						</div>
					</div>
				</div>
			);
		}else{
			return "";
		}
	}else{		
		return "";
	}
}