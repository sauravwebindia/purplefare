import React from 'react';
import { baseStoreURL } from '@/repositories/Repository';

export default function HomeVideo(){
    return(
        <div className="hVideo">
            <div className="videobox">
                <a id="play-video" className="video-play-button" href="#"><span></span></a>
                <img src={`${baseStoreURL}/images/home/videobanner.jpg`} alt="videobanner.jpg"/>
            </div>
        </div>
    );
}