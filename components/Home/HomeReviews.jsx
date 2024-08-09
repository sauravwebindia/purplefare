import React, {useState} from 'react';
import dynamic from "next/dynamic";
const OwlCarousel = dynamic(() => import("react-owl-carousel"), {
	ssr: false,
  });
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

export default function HomeReviews(){
	let sliderItems = ['images/home/fullslider.jpg','images/home/fullslider.jpg','images/home/fullslider.jpg','images/home/fullslider.jpg','images/home/fullslider.jpg','images/home/fullslider.jpg'];
	let BannerView;
	const BannerItems = sliderItems.map((item,i) => (
		<div className="col-sm" key={i}>
            <div className="border borderRadiComman testi">
                <div className="borderRadiComman">
                    <div className="borderRadiComman relative">
                        <div className="flex items-center gap-4 border-bottom pb-3 relative">
                            <div className="qoutes"></div>
                            <img src="images/home/testiuser1.jpg" alt="" className="borderRadiComman hUserImg" />
                            <div>
                                <h4 className="mt-0.5 text-lg text-gray-900 testiTitle">John Smith</h4>
                                <span className="text-gray-400">Los Angeles</span>
                            </div>
                        </div>
                        <p className="mt-4 text-gray-700">Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum
                            suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel
                            facilisis. </p>
                    </div>
                </div>
            </div>
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
			items:2
		}
	};
	if(BannerView!=''){
		return(
			<>
				<div className="container mt-5 pt-2">
                    <div className="row">
                        <div className="col-sm">
                            <h2 className="title-2 text-center pb-4">Loving Reviews by Our Customers</h2>
                        </div>
                    </div>
                </div>
				<div className="container gdCover testihbox">
					<div className="row">
						<OwlCarousel className='owl-theme' responsive={responsiveObject} slideBy={1} loop={false} lazyLoad={true} autoplay={false} dots={false} margin={10} navText={['<a href="javascript:void(0);" class="ssArrow lSlideArrow"><img src="images/home/left-slider-arrow.png" alt="left-slider-arrow.png" class="img-fluid"/></a>','<a href="javascript:void(0);" class="ssArrow rSlideArrow"><img src="images/home/right-slider-arrow.png" alt="right-slider-arrow.png" class="img-fluid" /></a>']} nav>
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