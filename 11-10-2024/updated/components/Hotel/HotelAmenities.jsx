import React, { useEffect,useState } from 'react';
import { useRouter } from 'next/router'; 

export default function HotelAboutOverview(props){
    const Router = useRouter();
    const[hotelName,setHotelName] = useState(null);
    const [generalServices, setGeneralServices] = useState([]);
    const [facilites, setRoomFacilities] = useState([]);
    const [catering, setCatering] = useState([]);
    const [business, setBusiness] = useState([]);
    useEffect(() => {  
        let mounted = true;
        if(props==null || props=='' || props==undefined){
            Router.push('/');
        }
        if(props.hotel==null || props.hotel=='' || props.hotel==undefined){
            Router.push('/');
        }
        let amenities = props.hotel.amenities;
        if(amenities.length>0){
            let roomFacilityArray = new Array();
            let basicFacilityArray = new Array();
            let cateringFacilityArray = new Array();
            let businessFacilityArray = new Array();
            for(let p=0;p<amenities.length;p++){
                if(amenities[p].key.match(/Room facilities/)){
                    roomFacilityArray.push(amenities[p].value);
                }
                if(amenities[p].key=='Things to keep in mind'){
                    basicFacilityArray.push(amenities[p].value);
                }
                if(amenities[p].key=='Sports'){
                    basicFacilityArray.push(amenities[p].value);
                }
                if(amenities[p].key.match(/safety/)){
                    basicFacilityArray.push(amenities[p].value);
                }
                if(amenities[p].key=='Meals'){
                    cateringFacilityArray.push(amenities[p].value);
                }
                if(amenities[p].key=='Facilities'){
                    basicFacilityArray.push(amenities[p].value);
                }
                if(amenities[p].key=='Catering'){
                    cateringFacilityArray.push(amenities[p].value);
                }
                if(amenities[p].key=='Business'){
                    businessFacilityArray.push(amenities[p].value);
                }
                if(amenities[p].key=='Entertainment'){
                    basicFacilityArray.push(amenities[p].value);
                }
                if(amenities[p].key=='Green Programmes - Worldwide'){
                    basicFacilityArray.push(amenities[p].value);
                }                
            }
            setGeneralServices(basicFacilityArray);
            setRoomFacilities(roomFacilityArray);
            setCatering(cateringFacilityArray);
            setBusiness(businessFacilityArray);
        }
        setHotelName(props.hotel.name);
        return () => mounted = false;
    }, []);  

    return (
        <div className="dtalsTab aminitiesBox" id="amenitiesid">
            <h2>Amenities</h2>
            <div className="aminitiesBoxInn">
                {generalServices.length>0?
                    <div className="amiLine">
                        <h4>Basic Facilities</h4>
                        <ul>
                            {generalServices.map((item,i) => (
                                <li key={i}>{item}</li>
                            ))}
                        </ul>
                    </div>
                :''}
                {facilites.length>0?
                <div className="amiLine">
                    <h4>Room Facilities</h4>
                    <ul>
                        {facilites.map((item,i) => (
                            <li key={i}>{item}</li>
                        ))}
                    </ul>
                </div>
                :''}
                {catering.length>0?
                <div className="amiLine">
                    <h4>Food and Drinks</h4>
                    <ul>
                        {catering.map((item,i) => (
                            <li key={i}>{item}</li>
                        ))}
                    </ul>
                </div>
                :''}
                {business.length>0?
                <div className="amiLine">
                    <h4>Business & Others</h4>
                    <ul>
                        {business.map((item,i) => (
                            <li key={i}>{item}</li>
                        ))}
                    </ul>
                </div>
                :''}
            </div>
        </div>
    );
}