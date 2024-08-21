import React, {useState} from 'react';
import dynamic from "next/dynamic";
import { baseStoreURL } from '@/repositories/Repository';
const OwlCarousel = dynamic(() => import("react-owl-carousel"), {
	ssr: false,
  });
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

export default function HomeTrustedPartners(){
	let sliderItems = ['images/home/clientlogo1.jpg','images/home/clientlogo2.jpg','images/home/clientlogo3.jpg','images/home/clientlogo1.jpg','images/home/clientlogo2.jpg','images/home/clientlogo3.jpg'];
	let BannerView;
	const BannerItems = sliderItems.map((item,i) => (
		<div className="col-sm" key={i}>
            <div className="borderRadiComman hLogoImg">
                <img src={`${item}`} alt=""/>
            </div>
        </div>
	));	
	BannerView = (BannerItems);
	let responsiveObject = {
		0:{
			items:2
		},
		600:{
			items:3
		},
		1000:{
			items:5
		}
	};
	if(BannerView!=''){
		return(
			<>
				<div className="container mt-4">
                    <div className="row">
                        <div className="col-sm">
                            <h2 className="title-2 text-center pb-3">Trusted to Sell Ticket Globally</h2>
                        </div>
                    </div>
                </div>
				<div className="container hLogoCover">
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