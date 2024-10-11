import React from 'react'
import Link from 'next/link';
import {baseStoreURL} from '@/repositories/Repository';

function Thanks() {
  return (
    <section className="innerPage">
        <section className="commanSpace comanTopSpace">
			<div className="container bookingSucessPage">
				<div className="row">
					<div className="col-md-8">
						<div className="cartLeft">
							<div className="boxWithShadow mb-3">
								<div className="bookingSucess">
									<div className="paySucss">
										<span className="fas fa-check"></span>
										<h5>Booking Successful</h5>
										<p>Confirm and E-Vouchers sent to <strong>rup.rauthan@gmail.com</strong> and <strong>+ 91-9910982699</strong></p>
										<div className="thtotalamt">
											<span className="thhd">Amount Paid</span>
											<span className="thttl">$ 13,406</span>
										</div>
									</div>
							
								</div>
							</div>
							<div className="boxWithShadow mb-3">
								<div className="sumrybid">
									<div>Summary</div>
									<div><span className="gray">Booking ID</span> PF28214330</div>
								</div>
								<div className="bkInfoBox">
									<div className="bkInfoBoxImg">
										<img src={`${baseStoreURL}/images/hotel-img/gallery-big-1-.jpg`} alt="" className="" />
									</div>
									<div className="bkInfoBoxText">
										<div className="dhName">
											<h2>Hotel Aroma Executive 
												<div className="hdStrRate">
													<img src={`${baseStoreURL}/images/star-active.png`} alt="star" className="hstrActive" />
													<img src={`${baseStoreURL}/images/star-active.png`} alt="star" className="hstrActive" />
													<img src={`${baseStoreURL}/images/star-active.png`} alt="star" className="hstrActive" />
													<img src={`${baseStoreURL}/images/star-active.png`} alt="star" className="hstrActive" />
													<img src={`${baseStoreURL}/images/star.png`} alt="" className="hstr" />
												</div>
											</h2>
											<p><i className="fas fa-map-marker-alt"></i> Greater London, United Kingdom</p>
											
										</div>
									</div>
								</div>

								<div className="thfulDetls">
									<h6 className="text-center mb-3">1 NIGHTS</h6>
									<div className="cartBinfo">
										<div>
											<span>CHECK-IN</span>
											<strong>Wed, <i>Jul 10</i>, 2024</strong>
											<span className="black">12PM</span>
										</div>
										<div>
											<span>CHECK-OUT</span>
											<strong>Thu, <i>Jul 11</i>, 2024</strong>
											<span className="black">12PM</span>
										</div>
										<div>
											<span>GUESTS & ROOMS</span>
											<strong>2 Adults | 1Room</strong>
										</div>
										<div>
											<span>PRIMARY GUEST</span>
											<strong>Mr Rup Rakesh Rauthan</strong>
										</div>
									</div>
								</div>
								
								<div className="cartFacility">
									<ul className="mb-0">
										<li className="w-100">Free Cancellation till check-in</li>
									</ul>
								</div>
							</div>
							<div className="boxWithShadow mb-3">
								<div className="thTlPrice">
									<div className="thtpHd">
										<span>Total Price</span>
										<span><strong>$ 13,406</strong></span>
									</div>
									<div className="thdetails">
										<ul>
											<li>
												<h2>Standard Room</h2>
												<span className="smallTxt gray">2 Adults</span>
											</li>
											<li>
												<h2>Price Includes</h2>
												<span className="smallTxt piInclude">Meals included</span>
												<span className="smallTxt piInclude">Free early check in</span>
												<span className="smallTxt piInclude">Free cancellation till check-in</span>
											</li>
										</ul>
										
									</div>

								</div>
							</div>


							<div className="boxWithShadow mb-3">
								<div className="cartInfobox">
									<h2>Important Information</h2>
									<h4>Guest House Rules</h4>
									<ul>
										<li>Passport, Aadhar and Driving License are accepted as ID proof(s)</li>
										<li>Pets are not allowed</li>
										<li>Local ids not allowed</li>
									</ul>
								</div>
							</div>



						</div>
					</div>

					<div className="col-md-4">
						<div className="cartRight">
							<div className="cartRightBox mb-3">
								<div className="cartPaymentInfo thmanageTrip">
									<h3>Manage Your Trip</h3>
									<ul className="purchase-props">
										<li><Link href=""><span className="fas fa-phone"></span> Contact Property</Link></li>
										<li><Link href=""><span className="fas fa-ticket-alt"></span> Cancel Booking</Link></li>
										<li><Link href=""><span className="fas fa-hamburger"></span> Add Meal</Link></li>
										<li><Link href="add-guest.html"><span className="fas fa-user-plus"></span> Add Guest</Link></li>
										<li><Link href=""><span className="fas fa-cloud-download-alt"></span> Download Ticket</Link></li>
									</ul>
								</div>
							</div>
							<Link href="my-account-listing.html" className="btn btn-primary w-100 gtmtBtn">Go to My Trip</Link>
						</div>
					</div>

				</div>
			</div>
		</section>



	</section>
  )
}

export default Thanks