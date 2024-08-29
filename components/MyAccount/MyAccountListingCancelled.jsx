import React from 'react'
import Link from 'next/link';
import {baseStoreURL} from '@/repositories/Repository';
function MyAccountListingCancelled() {
  return (
    <section className="innerPage">
    <section className="commanSpace comanTopSpace">
        <div className="container bookingSucessPage">
            <div className="row">
                <div className="col-md-12">
                    <div className="tripNav">
                        <div className="tripNavinn">
                            <Link href="my-account-listing.html" className=""><i className="fas fa-suitcase-rolling"></i> Upcoming</Link>
                            <Link href="my-account-listing-cancelled.html" className="active"><i className="fas fa-ticket-alt"></i> Cancelled</Link>
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
                                                <span className="badge rounded-pill bg-warning lightOrangeBg">Refund is being processed</span>
                                            </h2>
                                            <p><span className="cancelledTxt">Cancelled 02 Jul</span> | <i className="fas fa-map-marker-alt"></i> Greater London, United Kingdom | <strong>Booking ID: PF28214330</strong></p>
                                        </div>
                                     </div>
                                     <div className="macHdrRight">
                                         <Link href="my-account-listing.html" className="btn btn-primary w-100 gtmtBtn">View & Manage Booking</Link>
                                     </div>
                                  </div>
                                  <div className="media-body">
                                    <div className="">
                                        <div className="hh-grayBox">
                                                <div className="container">
                                                    <div className="row">
                                                        <div className="col-md-12">
                                                            <p className="text-center"><strong>You cancelled Hotel Aroma Executive.</strong> <strong className="cancelledTxt">No refund due</strong> </p>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-12 col-md-12 pb20">
                                                            <div className="row">
                                                                <div className="order-tracking completed">
                                                                    <span className="is-complete"></span>
                                                                    <p><strong className="text-danger">Booking cancelled</strong><br />
                                                                    <span>15 Jul, 10PM</span></p>
                                                                </div>
                                                                
                                                                <div className="order-tracking">
                                                                    <span className="is-complete not-complete"></span>
                                                                    <p><strong>No refund applicable</strong><br />
                                                                    <span>Tue, June 10, 2PM</span></p>
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

export default MyAccountListingCancelled