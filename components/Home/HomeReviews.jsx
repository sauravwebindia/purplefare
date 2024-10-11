import React, {useState} from 'react';
import { baseStoreURL } from '@/repositories/Repository';
import dynamic from "next/dynamic";
const OwlCarousel = dynamic(() => import("react-owl-carousel"), {
	ssr: false,
  });
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

export default function HomeReviews(props){
	let customerReviews = props.customerReviews;
	if(customerReviews!=null && customerReviews!='' && customerReviews!=undefined){
		if(customerReviews.length>0){
			let reviewView;
			const reviewItems = customerReviews.map((item,i) => (
				<div className="col-sm" key={i}>
					<div className="border borderRadiComman testi">
						<div className="borderRadiComman">
							<div className="borderRadiComman relative">
								<div className="flex items-center gap-4 border-bottom pb-3 relative">
									<div className="qoutes"></div>
									<img src={item.image} alt={item.name} className="borderRadiComman hUserImg" />
									<div>
										<h4 className="mt-0.5 text-lg text-gray-900 testiTitle">{item.name}</h4>
										{item.location!=null && item.location!='' && item.location!=undefined?
											<span className="text-gray-400">{item.location}</span>
										:''}
									</div>
								</div>
								<p className="mt-4 text-gray-700">{item.review}</p>
							</div>
						</div>
					</div>
				</div>
			));	
			reviewView = (reviewItems);
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
			if(reviewView!=''){
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
								<OwlCarousel className='owl-theme' responsive={responsiveObject} slideBy={1} loop={false} lazyLoad={true} autoplay={false} dots={false} margin={10} navText={['<a href="javascript:void(0);" class="ssArrow lSlideArrow"><img src="'+baseStoreURL+'/images/home/left-slider-arrow.png" alt="left-slider-arrow.png" class="img-fluid"/></a>','<a href="javascript:void(0);" class="ssArrow rSlideArrow"><img src="'+baseStoreURL+'/images/home/right-slider-arrow.png" alt="right-slider-arrow.png" class="img-fluid" /></a>']} nav>
									{reviewView}
								</OwlCarousel>
							</div>
						</div>
					</>
				);
			}else{
				return "";
			}
		}else{
			return "";
		}
	}else{
		return "";
	}
}