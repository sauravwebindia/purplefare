import React from 'react'
import Link from 'next/link';
import {baseStoreURL} from '@/repositories/Repository';
function MyAccountListing() {
  return (
    <section className="innerPage">
		<section className="commanSpace comanTopSpace">
			<div className="container bookingSucessPage">
				<div className="row">
					<div className="col-md-12">
						<div className="tripNav">
							<div className="tripNavinn">
								<Link href="my-account-listing.html" className="active"><i className="fas fa-suitcase-rolling"></i> Upcoming</Link>
								<Link href="my-account-listing-cancelled.html"><i className="fas fa-ticket-alt"></i> Cancelled</Link>
								<Link href=""><i className="fas fa-suitcase"></i> Completed</Link>
							</div>
						</div>
						<div className="macTrip">
							<div className="card overflow-hidden">
								<div className="card-content">
								  <div className="card-body cleartfix">
									<div className="media align-items-stretch">
									  <div className="align-self-center macHdr">
										 <div className="macHdrLeft">
											<div className="dhName">
												<h2>About Hotel Aroma Executive 
													<div className="hdStrRate">
													<img src={`${baseStoreURL}/images/star-active.png`} alt="" className="hstrActive" />
													<img src={`${baseStoreURL}/images/star-active.png`} alt="" className="hstrActive" />
													<img src={`${baseStoreURL}/images/star-active.png`} alt="" className="hstrActive" />
													<img src={`${baseStoreURL}/images/star-active.png`} alt="" className="hstrActive" />
													<img src={`${baseStoreURL}/images/star.png`} alt="" className="hstr" />
													</div>
												</h2>
												<p><i className="fas fa-map-marker-alt"></i> Greater London, United Kingdom | <strong>Booking ID: PF28214330</strong></p>
											</div>
										 </div>
										 <div className="macHdrRight">
											 <Link href="my-account-details.html" className="btn btn-primary w-100 gtmtBtn">View & Manage Booking</Link>
										 </div>
									  </div>
									  <div className="media-body">
										<div className="macContent">
											<div className="macCol">
												<span>CHECK-IN</span>
												<strong>Wed, Jul 10, 2024</strong>
												<span className="pink">Check in from 12:00 PM</span>
											</div>
											<div className="macCol">
												<span>CHECK-OUT</span>
												<strong>Thu, Jul 11, 2024</strong>
												<span className="black">Check Out till 12:00 PM</span>
											</div>
											<div className="macCol">
												<span className="blankSpace"> &nbsp; </span>
												<strong className="mdoor"><i className="fas fa-door-closed"></i> 1 Room(S), 1 Night(s)</strong>
												<span className="black"><i className="fas fa-user"></i> Rup Rakesh + 1</span>
											</div>
										</div>
									  </div>
									  <div className="align-self-center">
											<div className="macImp">
												<ul className="mb-0">
													<li className="w-100 text-green">Free Cancellation till check-in</li>
												</ul>
											</div>
									  </div>
									</div>
								  </div>
								</div>
							  </div>
						</div>
						<div className="macTrip">
							<div className="card overflow-hidden">
								<div className="card-content">
								  <div className="card-body cleartfix">
									<div className="media align-items-stretch">
									  <div className="align-self-center macHdr">
										 <div className="macHdrLeft">
											<div className="dhName">
												<h2>About Hotel Aroma Executive 
													<div className="hdStrRate">
														<img src={`${baseStoreURL}/images/star-active.png`} alt="" className="hstrActive" />
														<img src={`${baseStoreURL}/images/star-active.png`} alt="" className="hstrActive" />
														<img src={`${baseStoreURL}/images/star-active.png`} alt="" className="hstrActive" />
														<img src={`${baseStoreURL}/images/star-active.png`} alt="" className="hstrActive" />
														<img src={`${baseStoreURL}/images/star.png`} alt="" className="hstr" />
													</div>
												</h2>
												<p><i className="fas fa-map-marker-alt"></i> Greater London, United Kingdom | <strong>Booking ID: PF28214330</strong></p>
											</div>
										 </div>
										 <div className="macHdrRight">
											 <Link href="my-account-details.html" className="btn btn-primary w-100 gtmtBtn">View & Manage Booking</Link>
										 </div>
									  </div>
									  <div className="media-body">
										<div className="macContent">
											<div className="macCol">
												<span>CHECK-IN</span>
												<strong>Wed, Jul 10, 2024</strong>
												<span className="pink">Check in from 12:00 PM</span>
											</div>
											<div className="macCol">
												<span>CHECK-OUT</span>
												<strong>Thu, Jul 11, 2024</strong>
												<span className="black">Check Out till 12:00 PM</span>
											</div>
											<div className="macCol">
												<span className="blankSpace"> &nbsp; </span>
												<strong className="mdoor"><i className="fas fa-door-closed"></i> 1 Room(S), 1 Night(s)</strong>
												<span className="black"><i className="fas fa-user"></i> Rup Rakesh + 1</span>
											</div>
										</div>
									  </div>
									  <div className="align-self-center">
											<div className="macImp">
												<ul className="mb-0">
													<li className="w-100 text-green">Free Cancellation till check-in</li>
												</ul>
											</div>
									  </div>
									</div>
								  </div>
								</div>
							  </div>
						</div>
						<div className="macTrip">
							<div className="card overflow-hidden">
								<div className="card-content">
								  <div className="card-body cleartfix">
									<div className="media align-items-stretch">
									  <div className="align-self-center macHdr">
										 <div className="macHdrLeft">
											<div className="dhName">
												<h2>About Hotel Aroma Executive 
													<div className="hdStrRate">
													<img src={`${baseStoreURL}/images/star-active.png`} alt="" className="hstrActive" />
													<img src={`${baseStoreURL}/images/star-active.png`} alt="" className="hstrActive" />
													<img src={`${baseStoreURL}/images/star-active.png`} alt="" className="hstrActive" />
													<img src={`${baseStoreURL}/images/star-active.png`} alt="" className="hstrActive" />
													<img src={`${baseStoreURL}/images/star.png`} alt="" className="hstr" />
													</div>
												</h2>
												<p><i className="fas fa-map-marker-alt"></i> Greater London, United Kingdom | <strong>Booking ID: PF28214330</strong></p>
											</div>
										 </div>
										 <div className="macHdrRight">
											 <Link href="my-account-details.html" className="btn btn-primary w-100 gtmtBtn">View & Manage Booking</Link>
										 </div>
									  </div>
									  <div className="media-body">
										<div className="macContent">
											<div className="macCol">
												<span>CHECK-IN</span>
												<strong>Wed, Jul 10, 2024</strong>
												<span className="pink">Check in from 12:00 PM</span>
											</div>
											<div className="macCol">
												<span>CHECK-OUT</span>
												<strong>Thu, Jul 11, 2024</strong>
												<span className="black">Check Out till 12:00 PM</span>
											</div>
											<div className="macCol">
												<span className="blankSpace"> &nbsp; </span>
												<strong className="mdoor"><i className="fas fa-door-closed"></i> 1 Room(S), 1 Night(s)</strong>
												<span className="black"><i className="fas fa-user"></i> Rup Rakesh + 1</span>
											</div>
										</div>
									  </div>
									  <div className="align-self-center">
											<div className="macImp">
												<ul className="mb-0">
													<li className="w-100 text-green">Free Cancellation till check-in</li>
												</ul>
											</div>
									  </div>
									</div>
								  </div>
								</div>
							  </div>
						</div>
						<div className="macTrip">
							<div className="card overflow-hidden">
								<div className="card-content">
								  <div className="card-body cleartfix">
									<div className="media align-items-stretch">
									  <div className="align-self-center macHdr">
										 <div className="macHdrLeft">
											<div className="dhName">
												<h2>About Hotel Aroma Executive     
													<div className="hdStrRate">
													<img src={`${baseStoreURL}/images/star-active.png`} alt="" className="hstrActive" />
													<img src={`${baseStoreURL}/images/star-active.png`} alt="" className="hstrActive" />
													<img src={`${baseStoreURL}/images/star-active.png`} alt="" className="hstrActive" />
													<img src={`${baseStoreURL}/images/star-active.png`} alt="" className="hstrActive" />
													<img src={`${baseStoreURL}/images/star.png`} alt="" className="hstr" />
													</div>
												</h2>
												<p><i className="fas fa-map-marker-alt"></i> Greater London, United Kingdom | <strong>Booking ID: PF28214330</strong></p>
											</div>
										 </div>
										 <div className="macHdrRight">
											 <Link href="my-account-details.html" className="btn btn-primary w-100 gtmtBtn">View & Manage Booking</Link>
										 </div>
									  </div>
									  <div className="media-body">
										<div className="macContent">
											<div className="macCol">
												<span>CHECK-IN</span>
												<strong>Wed, Jul 10, 2024</strong>
												<span className="pink">Check in from 12:00 PM</span>
											</div>
											<div className="macCol">
												<span>CHECK-OUT</span>
												<strong>Thu, Jul 11, 2024</strong>
												<span className="black">Check Out till 12:00 PM</span>
											</div>
											<div className="macCol">
												<span className="blankSpace"> &nbsp; </span>
												<strong className="mdoor"><i className="fas fa-door-closed"></i> 1 Room(S), 1 Night(s)</strong>
												<span className="black"><i className="fas fa-user"></i> Rup Rakesh + 1</span>
											</div>
										</div>
									  </div>
									  <div className="align-self-center">
											<div className="macImp">
												<ul className="mb-0">
													<li className="w-100 text-green">Free Cancellation till check-in</li>
												</ul>
											</div>
									  </div>
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
export default MyAccountListing