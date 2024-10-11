import React from 'react';

export default function HomeWhyBookWithUs(){
		return(
			<>
                <div className="container mt-4">
                    <div className="row">
                        <div className="col-sm">
                            <h2 className="title-2 text-center pb-3">Why Book with Us?</h2>
                        </div>
                    </div>
                </div>
                <div className="container wbwUs">
                    <div className="row">
                        <div className="col-sm">
                            <div className="bg-white shadow-md border borderRadiComman">
                                <div className="ybwsbox">
                                    <img src="images/home/savebig.jpg" alt=""/>
                                </div>
                                <div className="text-center px-1 ybwsboxText">
                                    <h3 className="pb-3">Save big</h3>
                                    <span>Unlock incredible savings on flights, hotels, cruise and holiday packages! Travelling doesn't have to be expensive, thanks to unique deals and discounts. Book now to save big on your next trip!</span>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm">
                            <div className="bg-white shadow-md border borderRadiComman">
                                <div className="ybwsbox">
                                    <img src="images/home/easybooking.jpg" alt=""/>
                                </div>
                                <div className="text-center px-1 ybwsboxText">
                                    <h3 className="pb-3">Easy Booking</h3>
                                    <span>It's never been easier to book your next trip! With our simple and user-friendly interface, you can effortlessly find and book flights, hotels, cruise and other travel options. Travel hassle-free with PurpleFare!</span>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm">
                            <div className="bg-white shadow-md border borderRadiComman">
                                <div className="ybwsbox">
                                    <img src="images/home/incredible.jpg" alt=""/>
                                </div>
                                <div className="text-center px-1 ybwsboxText">
                                    <h3 className="pb-3">Incredible Deals</h3>
                                    <span>PurpleFare offers great travel deals! Enjoy special discounts on flights, hotels, and holiday packages, all designed to make your dream trip more reasonable. Your next adventure awaits—book now to save big!</span>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm">
                            <div className="bg-white shadow-md border borderRadiComman">
                                <div className="ybwsbox">
                                    <img src="images/home/support.jpg" alt=""/>
                                </div>
                                <div className="text-center px-1 ybwsboxText">
                                    <h3 className="pb-3">24/7 Support</h3>
                                    <span>PurpleFare is available 24/7. Regardless of where you are or what time it is, our devoted crew is always available to help with any queries or concerns. Travel with confidence, knowing that support is only a phone call!</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
		);
}