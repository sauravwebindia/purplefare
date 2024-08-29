import React from 'react'
import Link from 'next/link';
import {baseStoreURL} from '@/repositories/Repository';
function MyAccountDetails() {
  return (
    <section className="innerPage">
    <section className="commanSpace comanTopSpace">
        <div className="container myAcctTripDelsPage">
            <div className="row">
                <div className="col-md-12">
                    <div className="matdetails">
                        <div className="matdHdrs">
                            <h1>Your Booking is Confirmed!</h1>
                            <p className="bkdinfo">
                                <span className="bkdid">Booking ID: <strong className="text-green">PF28214330</strong></span>
                                <span className="bkdid">Reference PNR: <strong className="text-green">01240987(Room 1)</strong></span>
                            </p>
                        </div>

                        <div className="matdPages">
                            <div className="row">
                                <div className="col-md-8 col-md-8-half">
                                    <div className="cartLeft">
                                        
                                        <div className="boxWithShadow mb-3">
                                            <span className="badge bg-secondary d-inline-block mb-3">Guest House</span>
                                            <div className="bkInfoBox">
                                                <div className="bkInfoBoxImgCover">
                                                    <div className="bkInfoBoxImg">
                                                        <img src={`${baseStoreURL}/images/hotel-img/gallery-big-1-.jpg`} alt="" className="" />
                                                    </div>
                                                    <div className="bkInfoBoxImgMap">
                                                        <Link href="#"><img src={`${baseStoreURL}/images/map-img.jpg`} alt="" className="" /></Link>
                                                    </div>
                                                </div>
                                                <div className="bkInfoBoxText">
                                                    <div className="dhName">
                                                        <h2>Hotel Aroma Executive 
                                                            <div className="hdStrRate">
                                                                <img src={`${baseStoreURL}/images/hotel-img/star-active.png`} alt="" className="hstrActive" />
                                                                <img src={`${baseStoreURL}/images/hotel-img/star-active.png`} alt="" className="hstrActive" />
                                                                <img src={`${baseStoreURL}/images/hotel-img/star-active.png`} alt="" className="hstrActive" />
                                                                <img src={`${baseStoreURL}/images/hotel-img/star-active.png`} alt="" className="hstrActive" />
                                                                <img src={`${baseStoreURL}/images/hotel-img/star.png`} alt="" className="hstr" />
                                                            </div>
                                                        </h2>
                                                        <p><i className="fas fa-map-marker-alt"></i> Greater London, United Kingdom</p>
                                                        <div className="hotelContact">Contact: 1234567890, 1234567890 - Saurav</div>

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
                                                            </div>
                                                        </div>

                                                        <div className="rtype pt-2">
                                                            <span className="rtypeInn">ROOM TYPE</span><br/>
                                                            <span><strong className="d-inline-block mr-2">1 x Standard Room (Non AC)2X</strong> <span className="text-small text-red">X No Meals Included</span></span>
                                                        </div>

                                                    </div>
                                                </div>
                                            </div>
                                            
                                            <div className="ttRow">
                                                <div className="ttRowInn">
                                                    <i className="fas fa-ticket-alt" aria-hidden="true"></i> Download Voucher
                                                </div>
                                                <div className="ttRowInn">
                                                    <i className="fas fa-envelope" aria-hidden="true"></i> Email Voucher
                                                </div>
                                                <div className="ttRowInn">
                                                    <i className="fas fa-info-circle" aria-hidden="true"></i> View All House Rules
                                                </div>
                                            </div>
                                        </div>
                                        <div className="boxWithShadow bgColored mb-3">
                                            <div className="maccdbox">
                                                <h2>Important Information for Check-in</h2>
                                                <ul>
                                                    <li>Unmarried couples are not allowed</li>
                                                    <li>Local ids not allowed</li>
                                                    <li>Passport, Aadhar and Driving License are accepted as ID proof(s)</li>
                                                    <li>Outside food is allowed</li>
                                                    <li>Non veg food is allowed</li>
                                                </ul>
                                                <Link href="#" className="linkBtn">View All Links</Link>
                                            </div>
                                        </div>

                                        <div className="boxWithShadow mb-3">
                                            <div className="maccdbox">
                                                <h2>Request Guest House for specific requirement</h2>
                                                <p>Send a request to the guest House or ask for specific information about your stay.</p>
                                                <div className="guestHouseInfo">
                                                    <Link href="javascript:;" className="btn btn-outline-primary">Late Check Out</Link>
                                                    <Link href="javascript:;" className="btn btn-outline-primary">Late Check In</Link>
                                                    <Link href="javascript:;" className="btn btn-outline-primary">Early Check In</Link>
                                                    <Link href="javascript:;" className="btn btn-outline-primary">Bed Type or Floor or View Request</Link>
                                                    <Link href="javascript:;" className="btn btn-outline-primary">Celebrations</Link>
                                                    <Link href="javascript:;" className="btn btn-outline-primary">Additional Meals</Link>
                                                </div>
                                            </div>
                                        </div>
            
            
                                        <div className="boxWithShadow mb-3">
                                            <div className="maccdbox">
                                                <h2>Booking Details</h2>
                                                <p>Your room, meal plan and guest details</p>
                                                <div className="maccBkDetails">
                                                    <div className="maccBkDetls">
                                                        <strong><img src={`${baseStoreURL}/images/my-account/night.png`} alt="night" className="maccdImg" /> 1 Night(s)</strong>
                                                    </div>
                                                    <div className="maccBkDetls">
                                                        <span className="maccbd">check-in</span>
                                                        <strong className="maccbdBold">Wed, <i>Jul 10</i>, 2024</strong>
                                                        <span className="maccbdSmall">12:00 PM onwards</span>
                                                    </div>
                                                    <div className="maccBkDetls">
                                                        <span className="maccbd">check-in</span>
                                                        <strong className="maccbdBold">Wed, <i>Jul 11</i>, 2024</strong>
                                                        <span className="maccbdSmall">Till 12:00 PM</span>
                                                    </div>
                                                </div>
                                                <hr/>

                                                <div className="maccBkDetails">
                                                    <div className="maccBkDetls">
                                                        <strong><img src={`${baseStoreURL}/images/my-account/group.png`} alt="" className="maccdImg" /> 2 Guest(s)</strong>
                                                    </div>
                                                    <div className="maccBkDetls">
                                                        <span className="maccbd">Total Guest(s)</span>
                                                        <strong className="maccbdBold">2 Adults</strong>
                                                        <span className="maccbdSmall">Phone No.</span>
                                                        <strong className="maccbdBold">1234567890</strong>
                                                    </div>
                                                    <div className="maccBkDetls">
                                                        <span className="maccbd">Primary Guest</span>
                                                        <strong className="maccbdBold">Rup rakesh Rauthan</strong>
                                                        <span className="maccbdSmall">Email ID</span>
                                                        <strong className="maccbdBold">rup.rauthan@gmail.com</strong>
                                                    </div>
                                                </div>
                                                <hr/>

                                                <div className="maccBkDetails">
                                                    <div className="maccBkDetls">
                                                        <strong><img src={`${baseStoreURL}/images/my-account/door.png`} alt="" className="maccdImg" /> 1 Room(s)</strong>
                                                    </div>
                                                    <div className="maccBkDetls">
                                                        <strong className="maccbdBold">Standard Room (Non AC) 2X</strong>
                                                        <span className="maccbd">WI-FI | Chair <Link href="javascript:;" className="linkFormat">+ 10 Amenities</Link></span>
                                                        
                                                        <span className="maccbdSmall"><span className="fas fa-user"></span> 2 Adults</span>
                                                        <span className="maccbdSmall"><span className="fas fa-hamburger"></span> <span className="text-red">No Meal Included, Pay at hotel directly for meals</span></span>
                                                    </div>
                                                    <div className="maccBkDetls">
                                                        <div className="htlRom">
                                                            <img src={`${baseStoreURL}/images/my-account/hotel-room.jpg`} alt="" className="" />
                                                        </div>
                                                    </div>
                                                </div>
                                                

                                            </div>
                                        </div>
            
                                        <div className="boxWithShadow mb-3">
                                            <div className="maccdbox">
                                                <h2>Cancellation</h2>
                                                <p className="green">Free Cancellation Till 10July2024, 11:50 AM</p>
                                                <div className="maccSteps">
                                                            <div className="container">
                                                                <div className="row">
                                                            
                                                                <div className="col-md-12 col-lg-12">
                                                                    <div id="tracking-pre"></div>
                                                                    <div id="tracking">
                                                                    <div className="tracking-list">
                                                                        <div className="tracking-item">
                                                                        <div className="tracking-icon status-intransit trackingRed">
                                                                            
                                                                        </div>

                                                                        <div className="tracking-content trackingRed">
                                                                            <span className="text-red">After check-in</span>
                                                                            <span>
                                                                                <strong className="text-red">Cancellation not possible</strong>
                                                                                <span>Not cancellation or amendment possible</span>
                                                                            </span>
                                                                            <span>
                                                                                <Link href="" className="btn btn-primary w-100 mcctBtn">Cancel</Link>
                                                                            </span>
                                                                        </div>
                                                                        </div>
                                                                        <div className="tracking-item">
                                                                            <div className="tracking-icon status-intransit trackingGreenBg"></div>

                                                                            <div className="tracking-content trackingGreen">
                                                                                <span className="text-red">
                                                                                    <strong className="text-green">Before Wed, Jul 11, 12:00 PM<br/> 
                                                                                        [destination time]
                                                                                    </strong>
                                                                                </span>
                                                                                <span>
                                                                                    <strong className="text-green">Fully refundable</strong>
                                                                                    <span>You will get 100% refund</span>
                                                                                </span>
                                                                                <span>
                                                                                        &nbsp;
                                                                                </span>
                                                                            </div>

                                                                        </div>
                                                                        <div className="tracking-item">
                                                                        <div className="tracking-icon status-intransit trackingOrangeBg">
                                                                            
                                                                        </div>

                                                                            <div className="tracking-content trackingOrange">
                                                                                <span className="text-red">
                                                                                    <strong className="text-orange">After Wed, Jul 11, 12:00 PM<br/> 
                                                                                        [destination time]
                                                                                    </strong>
                                                                                </span>
                                                                                <span>
                                                                                    <strong className="text-orange">Cancellation charges applicable</strong>
                                                                                    <span>Cancellation charges applicable as per policy</span>
                                                                                </span>
                                                                                <span>
                                                                                        &nbsp;
                                                                                </span>
                                                                            </div>
                                                                        </div>
                                                                        
                                                                    </div>
                                                                    </div>
                                                                </div>

                                                                <div className="col-md-12">
                                                                    <ul>
                                                                        <li>Free Cancellation (100% refund) if you cancel this booking before 2024-08-06 11:59:59 (destination time)</li>
                                                                        <li>Cancellations made after 2024-08-06 11:59:59 (destination time) will be subject to a hotel fee equal to the 100% of the booking amount.</li>
                                                                    </ul>
                                                                </div>

                                                                </div>
                                                            </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="boxWithShadow mb-3">
                                            <div className="maccdbox">
                                                <h2>Guest House Details</h2>
                                                <p>Amenities and photographs of Mahesh guest house</p>
                                                <div className="macAmi">
                                                    <ul>
                                                        <li>Power Backup</li>
                                                        <li>Free WI-FI</li>
                                                        <li>24-hour Room Service</li>
                                                        <li>Housekeeping</li>
                                                        <li>Air Conditioning</li>
                                                        <li>Newspaper</li>
                                                    </ul>
                                                    <Link href="javascript:;" className="linkFormat">+ 10 Amenities</Link>
                                                </div>
                                                <div className="macGustPhoto">
                                                    <div className="mgPhoto"><img src={`${baseStoreURL}/images/my-account/hotel-room.jpg`} alt="" /></div>
                                                    <div className="mgPhoto"><img src={`${baseStoreURL}/images/my-account/hotel-room.jpg`} alt="" /></div>
                                                    <div className="mgPhoto"><img src={`${baseStoreURL}/images/my-account/hotel-room.jpg`} alt="" /></div>
                                                    <div className="mgPhoto"><div className="macMorePhoto"><strong>+10</strong> <span>Photo(s)</span></div></div>
                                                </div>
                                            </div>
                                        </div>

            
                                    </div>
                                </div>
            
                                <div className="col-md-4 col-md-4-half">
                                    <div className="cartRight">
                                        
                                        <div className="cartRightBox mb-3">
                                            <div className="cartPaymentInfo thmanageTrip">
                                                <h3>Need Modification</h3>
                                                <ul className="purchase-props">
                                                    <li><Link href="add-guest.html"><span className="fas fa-user-plus"></span> Modify Guest</Link></li>
                                                    <li><Link href="my-profile-edit.html"><span className="fas fa-user"></span> Change Name</Link></li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="cartRightBox mb-3">
                                            <div className="cartPaymentInfo thmanageTrip">
                                                <h3>Change In Plans</h3>
                                                <ul className="purchase-props">
                                                    <li><Link href="my-account-listing.html"><span className="fas fa-times"></span> Cancel Entire Booking</Link></li>
                                                    <li><Link href="add-guest-change-date-2.html"><span className="fas fa-calendar"></span> Change Stay Dates</Link></li>
                                                </ul>
                                            </div>
                                        </div>

                                        <div className="cartRightBox mb-3">
                                            <div className="cartPaymentInfo thmanageTrip">
                                                <h3>Price Breakup</h3>
                                                <ul className="purchase-props">
                                                    <li className="flex-between">
                                                      <span className="cttitle">Hotel Booking Charges </span>
                                                      <span className="ctdtals"><strong className="hsalePrice">$ 15000</strong></span> 
                                                    </li>
                                                    <li className="flex-between">
                                                        <span className="cttitle">Taxes and fees</span>
                                                        <span className="ctdtals">$ 2,816</span> 
                                                    </li>
                                                    <li className="flex-between cartDiscount">
                                                        <span className="cttitle">Total Discount</span>
                                                        <span className="ctdtals">$ 12,508</span> 
                                                    </li>


                                                    <li className="flex-between">
                                                        <span className="cttitle">Total Price</span>
                                                        <span className="ctdtals">$ 10,590</span> 
                                                    </li>
                                                    <li className="flex-between">
                                                        <span className="cttitle"><strong>Amount paid</strong></span>
                                                        <span className="ctdtals"><strong>$ 13,406</strong></span> 
                                                    </li>
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

export default MyAccountDetails