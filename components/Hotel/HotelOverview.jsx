import React from 'react';
import Link from 'next/link';
import { baseStoreURL } from '@/repositories/Repository';

export default function HotelOverview(props){
	return (
        <div className="row">
            <div className="col-md-9">
                <div className="dhName">
                    <h2>About Hotel Aroma Executive 
                        <div className="hdStrRate">
                            <img src="images/star-active.png" alt="" className="hstrActive"/>
                            <img src="images/star-active.png" alt="" className="hstrActive"/>
                            <img src="images/star-active.png" alt="" className="hstrActive"/>
                            <img src="images/star-active.png" alt="" className="hstrActive"/>
                            <img src="images/star.png" alt="" className="hstr"/>
                        </div>
                    </h2>
                    <p><i className="fas fa-map-marker-alt"></i> Greater London, United Kingdom - <a href="">View on map</a></p>
                </div>
            </div>
            <div className="col-md-3">
                <div className="hdRatings">
                    <a href=""><img src={`${baseStoreURL}/images/share-icon.png`} alt="" className="shareIcon" /></a>
                    <div className="hdRatingbox">
                        <Link href="#" className="">7.8</Link> <strong>Excellent <span>800 User reviews </span></strong>
                    </div>
                </div>
            </div>
        </div>
    );
}