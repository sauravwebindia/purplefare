import React from 'react';

export default function HomeLatestNews() {
    return (
        <>
            <div className="container mt-4">
                <div className="row">
                    <div className="col-sm">
                        <h2 className="title-2 text-center pb-3">Latest News</h2>
                    </div>
                </div>
            </div>
            <div className="container blogHomeSection">
                <div className="row">
                    <div className="col-sm">
                        <div className="hblogBx">
                            <div className="blogImg">
                                <img src="images/home/about.jpg" alt="" className="img-fluid" />
                                <span className="flex dateBox">
                                    <img src="images/home/date.jpg" alt="" /> 16 May 2022
                                </span>
                            </div>
                            <div className="w-100 text-center blogText">
                                <span className="mr-3 mt-1 mb-3 text-xs flex justify-center text-center"><img
                                        src="images/home/bloguser.jpg" alt="" /> By John Smith</span>
                                <p className="block">Contrary to popular belief, Lorem Ipsum is not simply random text.</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm">
                        <div className="hblogBx">
                            <div className="blogImg">
                                <img src="images/home/about.jpg" alt="" className="img-fluid" />
                                <span className="flex dateBox">
                                    <img src="images/home/date.jpg" alt="" /> 16 May 2022
                                </span>
                            </div>
                            <div className="w-100 text-center blogText">
                                <span className="text-gray-400 mr-3 mt-1 mb-3 text-xs flex justify-center items-center"><img
                                        src="images/home/bloguser.jpg" alt="" /> By John Smith</span>
                                <p className="block">Contrary to popular belief, Lorem Ipsum is not simply random text.</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm">
                        <div className="hblogBx">
                            <div className="blogImg">
                                <img src="images/home/about.jpg" alt="" className="img-fluid" />
                                <span className="flex dateBox">
                                    <img src="images/home/date.jpg" alt="" /> 16 May 2022
                                </span>
                            </div>
                            <div className="w-100 text-center blogText">
                                <span className="text-gray-400 mr-3 mt-1 mb-3 text-xs flex justify-center items-center"><img
                                        src="images/home/bloguser.jpg" alt="" /> By John Smith</span>
                                <p className="block">Contrary to popular belief, Lorem Ipsum is not simply random text.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12 text-center mt-4">
                        <a href="" className="hBlogBtn">View More</a>
                    </div>
                </div>
            </div>
        </>
    );
}