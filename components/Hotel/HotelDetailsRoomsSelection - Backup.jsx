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
import { cancel } from 'redux-saga/effects';

export default function HotelDetailImages(props){
    const Router = useRouter();
    const [hotel, setHotel] = useState(props.hotel);
    const [loading,setLoading] = useState(true);
    const [rooms,setRooms] = useState([]);
    const [adults,setAdults] = useState(0);
    const [child,setChild] = useState(0);
    const [totalRooms,setTotalRooms] = useState(0);
    const [selectRoom,setSelectRoom] = useState(null);
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
                setRooms(responseData.data.rooms);
                setLoading(false);
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

    function sort(a, by) {
        return a.map(function (el, i) {
            return {
                index: i,
                value: by.reduce(function (obj, property) { return obj[property]; }, el)
            };
        }).sort(function (a, b) {
            return a.value - b.value;
        }).map(function (el) {
            return a[el.index];
        });
    }

    function HotelRoomGeneralInformation(props){
        let roomDetails = props.roomInfoDetails;
        if(roomDetails['information']!=undefined && roomDetails['information']!=null && roomDetails['information']!=''){
            if(roomDetails['information']['isParentRoom']==true){           
                return (
                    <>
                    {roomDetails['information']['roomStays'].length>0?
                        roomDetails['information']['roomStays'].map((roomStays,i) => (  
                            roomStays.roomStayFacilities!=undefined && roomStays.roomStayFacilities!=null && roomStays.roomStayFacilities!=''?
                                roomStays.roomStayFacilities.map((item,k) => (
                                    item!=undefined?
                                    <li key={k}><img src={`${baseStoreURL}/images/details/bed.png`} alt="bed.png" /> <span>{item['number']} {item['description']['content']}</span></li>
                                    :''
                                ))
                            :''                                               
                        ))
                    :''}
                    {roomDetails['information']!=undefined && roomDetails['information']!=null && roomDetails['information']!=''?
                        roomDetails['information']['roomFacilities']!=undefined && roomDetails['information']['roomFacilities']!=null && roomDetails['information']['roomFacilities']!='' && roomDetails['information']['roomFacilities'].length>0?
                            roomDetails['information']['roomFacilities'].map((roomFacility,i) => (  
                                <>
                                {roomFacility.description.content=="Room size (sqm)"?
                                    <li><img src={`${baseStoreURL}/images/details/room-size.png`} alt="bathtab.png" /> <span>Room size: {roomFacility.number} m²</span> </li>
                                :''}
                                {roomFacility.description.content=="Bathtub"?
                                    <li><img src={`${baseStoreURL}/images/details/bathtab.png`} alt="bathtab.png" /> <span>{roomFacility.description.content}</span> </li>
                                :''}  
                                </>                      
                            ))
                        :''
                    :''}
                    </>
                );
            }else{
                return "";
            }
        }else{
            return "";
        }
    }

    function PrintCancellationPolicyDate(props){
        let cancelItem = props.cancelItem;
        let currencySign = props.currencySign;
        if(cancelItem.from!=null && cancelItem.from!=undefined && cancelItem.from!=''){
            let date = new Date(cancelItem.from);
            if(currencySign=='USD'){
                return (
                    <span className="hfromDate"><strong>From: </strong>{(date.getMonth()+1)+"/"+date.getDate()+"/"+date.getFullYear()}</span>
                );
            }else{
                return (
                    <span className="hfromDate"><strong>From: </strong>{date.getDate()+"-"+(date.getMonth()+1)+"-"+date.getFullYear()}</span>
                );
            }
        }else{
            return "";
        }
    }

    function HotelRoomPriceInformation(props){
        let rateItem = props.rateItem;
        let date;
        return (
            <div className="dtblehdLine dtbleRowLine">
                <div className="dtblehdLine dtblehd">Price per night</div>
                <div className="dtInnSpace">
                    <span className="dtCheapPrice desktopOnly">Cheapest Price You&apos;ve Seen!</span>
                    <div className="dbkDetails">
                        <span className="dmAdult"><img src={`${baseStoreURL}/images/user.png`} alt="user.png" /> {rateItem.adults}</span>
                        <span className="dmAdult"><img src={`${baseStoreURL}/images/child.png`} alt="child.png" /> {rateItem.children}</span>
                    </div>
                    <span className="holdPrice">{rateItem.currencySign} {formatCurrency(rateItem.new_sellingRate)}</span>
                    <span className="hsalePrice">{rateItem.currencySign} {formatCurrency(rateItem.totalNet)}</span>
                    <span className="hInfo">Per night before taxes and fees</span>
                    {rateItem.cancellationPolicies!=undefined && rateItem.cancellationPolicies!=null && rateItem.cancellationPolicies!=''?
                        rateItem.cancellationPolicies.length>0?
                            rateItem.cancellationPolicies.map((cancelItem,k) => (
                                <span className="hcancelPolicy" key={k}>
                                    <strong>Cancellation Policy</strong>
                                    <PrintCancellationPolicyDate currencySign={rateItem.currency} cancelItem={cancelItem}/><br/>
                                    <span className="hfromDateAmount">{rateItem.currencySign} {formatCurrency(cancelItem.new_amount)}</span>
                                </span>
                            ))
                        :''
                    :''}
                </div>
            </div>
        )
    }

    function HotelRoomFacilitiesInformation(props){
        let roomDetails = new Array();
        roomDetails['overview'] = props.room;
        let code = props.room.code;
        let hotelRooms = hotel.rooms;
        if(hotelRooms.length>0){
            for(let k=0;k<hotelRooms.length;k++){
                if(code==hotelRooms[k].roomCode){
                    roomDetails['information'] = hotelRooms[k];
                    break;
                }
            }
        }
        return (
            roomDetails['information']!=undefined && roomDetails['information']!=null && roomDetails['information']!=''? 
                roomDetails['information']['isParentRoom']==true? 
                    roomDetails['information']['roomFacilities']!=undefined?
                    <>
                        <span className="smallTxt">Your price includes:</span>      
                        <ul>
                            <li>Extra low price! (non-refundable)</li>
                            {roomDetails['information']['roomFacilities'].map((facility,k) => (
                                facility.description.content!='Room size (sqm)'?
                                <li key={k}>{facility.description.content}</li>
                                :''
                            ))}
                        </ul>
                    </>
                    :''
                :''
            :''
        )
    }

    function HotelRoomImagesWithDetails(props){
        let roomDetails = new Array();
        roomDetails['overview'] = props.room;
        let code = props.room.code;
        let hotelRooms = hotel.rooms;
        if(hotelRooms.length>0){
            for(let k=0;k<hotelRooms.length;k++){
                if(code==hotelRooms[k].roomCode){
                    roomDetails['information'] = hotelRooms[k];
                    break;
                }
            }
        }
        let hotelRoomsImages = hotel.images.room;
        let roomMainImage = new Array();
        if(hotelRoomsImages.length>0){
            let innerImages = new Array();
            for(let k=0;k<hotelRoomsImages.length;k++){
                if(code==hotelRoomsImages[k].roomCode){
                    if(innerImages.length==0){
                        roomMainImage.push(hotelRoomsImages[k]);
                    }
                    innerImages.push(hotelRoomsImages[k]);
                }
            }
            if(innerImages.length>0){
                roomDetails['images'] = innerImages;
                roomDetails['roomMainImage'] = roomMainImage[0];
            }else{
                roomDetails['images'] = null;
                roomDetails['roomMainImage'] = null;
            }
        }
        let responsiveObject = {
            0:{
                items:3
            },
            600:{
                items:3
            },
            1000:{
                items:3
            }
        };

        return (
            <div className="col-md-3">
                <div className="dromtypeLeft">
                    {roomDetails['images']!=null?
                    <div className="hdgalleryRoomMobile">
                        <div className="hdgmroomInn">
                            {roomDetails['images'].map((item,i) => (
                                <div className="hdgroomSlide" key={i}>
                                    <img src={`${item.image_base_url}${item.path}`} alt={`${item.roomCode}`}/>
                                </div>
                            ))}
                        </div>
                    </div>
                    :''}
                    <div className="dromHotlImgs">
                        {roomDetails['images']!=null?
                        <div className="dromHotlDesktop">
                            {roomDetails['roomMainImage']!=null?
                                <img src={`${roomDetails['roomMainImage'].image_base_url}${roomDetails['roomMainImage'].path}`} alt={`${roomDetails['roomMainImage'].roomCode}`} className="img-fluid" />
                            :''}
                            <OwlCarousel className='owl-theme' responsive={responsiveObject} slideBy={1} loop={false} lazyLoad={true} autoplay={false} dots={false} margin={10} navText={['<a href="javascript:void(0);" class="ssArrow lSlideArrow"><img src="'+baseStoreURL+'/images/home/left-slider-arrow.png" alt="left-slider-arrow.png" class="img-fluid"/></a>','<a href="javascript:void(0);" class="ssArrow rSlideArrow"><img src="'+baseStoreURL+'/images/home/right-slider-arrow.png" alt="right-slider-arrow.png" class="img-fluid" /></a>']} nav>
                                <div className="dromhtThumb">
                                    {roomDetails['images'].map((item,i) => (
                                        <img key={i} src={`${item.image_base_url}${item.path}`} alt={`${item.roomCode}`}/>
                                    ))}
                                </div>
                            </OwlCarousel>
                            <a href="javascript:;" className="arMorPhoto" style={{display:"none"}}>More Room Photos</a>
                            </div>
                        :''}        
                        {roomDetails['information']!=undefined && roomDetails['information']!=null && roomDetails['information']!=''?               
                        <h4 className="mt-2 mb-0">{roomDetails['information']['description']}</h4>
                        :''}
                        <span className="dlastBok" style={{display:"none"}}>Last booked 2 hours ago</span>
                        <ul className="dromami">
                            <HotelRoomGeneralInformation roomInfoDetails={roomDetails}/>                       
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
    if(!loading){    
        return (
            <div className="roomsBox" id="roomsid">
                {rooms!=null && rooms!=undefined && rooms!='' && rooms.length>0?
                    rooms.map((item,i) => (
                    <div className="droomType" key={i}>
                        <div className="row">
                            <div className="col-md-12">
                                <div className="dromTypeHd desktopOnly">
                                    <h4>{item.name}</h4>
                                    <span className="dlastBok" style={{display:"none"}}>Last booked 2 hours ago</span>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <HotelRoomImagesWithDetails room={item}/>
                            <div className="col-md-9">
                                {item.rates!=null && item.rates!=undefined && item.rates!=''?
                                    item.rates.map((rateItem,k) => (
                                    <div className="dtbleCover" key={k}>
                                        
                                        <div className="dtbleRow">
                                            <div className="dtblehdLine dtbleRowLine">
                                                <div className="dtblehdLine dtblehd">Benefits</div>
                                                <div className="dtInnSpace">
                                                    <h4>{rateItem.boardName}</h4>
                                                    <span className="dtCheapPrice mobileOnly">
                                                        <span>Cheapest Price You&apos;ve Seen!</span>
                                                    </span>                                                                                                       
                                                    <HotelRoomFacilitiesInformation room={item}/>
                                                </div>
                                            </div>
                                            <div className="dtblehdLine dtbleRowLine">
                                                <div className="dtblehdLine dtblehd">Sleeps</div>
                                                <div className="dtInnSpace">
                                                    <div className="dtImg"><img src={`${baseStoreURL}/images/details/user.png`} alt="user.png" /><img src={`${baseStoreURL}/images/details/user.png`} alt="child.png" /></div>
                                                </div>
                                            </div>
                                            <HotelRoomPriceInformation rateItem={rateItem}/>
                                            <div className="dtblehdLine dtbleRowLine">
                                                <div className="dtblehdLine dtblehd">Room</div>
                                            
                                                <input type="text" value="2" disabled /></div>
                                                <div className="dtblehdLine dtbleRowLine">
                                                    <div className="dtblehdLine dtblehd">Most booked</div>
                                                    <a href="javascript:;" className="btn hButton">Book Now </a>
                                                    <span className="droomLeft">Our last 2 rooms!</span>
                                                </div>
                                        </div>
                                    </div>
                                    ))
                                :''}                          
                            </div>
                        </div>
                    </div>
                    ))
                :''}            
            </div>
        );
    }else{
        return "";
    }
}