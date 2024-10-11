import React, { useEffect,useState } from 'react';
import { useRouter } from 'next/router'; 
import parse from 'html-react-parser';

export default function HotelAboutOverview(props){
    const Router = useRouter();
    const[hotelName,setHotelName] = useState(null);
    useEffect(() => {  
        let mounted = true;
        if(props==null || props=='' || props==undefined){
            Router.push('/');
        }
        if(props.hotel==null || props.hotel=='' || props.hotel==undefined){
            Router.push('/');
        }
        setHotelName(props.hotel.name);
        return () => mounted = false;
    }, []);  

    return (
        <div className="dtalsTab overviewBox" id="overviewid">
            <h2>About {props.hotel.name}</h2>
            <p>{parse(props.hotel.description)}</p>
        </div>
    );
}