import React, { useEffect,useState } from 'react';
import { useRouter } from 'next/router'; 
import HotelRepository from '@/repositories/HotelRepository';
import { baseStoreURL } from '@/repositories/Repository';

export default function HotelReviewsRatings(props){
    const Router = useRouter();
    const [reviewsRatings,setReviewsRatings] = useState(null);
    const [loading, setLoading] = useState(false);
    useEffect(() => {  
        let mounted = true;
        if(props==null || props=='' || props==undefined){
            Router.push('/');
        }
        if(props.hotel==null || props.hotel=='' || props.hotel==undefined){
            Router.push('/');
        }
        fetchHotelReviewsRatings(props.hotel.code);
        return () => mounted = false;
    }, []); 
    
    async function fetchHotelReviewsRatings(hotelCode){
        setLoading(true);
        let params = {'code':hotelCode};
        const responseData = await HotelRepository.fetchHotelBedsReviewsRatings(params);
        if(responseData.success){
            setReviewsRatings(responseData.data.reviews);
            setLoading(false);
        }else{
            setLoading(false);
        }
    }

    if(!loading){
        return (
            <div className="dtalsTab ratingBox" id="ratingid">
                <h2>Ratings & Reviews</h2>
                <div className="rtingBox">
                    <div className="row">
                        <div className="col-md-3">
                            <div className="rtiMain">
                                <span className="rtTotal">7.8</span>
                                <span className="rtNum">
                                    <strong>Excellent</strong>
                                    800 User reviews 
                                </span>
                            </div>
                        </div>
                        <div className="col-md-9">
                            <div className="dprodRating">
                                <div className="dprodrLine">
                                    <h4>Service <span>4.5</span></h4> 
                                    <div className="progress">
                                        <div className="progress-bar" role="progressbar" style={{width: "80%"}}></div>
                                    </div>
                                </div>
                                <div className="dprodrLine">
                                    <h4>Location <span>4.5</span></h4> 
                                    <div className="progress">
                                        <div className="progress-bar" role="progressbar" style={{width: "80%"}}></div>
                                    </div>
                                </div>
                                <div className="dprodrLine">
                                    <h4>Cleanliness <span>4.5</span></h4> 
                                    <div className="progress">
                                        <div className="progress-bar" role="progressbar" style={{width: "80%"}}></div>
                                    </div>
                                </div>
                                <div className="dprodrLine">
                                    <h4>Room <span>4.5</span></h4> 
                                    <div className="progress">
                                        <div className="progress-bar" role="progressbar" style={{width: "80%"}}></div>
                                    </div>
                                </div>
                                <div className="dprodrLine">
                                    <h4>Value for Money <span>4.5</span></h4> 
                                    <div className="progress">
                                        <div className="progress-bar" role="progressbar" style={{width: "80%"}}></div>
                                    </div>
                                </div>

                                <div className="dprodrLine">
                                    <h4>Food <span>4.5</span></h4> 
                                    <div className="progress">
                                        <div className="progress-bar" role="progressbar" style={{width: "80%"}}></div>
                                    </div>
                                </div>
                                <div className="dprodrLine">
                                    <h4>Value for Money <span>4.5</span></h4> 
                                    <div className="progress">
                                        <div className="progress-bar" role="progressbar" style={{width: "80%"}}></div>
                                    </div>
                                </div>
                                <div className="dprodrLine">
                                    <h4>Value for Money <span>4.5</span></h4> 
                                    <div className="progress">
                                        <div className="progress-bar" role="progressbar" style={{width: "80%"}}></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row mt-4">
                        <div className="col-md-12">
                            <div className="dFiterBtns">
                                <span>Filter By:</span>
                                <a href="#" className="btn btn-outline-secondary active">All Review</a>
                                <a href="#" className="btn btn-outline-secondary">Housekeeping</a>
                                <a href="#" className="btn btn-outline-secondary">Location</a>
                                <a href="#" className="btn btn-outline-secondary">Service Quality</a>
                                <a href="#" className="btn btn-outline-secondary">Value For Money</a>
                                <a href="#" className="btn btn-outline-secondary">Clean Rooms</a>
                                <a href="#" className="btn btn-outline-secondary">Breakfast</a>
                                <a href="#" className="btn btn-outline-secondary">Play Area</a>
                            </div>

                            <div className="dAllReviewCard">
                                <div className="card">
                                    <div className="card-horizontal">
                                        <div className="card-body">
                                            <h4 className="card-title">About {props.hotel.name}</h4>
                                            <p className="card-text"><span className="revRated">Rated 5.0</span> <span className="revTravReview">by Ravi thakur</span> Jan 27, 2024</p>
                                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis. </p>

                                            <div className="travRevImgCover">
                                                <div className="travRevImg">
                                                    <img src={`${baseStoreURL}/images/trav-review-img.jpg`} alt="trav-review-img.jpg"/>
                                                </div>
                                                <div className="travRevImg">
                                                    <img src={`${baseStoreURL}/images/trav-review-img.jpg`} alt="trav-review-img.jpg"/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="card">
                                    <div className="card-horizontal">
                                        <div className="card-body">
                                            <h4 className="card-title">About {props.hotel.name}</h4>
                                            <p className="card-text"><span className="revRated">Rated 5.0</span> <span className="revTravReview">by Ravi thakur</span> Jan 27, 2024</p>
                                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis. </p>

                                            <div className="travRevImgCover">
                                                <div className="travRevImg">
                                                    <img src={`${baseStoreURL}/images/trav-review-img.jpg`} alt="trav-review-img.jpg"/>
                                                </div>
                                                <div className="travRevImg">
                                                    <img src={`${baseStoreURL}/images/trav-review-img.jpg`} alt="trav-review-img.jpg"/>
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
        );
    }else{
        return (
            <div className="dtalsTab ratingBox" id="ratingid">
                <h2>Ratings & Reviews</h2>
            </div>
        );
    }   
}