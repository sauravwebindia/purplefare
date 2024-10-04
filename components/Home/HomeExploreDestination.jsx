import React, {useState} from 'react';

export default function HomeExploreDestination(){
		return(
			<div className="container mt-4 exploreTop">
				<div className="row">
					<div className="col-md-12">
						<div className="nhBox purpleColor pt-4 pb-3">Need help booking? Our agents are ready! 
						<span>Call us 24/7 at 0000000000</span></div>
						<h2 className="title-2 text-center pb-3">Explore Top Destinations</h2>
					</div>
				</div>
				<div className="row exptopDest">
					<div className="col-md-12">
						<div className="exptopDestinationsCover">
							<div className="exptopDestinations">
								<div className="expMob">
									<div className="expTextMob">
										<span><a href="#">Holiday Packages</a></span>
										<h2>New York</h2>
									</div>
									<div class="expImgCover"><img src="images/home/hotel-mobile-1.jpg" alt="" className="img-fluid"/></div>
								</div>
								<div className="expMob">
									<div className="expTextMob">
										<span><a href="#">Holiday Packages</a></span>
										<h2>New York</h2>
									</div>
									<div class="expImgCover"><img src="images/home/newyork.jpg" alt="" className="img-fluid"/></div>
								</div>
								<div className="expMob">
									<div className="expTextMob">
										<span><a href="#">Holiday Packages</a></span>
										<h2>New York</h2>
									</div>
									<div class="expImgCover"><img src="images/home/newyork.jpg" alt="" className="img-fluid"/></div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="row">
					<div className="col-sm-8 expCover">
						<div className="expText"><span><a href="#">Holiday Packages</a></span>
							<h2>New York</h2>
						</div>
						<div class="expImgCover"><img src="images/home/newyork.jpg" alt="" className="img-fluid" /></div>
					</div>
					<div className="col-sm-4 expCover">
						<div className="expText"><span><a href="#">Holiday Packages</a></span>
							<h2>Los Angeles</h2>
						</div>
						<div class="expImgCover"><img src="images/home/losangeles.jpg" alt="" className="img-fluid" /></div>
					</div>
				</div>
				<div className="row">
					<div className="col-sm-8 expCover">
						<div className="expText"><span><a href="#">Holiday Packages</a></span>
							<h2>Miami</h2>
						</div>
						<div class="expImgCover"><img src="images/home/miami.jpg" alt="" className="img-fluid" /></div>
					</div>
					<div className="col-sm-4 expCover">
						<div className="expText"><span><a href="#">Holiday Packages</a></span>
							<h2>Houston</h2>
						</div>
						<div class="expImgCover"><img src="images/home/losangeles.jpg" alt="" className="img-fluid" /></div>
					</div>
				</div>
				<div className="row">
					<div className="col-sm expCover">
						<div className="expText"><span><a href="#">Hotel</a><a href="#">Flight</a></span>
							<h2>Orlando</h2>
						</div>
						<div class="expImgCover"><img src="images/home/losangeles.jpg" alt="" className="img-fluid" /></div>
					</div>
					<div className="col-sm expCover">
						<div className="expText"><span><a href="#">Hotel</a><a href="#">Flight</a></span>
							<h2>Atlanta</h2>
						</div>
						<div class="expImgCover"><img src="images/home/losangeles.jpg" alt="" className="img-fluid" /></div>
					</div>
					<div className="col-sm expCover">
						<div className="expText"><span><a href="#">Hotel</a><a href="#">Flight</a></span>
							<h2>Dallas</h2>
						</div>
						<div class="expImgCover"><img src="images/home/losangeles.jpg" alt="" className="img-fluid" /></div>
					</div>
				</div>
				<div className="row">
					<div className="col-sm expCover">
						<div className="expText"><span><a href="#">Hotel</a><a href="#">Flight</a></span>
							<h2>Orlando</h2>
						</div>
						<div class="expImgCover"><img src="images/home/losangeles.jpg" alt="" className="img-fluid" /></div>
					</div>
					<div className="col-sm expCover">
						<div className="expText"><span><a href="#">Hotel</a><a href="#">Flight</a></span>
							<h2>Atlanta</h2>
						</div>
						<div class="expImgCover"><img src="images/home/losangeles.jpg" alt="" className="img-fluid" /></div>
					</div>
					<div className="col-sm expCover">
						<div className="expText"><span><a href="#">Hotel</a><a href="#">Flight</a></span>
							<h2>Dallas</h2>
						</div>
						<div class="expImgCover"><img src="images/home/losangeles.jpg" alt="" className="img-fluid" /></div>
					</div>
				</div>
			</div>
		);
}