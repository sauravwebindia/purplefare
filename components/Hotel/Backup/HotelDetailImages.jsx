import React, { useEffect, useState,Fragment } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router'; 
import { formatCurrency,generateTempArray } from '@/utilities/common-helpers';
import { baseStoreURL } from '@/repositories/Repository';
import HotelRepository from '@/repositories/HotelRepository';
import dynamic from "next/dynamic";
const OwlCarousel = dynamic(() => import("react-owl-carousel"), {
	ssr: false,
  });
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

export default function HotelDetailImages(props){
    const Router = useRouter();
    const [mainImage,setMainImage] = useState(null);
    const [rooms,setRooms] = useState([]);
    const [defaultRoom,setDefaultRoom] = useState(null);
    const [adults,setAdults] = useState(0);
    const [child,setChild] = useState(0);
    const [totalRooms,setTotalRooms] = useState(0);
    let facilitiesArray = new Array();
    useEffect(() => {  
        let mounted = true;
        let searchParams = "";
        let checkInDate = Router.query.checkInDate;
        let checkOutDate = Router.query.checkOutDate;
        let adults = Router.query.adults;
        let child = Router.query.child;
        let childAge = Router.query.childAge;
        let searchType = Router.query.searchType;
        let searchValue = Router.query.searchValue; 
        let searchSource = Router.query.searchSource;   
        let rooms = Router.query.rooms; 
        let traceId = Router.query.traceId;
        let cityName = Router.query.cityName;
        searchParams = {'traceId':traceId,'cityName':cityName,'searchSource':searchSource,'searchType':searchType,'searchValue':searchValue,'checkInDate':checkInDate,'checkOutDate':checkOutDate,'adults':adults,'rooms':rooms,'child':child,'childAge':childAge.split(",")};
        if(props==null || props=='' || props==undefined){
            Router.push('/');
        }
        for(let k=0;k<props.hotel.facilities.length;k++){
            let facility = props.hotel.facilities[k];
            if(facility.key=='Facilities'){
                facilitiesArray.push(facility.value);
            }
        }
        if(props.hotel.images.main_image!=null && props.hotel.images.main_image!=undefined && props.hotel.images.main_image!=''){
            setMainImage(props.hotel.images.main_image);
        }        
        if(searchParams!='' && searchParams!=null && searchParams!=undefined){
            fetchHotelRooms(searchParams);
        }
        return () => mounted = false;
    }, []);  

    async function fetchHotelRooms(searchParams){
        let searchObject = searchParams;
        if(searchObject.searchSource=='HotelBeds'){
            setTotalRooms(searchObject.rooms);
            setAdults(searchObject.adults);
            setChild(searchObject.child);
            searchObject.hotelCode = Router.query.hotelcode;            
            const responseData = await HotelRepository.fetchHotelBedsRooms(searchObject);
            if(responseData.success){
                try{
                    localStorage.removeItem('hotel_beds_rooms'); 
                }catch(e){
        
                }
                setRooms(responseData.data.rooms);
                let jsonRoom = JSON.stringify(responseData.data.rooms);
                localStorage.setItem('hotel_beds_rooms',jsonRoom);
                let newArr = responseData.data.rooms.slice(0, 1);                
                if(newArr.length>0){
                    let tempArray = new Array();
                    let roomCode = newArr[0]['code'];
                    tempArray['code'] = roomCode;
                    tempArray['name'] = newArr[0]['name'];
                    tempArray['rates'] = newArr[0]['rates'];
                    let defaultRate = newArr[0]['rates'][0];
                    tempArray['defaultRate'] = defaultRate;
                    if(props.hotel.rooms!=null && props.hotel.rooms!=undefined && props.hotel.rooms!=''){
                        if(props.hotel.rooms.length>0){
                            for(let r=0;r<props.hotel.rooms.length;r++){
                                let loopRoom = props.hotel.rooms[r];
                                if(loopRoom.roomCode==roomCode){
                                    tempArray['isParentRoom'] = loopRoom.isParentRoom;
                                    tempArray['minPax'] = loopRoom.minPax;
                                    tempArray['maxPax'] = loopRoom.maxPax;
                                    tempArray['minAdults'] = loopRoom.minAdults;
                                    tempArray['maxAdults'] = loopRoom.maxAdults;
                                    tempArray['maxChildren'] = loopRoom.maxChildren;
                                    tempArray['description'] = loopRoom.description;
                                    tempArray['type'] = loopRoom.type.description.content;
                                    tempArray['characteristic'] = loopRoom.characteristic.description.content;
                                    if(loopRoom.isParentRoom==true){
                                        tempArray['roomFacilities'] = loopRoom.roomFacilities;
                                        tempArray['roomStays'] = loopRoom.roomStays;
                                    }else{
                                        tempArray['roomFacilities'] = null;
                                        tempArray['roomStays'] = null;
                                    }
                                    break;
                                }
                            }
                        }
                    }
                    setDefaultRoom(tempArray);
                }
            }
        }
    }
    
    function titleCase(str) {
        var splitStr = str.toLowerCase().split(' ');
        for (var i = 0; i < splitStr.length; i++) {
            // You do not need to check if i is larger than splitStr length, as your for does that for you
            // Assign it back to the array
            splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
        }
        // Directly return the joined string
        return splitStr.join(' '); 
    }

    let responsiveObject = {
		0:{
			items:4
		},
		600:{
			items:4
		},
		1000:{
			items:4
		}
	};

    const handleImage = (image) => {
        let mainImage = image.replace("https://photos.hotelbeds.com/giata/","https://photos.hotelbeds.com/giata/bigger/");
        setMainImage(mainImage);
    }

	return (
        <Fragment>
            <div className="row hdGalleryDetls">	
                {props.hotel.images!=null && props.hotel.images!=undefined && props.hotel.images!=''?				
                <div className="col-md-6">
                    <div className="hdgallery">
                        {props.hotel.images.main_image!=null && props.hotel.images.main_image!=undefined && props.hotel.images.main_image!=''?
                        <div className="hdgBigImg">
                            <img src={mainImage} alt={`${props.hotel.name}`}/>
                        </div>
                        :''}
                        {props.hotel.images.all_images!=null && props.hotel.images.all_images!=undefined && props.hotel.images.all_images!='' && props.hotel.images.all_images.length>0?
                        <div className="hdgThumb">
                            <OwlCarousel className='owl-theme' responsive={responsiveObject} slideBy={1} loop={false} lazyLoad={true} autoplay={false} dots={false} margin={10} navText={['<a href="javascript:void(0);" class="ssArrow lSlideArrow"><img src="'+baseStoreURL+'/images/home/left-slider-arrow.png" alt="left-slider-arrow.png" class="img-fluid"/></a>','<a href="javascript:void(0);" class="ssArrow rSlideArrow"><img src="'+baseStoreURL+'/images/home/right-slider-arrow.png" alt="right-slider-arrow.png" class="img-fluid" /></a>']} nav>
                                {props.hotel.images.all_images.map((item,i) => (
                                    <div className="hdgthumbImg" key={i}>
                                        <a href="javascript:;" onClick={(e) => handleImage(item)}><img src={`${item}`} alt={`${props.hotel.name}`}/></a>
                                    </div>
                                ))}                            
                            </OwlCarousel>
                        </div>
                        :''}
                    </div>
                </div>
                :''}
                {rooms!=null && rooms!=undefined && rooms!=''?
                    rooms.length>0?                
                    <div className="col-md-3">
                        <div className="hdPriceBox">
                            <h3>{defaultRoom.name}</h3>
                            <span className="hdgustDetls pb-4">{adults} x Guest | {totalRooms} x Room</span>
                            <strong className="hdoldPrice">{defaultRoom.defaultRate.currencySign} {formatCurrency(defaultRoom.defaultRate.new_sellingRate)}</strong>
                            <strong className="hdtlsPrice">{defaultRoom.defaultRate.currencySign} {formatCurrency(defaultRoom.defaultRate.totalNet)}</strong>                        
                            <span className="hdRoomDtls">1 Room / Per Night</span>
                            {defaultRoom.defaultRate.taxes!=null && defaultRoom.defaultRate.taxes!=undefined && defaultRoom.defaultRate.taxes!=''?
                                <span className="hdTaxFee">+ {defaultRoom.defaultRate.currencySign}{formatCurrency(defaultRoom.defaultRate.taxes.taxes[0].new_amount)} Taxes & fees</span>
                            :''}

                            <a href="#roomsid" className="btn hdButton mt-4">Select Room</a>
                        </div>
                    </div>
                    :''
                :''}
                {
                props.hotel.facilitiesOverview!=null && props.hotel.facilitiesOverview!=undefined && props.hotel.facilitiesOverview!='' && props.hotel.facilitiesOverview.length>0?
                <div className="col-md-3">
                    <div className="amiBox">
                        <h4>Amenities & Services</h4>
                        <ul>
                            {props.hotel.facilitiesOverview.map((item,i) => (
                            <li key={i}>{item}</li>
                            ))}
                        </ul>
                        <a href="#amenitiesid" className="mAmenLink">More Amenities</a>
                    </div>
                </div>
                :''}
            </div>
            {defaultRoom!=null?
            <div className="dockable">
                <div className="dockableInn">
                    <div className="dockLeft">
                        <strong className="hdoldPrice">{defaultRoom.defaultRate.currencySign} {formatCurrency(defaultRoom.defaultRate.new_sellingRate)}</strong>
                        <strong className="tlsPrice">{defaultRoom.defaultRate.currencySign} {formatCurrency(defaultRoom.defaultRate.totalNet)}</strong>
                        {defaultRoom.defaultRate.taxes!=null && defaultRoom.defaultRate.taxes!=undefined && defaultRoom.defaultRate.taxes!=''?
                            <span className="hdTaxFee">+ {defaultRoom.defaultRate.currencySign}{formatCurrency(defaultRoom.defaultRate.taxes.taxes[0].new_amount)} Taxes & fees</span>
                        :''}
                    </div>
                    <div className="dockRight">
                        <a href="#roomsid" className="btn bnBtn">Select Room</a>
                    </div>
                </div>
            </div>
            :''}
        </Fragment>
    );
}