import { baseStoreURL } from '@/repositories/Repository';
import React, {useState} from 'react';
import Link from 'next/link';
import { isMobile } from 'react-device-detect';

export default function HomeExploreDestination(props){
		let exploreDestination = props.exploreDestination;
		if(exploreDestination!=null && exploreDestination!='' && exploreDestination!=undefined){
			let totalDestination = exploreDestination.length;
			let exploreTopDestination = "";
			if(isMobile){
				exploreTopDestination = (
					<div className="row exptopDest">
						<div className="col-md-12">
							<div className="exptopDestinationsCover">
								<div className="exptopDestinations">
									{exploreDestination.map((dest,k) => (
									<div className="expMob" key={k}>
										<div className="expTextMob">
											<span><Link href={`${baseStoreURL}/${dest.hotel_link}`}>{dest.hotel_label}</Link></span>
											<h2>{dest.destination}</h2>
										</div>
										<div class="expImgCover"><img src={dest.mob_image} alt={dest.destination} className="img-fluid"/></div>
									</div>
									))}
								</div>
							</div>
						</div>
					</div>
				);
			}else{
				if(totalDestination%3==0){
					exploreTopDestination = (
						<div className="row">
							{exploreDestination.map((dest,k) => (
							<div className="col-sm-4 expCover" key={k}>
								<div className="expText">
									<span><Link href={`${baseStoreURL}/${dest.hotel_link}`} target="_blank">{dest.hotel_label}</Link></span>
									<h2>{dest.destination}</h2>
								</div>
								<div class="expImgCover"><img src={dest.image} alt={dest.destination} className="img-fluid" /></div>
							</div>
							))}
						</div>
					);
				}else {
					exploreTopDestination = (
						<div className="row">
							{exploreDestination.map((dest,k) => (
							<div className="col-sm-4 expCover" key={k}>
								<div className="expText">
									<span><Link href={`${baseStoreURL}/${dest.hotel_link}`} target="_blank">{dest.hotel_label}</Link></span>
									<h2>{dest.destination}</h2>
								</div>
								<div class="expImgCover"><img src={dest.image} alt={dest.destination} className="img-fluid" /></div>
							</div>
							))}
						</div>
					);
				}
			}
			return(
				<div className="container mt-4 exploreTop">
					<div className="row">
						<div className="col-md-12">
							<div className="nhBox purpleColor pt-4 pb-3">Need help booking? Our agents are ready! 
							<span> Call us 24/7 at +1 (786) 286-2631</span></div>
							<h2 className="title-2 text-center pb-3">Explore Top Destinations</h2>
						</div>
					</div>
					{exploreTopDestination}
				</div>
			);
	}else{
		return "";
	}
}