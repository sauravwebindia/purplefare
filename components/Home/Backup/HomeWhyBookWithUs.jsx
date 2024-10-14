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
                                    <span>Lorem Ipsum is simply dummy text of the printing and typesetting</span>
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
                                    <span>Lorem Ipsum is simply dummy text of the printing and typesetting</span>
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
                                    <span>Lorem Ipsum is simply dummy text of the printing and typesetting</span>
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
                                    <span>Lorem Ipsum is simply dummy text of the printing and typesetting</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
		);
}