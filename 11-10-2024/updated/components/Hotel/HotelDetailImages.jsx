import React, { useEffect, useState,Fragment } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router'; 
import { formatCurrency,generateTempArray } from '@/utilities/common-helpers';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { baseStoreURL } from '@/repositories/Repository';
import HotelRepository from '@/repositories/HotelRepository';
import dynamic from "next/dynamic";
import { connect,useDispatch } from 'react-redux';
import { addRoomItem,getRoomItems,clearRoomItems } from '@/store/rooms/action';
const OwlCarousel = dynamic(() => import("react-owl-carousel"), {
	ssr: false,
  });
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

function HotelDetailImages(props){
    const dispatch = useDispatch();  
    const Router = useRouter();
    const { hotelBooking, auth, rooms } = props.state;
    const [hotel, setHotel] = useState(props.currentHotel.hotel);
    const [mainImage,setMainImage] = useState(null);
    const [listRooms,setRooms] = useState([]);
    const [defaultRoom,setDefaultRoom] = useState(null);
    const [adults,setAdults] = useState(0);
    const [child,setChild] = useState(0);
    const [loading,setLoading] = useState(false);
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
        let roomsCount = Router.query.rooms; 
        let traceId = Router.query.traceId;
        let cityName = Router.query.cityName;
        searchParams = {'traceId':traceId,'cityName':cityName,'searchSource':searchSource,'searchType':searchType,'searchValue':searchValue,'checkInDate':checkInDate,'checkOutDate':checkOutDate,'adults':adults,'rooms':roomsCount,'child':child,'childAge':childAge.split(",")};
        if(props==null || props=='' || props==undefined){
            Router.push('/');
        }
        for(let k=0;k<props.currentHotel.hotel.facilities.length;k++){
            let facility = props.currentHotel.hotel.facilities[k];
            if(facility.key=='Facilities'){
                facilitiesArray.push(facility.value);
            }
        }
        if(props.currentHotel.hotel.images.main_image!=null && props.currentHotel.hotel.images.main_image!=undefined && props.currentHotel.hotel.images.main_image!=''){
            setMainImage(props.currentHotel.hotel.images.main_image);
            setAdults(adults);
            setChild(child);
        }
        setLoading(true);
        if(rooms.totalRooms>0){
            let newArr = rooms.roomItems;
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
        setLoading(false);
        return () => mounted = false;
    }, []);  

    async function fetchHotelRooms(searchParams){
        let searchObject = searchParams;
        if(searchObject.searchSource=='HotelBeds'){
            setAdults(searchObject.adults);
            setChild(searchObject.child);
            searchObject.hotelCode = Router.query.hotelcode;            
            const responseData = await HotelRepository.fetchHotelBedsRooms(searchObject);
            if(responseData.success){
                try{
                    localStorage.removeItem('hotel_beds_rooms'); 
                }catch(e){
        
                }
                //setRooms(responseData.data.rooms);
                if(responseData.data.rooms.length>0){
                    for(let k=0;k<responseData.data.rooms.length;k++){
                        let tmp = [];
		                tmp = responseData.data.rooms[k];
                        let existRoom = rooms.roomItems.find(
                            item => item.code === tmp.code
                        );
                        if(!existRoom){
                            dispatch(addRoomItem(tmp));
                        }
                    }
                }
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
        image = image.replace("https://photos.hotelbeds.com/giata/bigger/","https://photos.hotelbeds.com/giata/");
        let mainImage = image.replace("https://photos.hotelbeds.com/giata/","https://photos.hotelbeds.com/giata/bigger/");
        setMainImage(mainImage);
    }
    
    if(!loading){
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
                    rooms.roomItems.length>0?                
                    <div className="col-md-3">
                        <div className="hdPriceBox">
                            <h3>{rooms.roomItems[0].name}</h3>
                            <span className="hdgustDetls pb-4">{adults} x Guest | {rooms.totalRooms} x Room</span>
                            {rooms.roomItems[0].rates[0].new_sellingRate==rooms.roomItems[0].rates[0].totalNet?
                                <strong className="hdtlsPrice">{rooms.roomItems[0].rates[0].currencySign} {formatCurrency(rooms.roomItems[0].rates[0].totalNet)}</strong>    
                            :
                            <>
                                <strong className="hdoldPrice">{rooms.roomItems[0].rates[0].currencySign} {formatCurrency(rooms.roomItems[0].rates[0].new_sellingRate)}</strong>
                                <strong className="hdtlsPrice">{rooms.roomItems[0].rates[0].currencySign} {formatCurrency(rooms.roomItems[0].rates[0].totalNet)}</strong>                        
                            </>
                            }
                            <span className="hdRoomDtls">1 Room / Per Night</span>
                            {rooms.roomItems[0].rates[0].taxes!=null && rooms.roomItems[0].rates[0].taxes!=undefined && rooms.roomItems[0].rates[0].taxes!=''?
                                <span className="hdTaxFee">+ {rooms.roomItems[0].rates[0].currencySign}{formatCurrency(rooms.roomItems[0].rates[0].taxes.taxes[0].new_amount)} Taxes & fees</span>
                            :''}

                            <a href="#roomsid" className="btn hdButton mt-4">Select Room</a>
                        </div>
                    </div>
                    :''
                :''}
                {
                props.currentHotel.hotel.facilitiesOverview!=null && props.currentHotel.hotel.facilitiesOverview!=undefined && props.currentHotel.hotel.facilitiesOverview!='' && props.currentHotel.hotel.facilitiesOverview.length>0?
                <div className="col-md-3">
                    <div className="amiBox">
                        <h4>Amenities & Services</h4>
                        <ul>
                            {props.currentHotel.hotel.facilitiesOverview.map((item,i) => (
                            <li key={i}>{item}</li>
                            ))}
                        </ul>
                        <a href="#amenitiesid" className="mAmenLink">More Amenities</a>
                    </div>
                </div>
                :''}
            </div>            
        </Fragment>
    );
    }else{
        const skeletonView = generateTempArray(5).map((i) => (
            <Skeleton/>
        ));
        return (
            <Fragment>
                <div className="row hdGalleryDetls">	
                    {skeletonView}
                </div>
            </Fragment>
        );
    }
}

const mapStateToProps = (state, hotel) => {
    return {
        currentHotel: hotel,
        state: state
    }
}
export default connect(mapStateToProps)(HotelDetailImages);