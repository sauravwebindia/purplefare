import React from 'react'
import Link from 'next/link';
import {baseStoreURL} from '@/repositories/Repository';

function cart() {
  return (
    <section className="innerPage">


		<section className="commanSpace comanTopSpace">
			<div className="container cart">
				<div className="row">
					<div className="col-md-12">
						<div className="progressBar">
							<ol className="progressbarInn">
								<li className="step-done">Choose Room</li>
								<li className="step-active">Your Details</li>
								<li className="step-todo">Confirmation</li>
							</ol>
						</div>
					</div>
				</div>


				<div className="row">
					<div className="col-md-8">
						<div className="cartLeft">
							<div className="boxWithShadow mb-3">
							<div className="bkInfoBox">
								<div className="bkInfoBoxImg">
									<img src={`${baseStoreURL}/images/hotel-img/gallery-big-1-.jpg`} alt="" className="" />
								</div>
								<div className="bkInfoBoxText">
									<div className="dhName">
										<h2>About Hotel Aroma Executive </h2>
										<p><i className="fas fa-map-marker-alt"></i> Greater London, United Kingdom</p>
										<div className="hdRatingbox cartRate">
											<Link href="#" className="">7.8</Link> <strong>Excellent <span>800 User reviews </span></strong>
										</div>
										<ul className="cartChkList">
											<li>Fully Refundable until 11:59PM (property local time) on Jul 8</li>
										</ul>
										<div className="cartBinfo">
											<div>
												<span>CHECK-IN</span>
												<strong>Wed, Jul 10, 2024</strong>
											</div>
											<div>
												<span>CHECK-OUT</span>
												<strong>Thu, Jul 11, 2024</strong>
											</div>
											<div>
												<span>NIGHTS</span>
												<strong>1</strong>
											</div>
											<div>
												<span>ROOMS</span>
												<strong>1</strong>
											</div>
										</div>
									</div>
								</div>
							</div>

							<div className="cartFacility">
								<h2>Standard Room</h2>
								<ul>
									<li>Breakfast Included</li>
									<li>Free Wifi</li>
									<li>Free Parking</li>
									<li>Breakfast Included</li>
									<li>Free Wifi</li>
									<li>Free Parking</li>
								</ul>
							</div>

							</div>
							<div className="boxWithShadow mb-3">
								<div className="guestBox">
									<p className="smallTxt tgcbox">The guest checking into each hotel room must be 21 or older, present a valid Photo ID and credit card.</p>
									<h2>Guest Name</h2>
									<div className="row formbx">
										<div className="col-md-6">
											<label for="name">Name*:</label>
											<input type="text" id="name" />
										</div>
										<div className="col-md-6">
											<label for="last">Last Name*:</label>
											<input type="text" id="last" />
										</div>
										<div className="col-md-6">
											<label for="email">Email*:</label>
											<input type="text" id="email" />
										</div>
										<div className="col-md-6">
											<label for="mobile">Mobile*:</label>
											<input type="text" id="Mobile" />
										</div>
										<div className="col-md-12">
											<p className="check-mark mt-2 termLink">
												<input type="checkbox" id="accept-terms" />
												<label for="accept-terms">Yes, I would like to hear about purplefare's exclusive deals and discounts</label>
											</p>
										</div>
									</div>
								</div>
							</div>
							
	
							<div className="boxWithShadow mb-3">
								<div className="cartInfobox">
									<h2>Important Information</h2>
									<ul>
										<li>
											<span>Fully Refundable</span> until 11:59pm (property local time) on 07-08-2024. After that time hotel cancellation and change fees apply as stated in the <Link className="" title="" href="" >Booking Conditions (this link opens in a modal dialog)</Link>.
										</li>
										<li>Check-in begins at 2pm and check-out is at 12pm.</li>
										<li>By selecting Book & Pay Later you agree to theBooking Conditions (this link opens in a modal dialog),<Link href="">Terms & Conditions</Link> and <Link href="">Privacy Policy.</Link></li>
									</ul>
								</div>
							</div>

							<Link href="thanks.html" className="continuePay">Pay Now</Link>

						</div>
					</div>

					<div className="col-md-4">
						<div className="cartRight">
							<div className="cartRightBox mb-3">
							<div className="cartPaymentInfo">
								<h3>Reservation Summary</h3>
								<ul className="purchase-props">
									<li className="flex-between">
									  <span className="cttitle">1 Room x 1 Nights <span>Base Price</span></span>
									  <span className="ctdtals"><strong className="hsalePrice">$ 15000</strong></span> 
									</li>
									<li className="flex-between cartDiscount">
										<span className="cttitle">Total Discount</span>
										<span className="ctdtals">$ 12,508</span> 
									</li>
									<li className="flex-between">
										<span className="cttitle">Price after Discount</span>
										<span className="ctdtals">$ 10,590</span> 
									</li>
									<li className="flex-between">
										<span className="cttitle">Taxes and fees</span>
										<span className="ctdtals">$ 2,816</span> 
									</li>
									<li className="flex-between">
										<span className="cttitle">Total Amount to be paid</span>
										<span className="ctdtals">$ 13,406</span> 
									</li>
								  </ul>
							</div>
							</div>

							<div className="cartRightBox mb-3">
								<div className="cartRightBoxInn">
									<h3>Coupon Codes</h3>
									<div className="cartdiscount">
										
											<label className="couponCard">
											  <input name="plan" className="radio" type="radio" checked />
											  
											  <span className="plan-details">
												<span className="offCoupon">
													<span className="plan-type">VACATION20</span>
													<span className="plan-cost">$90</span>
												</span>
												<p>Exclusive Offer on Federal Bank Credit Cards.Get INR 2481 off</p>
											  </span>
											</label>
											
											<label className="couponCard">
												<input name="plan" className="radio" type="radio" checked />
												
												<span className="plan-details">
												  <span className="offCoupon">
													  <span className="plan-type">VACATION20</span>
													  <span className="plan-cost">$100</span>
													  <span className="fas fa-times removeCoupon"></span>
												  </span>
												  <p>Exclusive Offer on Federal Bank Credit Cards.Get INR 2481 off</p>
												</span>
											  </label>
											  
											
											<div className="cpCode">
													<input type="text" id="coupon" placeholder="Enter Coupon Code" />
													<button className="btn btn-outline-secondary font-weight-normal mt-10-px" type="button">Apply</button>
											</div>
									</div>
								</div>
							</div>
						</div>
					</div>

				</div>
			</div>
		</section>



	</section>
  )
}

export default cart