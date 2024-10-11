import React from 'react'
import Link from 'next/link';
import {baseStoreURL} from '@/repositories/Repository';
function CancelHotel() {
  return (
    <section className="innerPage">
    <section className="commanSpace comanTopSpace">
        <div className="container myAcctTripDelsPage">
            <div className="row">
                <div className="col-md-12">
                    <div className="matdetails">
                        <div className="matdPages">
                            <div className="row">
                                <div className="col-md-8 col-md-8-half">
                                    <div className="cartLeft">
                                        <div className="matdBox">
                                            <div className="matdInn">
                                                <div className="matdIcon">
                                                    <img src={`${baseStoreURL}/images/my-account/edit-users.png`} alt="edit user" className="" />
                                                </div>
                                                <div className="bkInfoBoxText">
                                                    <h1>Cancel Hotel</h1>
                                                    <div className="dhName">
                                                        <h2>Hotel Aroma Executive 
                                                            <div className="hdStrRate">
                                                                <img src={`${baseStoreURL}/images/star-active.png`} alt="star" className="hstrActive" />
                                                                <img src={`${baseStoreURL}/images/star-active.png`} alt="star" className="hstrActive" />
                                                                <img src={`${baseStoreURL}/images/star-active.png`} alt="star" className="hstrActive" />
                                                                <img src={`${baseStoreURL}/images/star-active.png`} alt="star" className="hstrActive" />
                                                                <img src={`${baseStoreURL}/images/star.png`} alt="star" className="hstr" />
                                                            </div>
                                                        </h2>
                                                    </div>
                                                </div>
                                                <div className="matdrg">
                                                    <img src={`${baseStoreURL}/images/my-account/change-date.png`} alt="date" className="maccdImg" /> Wed, Jul 10 - Thu, Jul 11
                                                </div>
                                            </div>
                                        </div>
                                        <div className="stepsag">
                                            <div className="tabbable">
                                                <ul className="nav nav-tabs wizard">
                                                  <li><Link href='#' className="active"><span className="nmbr">1</span>Select reason for Cancellation</Link></li>
                                                  <li><Link href='#'><span className="nmbr">2</span>View Refund</Link></li>
                                                  <li><Link href='#'><span className="nmbr">3</span>Confirm Cancellation</Link></li>
                                                </ul>
                                            </div>
                                        </div>
                                       <h5 className="mt-3 mb-2">Select reason fro cancelling this booking</h5>
                                        <p>This information will help us in providing better experience</p>
                                        <div className="mb-3">
                                            <div className="cancelType">
                                                    <div className="cancelType">
                                                        <ul>
                                                            <li>
                                                                <input type="radio" id="radio1" name="radio01" />
                                                                <label for="radio1">I want to change dates</label>
                                                            </li>
                                                            <li>
                                                                <input type="radio" id="radio2" name="radio02" />
                                                                <label for="radio2">I want to change primary guest name</label>
                                                            </li>
                                                            <li>
                                                                <input type="radio" id="radio3" name="radio3" />
                                                                <label for="radio3">I want to add/remove guests</label>
                                                            </li>
                                                            <li>
                                                                <input type="radio" id="radio4" name="radio04" />
                                                                <label for="radio4">My plan is cancelled</label>
                                                            </li>
                                                            <li>
                                                                <input type="radio" id="radio5" name="radio5" checked="checked" />
                                                                <label for="radio5">I found a better property</label>
                                                            </li>
                                                            <li>
                                                                <input type="radio" id="radio6" name="radio6" />
                                                                <label for="radio6">Other</label>
                                                            </li>
                                                        </ul>
                                                    </div>
                                            </div>
                                        </div>
                                        <div className="fgtAvailBtn">
                                            <Link  href='#' className="btn btn-primary w-40 gtmtBtn float-left bgColorGray black font-weight-normal">Back</Link> <Link  href='#' className="btn btn-primary w-40 gtmtBtn">Proceed to Cancal</Link>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4 col-md-4-half">
                                    <div className="maccHotelCard">
                                        <article className="card">
                                            <div className="maccHotelCardImg">
                                                <img src={`${baseStoreURL}/images/my-account/hotel-room.jpg`} alt="hotel room" />
                                            </div>
                                            <div className="macchcName">
                                                <h2>Hotel Aroma Executive 
                                                    <div className="hdStrRate">
                                                        <img src={`${baseStoreURL}/images/star-active.png`} alt="" className="hstrActive" />
                                                        <img src={`${baseStoreURL}/images/star-active.png`} alt="" className="hstrActive" />
                                                        <img src={`${baseStoreURL}/images/star-active.png`} alt="" className="hstrActive" />
                                                        <img src={`${baseStoreURL}/images/star-active.png`} alt="" className="hstrActive" />
                                                        <img src={`${baseStoreURL}/images/star.png`} alt="" className="hstr" />
                                                    </div>
                                                </h2>
                                            </div>
                                            <div className="small"><span className="fas fa-times text-red"></span> <span>Standard Room (Non AC)2X x 1</span></div>
                                            <ul>
                                                <li><span>Total Paid:</span> $0</li>
                                                <li><span>Deductions:</span> $0</li>
                                                <li><span><strong className="text-red">Refund Amount:</strong></span> <strong className="text-red">$0</strong></li>
                                            </ul>
                                            <Link href='#' className="btn btn-primary w-100 gtmtBtn">Proceed to Cancal</Link>
                                        </article>
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
export default CancelHotel