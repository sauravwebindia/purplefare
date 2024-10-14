import React, { useEffect, useState,Fragment } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router'; 
import { formatCurrency,generateTempArray } from '@/utilities/common-helpers';
import { connect,useDispatch } from 'react-redux';
import { baseStoreURL } from '@/repositories/Repository';
import HotelRepository from '@/repositories/HotelRepository';
import dynamic from "next/dynamic";
const OwlCarousel = dynamic(() => import("react-owl-carousel"), {
	ssr: false,
  });
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import { addRoom,increaseRoomQty,getHotelBooking, removeRoom, clearHotelBooking } from '@/store/booking/action';

function HotelDetailImages(props){
    const dispatch = useDispatch();
    const { hotelBooking, auth } = props.state;
    const Router = useRouter();
    const [hotel, setHotel] = useState(props.currentHotel.hotel);
    const [mobileRoomSelectionPopupStatus, setMobileRoomSelectionPopupStatus] = useState(false);
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
    }, [props]);  

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

    const handleRemoveRoom = (room) => {
        let existRoomIntoBooking = hotelBooking.hotelBookingRooms.find(
			item => item.id === room.id
		);
        //console.log(existRoomIntoBooking);
        if(existRoomIntoBooking){
            dispatch(removeRoom(room));
        }
    }

    const handleMobileRoomSelectionPopup = () => {
        setMobileRoomSelectionPopupStatus(!mobileRoomSelectionPopupStatus);
    }

    const handleBookingRoom = (name,rateItem) => {
        let taxes = 0;
        if(rateItem.taxes!=undefined && rateItem.taxes!=null && rateItem.taxes!=''){
            if(rateItem.taxes.taxes!=undefined && rateItem.taxes.taxes!=null && rateItem.taxes.taxes!=''){
                let rateItemTaxes = rateItem.taxes.taxes;
                if(rateItemTaxes.length>0){
                    if(rateItemTaxes[0].new_amount!=null && rateItemTaxes[0].new_amount!=undefined && rateItemTaxes[0].new_amount!=''){
                        taxes = rateItemTaxes[0].new_amount;
                    }
                }
            }
        }
        let room = {
            'id':rateItem.rateKey,
            'quantity':1,
            'name':name,
            'price':rateItem.new_sellingRate,
            'taxes':taxes,
            'currency':rateItem.currencySign,
            'adults':rateItem.adults,
            'rooms':rateItem.rooms,
            'child':rateItem.children,
            'cancellation':rateItem.cancellationPolicies,
            'roomType':rateItem.boardName,
        }
        let existRoomIntoBooking = hotelBooking.hotelBookingRooms.find(
			item => item.id === room.id
		);
        setMobileRoomSelectionPopupStatus(!mobileRoomSelectionPopupStatus);
        if(!existRoomIntoBooking){
            dispatch(addRoom(room));
        }else{
            dispatch(increaseRoomQty(room));
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
                                    <li>{roomFacility.description.content}</li>  
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
        var monthNames = ["Jan", "Feb", "March", "April", "May","June","July", "Aug", "Sep", "Oct", "Nov","Dec"];
        if(cancelItem.from!=null && cancelItem.from!=undefined && cancelItem.from!=''){
            let date = new Date(cancelItem.from);
            if(currencySign=='$'){
                return (
                    <>
                    <strong>Cancellation Policy</strong>
                    <ul>
                        <li><span className="hfromDate"><strong>Free Cancellation Before: </strong> {(date.getMonth()+1)+"/"+(date.getDate()-1)+"/"+date.getFullYear()}</span></li>
                        <li><span className="hfromDate"><strong>From </strong> {(date.getMonth()+1)+"/"+date.getDate()+"/"+date.getFullYear()}</span>
                        <span className="hfromDateAmount"> deduct {currencySign}{formatCurrency(cancelItem.new_amount)}</span></li>
                    </ul>
                    </>
                );
            }else{
                return (
                    <>
                    <strong>Cancellation Policy</strong>
                    <span className="hfromDate"><strong>Free Cancellation Before: </strong> {(date.getMonth()+1)+"/"+date.getDate()-1+"/"+date.getFullYear()}</span><br/>
                    <span className="hfromDate"><strong>From: </strong> {date.getDate()+"-"+(date.getMonth()+1)+"-"+date.getFullYear()}</span><br/>
                    <span className="hfromDateAmount">{currencySign} {formatCurrency(cancelItem.new_amount)}</span>
                    </>
                );
            }
        }else{
            return "";
        }
    }

    function HotelRoomPriceInformation(props){
        let rateItem = props.rateItem;
        let room = props.room;
        let date;
        return (
            <div className="dtblehdLine dtbleRowLine addRoomDtlsNew">
                <div className="dtInnSpace">
                    {rateItem.children>0?
                        <span className="detlsAdltCount">{rateItem.adults} Adults & {rateItem.children} Child</span>
                    :
                        <span className="detlsAdltCount">{rateItem.adults} Adults</span>
                    }
                    {rateItem.new_net==rateItem.new_sellingRate?
                        <span className="hsalePrice">{rateItem.currencySign} {formatCurrency(rateItem.new_net)}</span>
                    :
                        <>
                            <span className="holdPrice">{rateItem.currencySign} {formatCurrency(rateItem.new_sellingRate)}</span>
                            <span className="hsalePrice">{rateItem.currencySign} {formatCurrency(rateItem.new_net)}</span>
                        </>
                    }
                    {rateItem.cancellationPolicies!=undefined && rateItem.cancellationPolicies!=null && rateItem.cancellationPolicies!=''?
                        rateItem.cancellationPolicies.length>0?
                            rateItem.cancellationPolicies.map((cancelItem,k) => (
                                <span className="hcancelPolicy" key={k}>
                                    <PrintCancellationPolicyDate currencySign={rateItem.currencySign} cancelItem={cancelItem}/><br/>                                    
                                </span>
                            ))
                        :''
                    :''}
                    <a href="javascript:;" onClick={(e) => handleBookingRoom(room.name,rateItem)} className="addRoomDtls">Add Room</a>
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
                if(hotelRooms[k]!=null && hotelRooms[k]!=undefined && hotelRooms[k]!=''){
                    if(code==hotelRooms[k].roomCode){
                        roomDetails['information'] = hotelRooms[k];
                        break;
                    }
                }                
            } 
        }
        return (
            roomDetails['information']!=undefined && roomDetails['information']!=null && roomDetails['information']!=''? 
                roomDetails['information']['isParentRoom']==true? 
                    roomDetails['information']['roomFacilities']!=undefined?
                    <>
                        <span className="smallTxt">Room Amenities:</span>      
                        <ul>
                            {roomDetails['information']['roomFacilities'].slice(0, 5).map((facility,k) => (
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
                        <OwlCarousel className='owl-theme' responsive={responsiveObject} slideBy={1} loop={false} lazyLoad={true} autoplay={false} dots={false} margin={10} navText={['<a href="javascript:void(0);" className="ssArrow lSlideArrow"><img src="'+baseStoreURL+'/images/home/left-slider-arrow.png" alt="left-slider-arrow.png" className="img-fluid"/></a>','<a href="javascript:void(0);" className="ssArrow rSlideArrow"><img src="'+baseStoreURL+'/images/home/right-slider-arrow.png" alt="right-slider-arrow.png" className="img-fluid" /></a>']} nav>
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
        );
    }
    if(!loading){    
        return (
            <Fragment>
            <div className="roomsBox" id="roomsid">                
                <div className="droomType">
                    <div className="row">                            
                        <div className="col-md-9">
                        {rooms!=null && rooms!=undefined && rooms!='' && rooms.length>0?
                            rooms.map((item,i) => (
                            <Fragment key={i}>
                                <div className="dromTypeHd desktopOnly">
                                    <h4>{item.name}</h4>
                                    <span className="dlastBok" style={{display:"none"}}>Last booked 2 hours ago</span>
                                </div>                               
                                <div className="dtbleCover dtbleCoverNew">                                                                 
                                    <div className="dtbleRow">
                                        <HotelRoomImagesWithDetails room={item}/>
                                        <div className="dtlsFirstCol">
                                        {item.rates!=null && item.rates!=undefined && item.rates!=''?         
                                            item.rates.map((rateItem,k) => (   
                                            <div className="dtbleRowInsitwo" key={k}>
                                                <div className="dtblehdLine dtbleRowLine">
                                                    <div className="dtInnSpace">
                                                        <h4>{rateItem.boardName}</h4>
                                                        <span className="dtCheapPrice mobileOnly">
                                                            <span>Cheapest Price You&apos;ve Seen!</span>
                                                        </span>                                                                                                       
                                                        <HotelRoomFacilitiesInformation room={item} rateItem={rateItem}/>
                                                    </div>
                                                </div>
                                                <HotelRoomPriceInformation room={item} rateItem={rateItem}/>                                                    
                                            </div>
                                            )) 
                                        :''}  
                                        </div>
                                    </div>                                        
                                </div> 
                            </Fragment>     
                            )):''}                                                                                   
                        </div>
                        {/******* Side ******/}
                        {hotelBooking!=null && hotelBooking!=undefined && hotelBooking!=''?
                            hotelBooking.hotelBookingRooms!=null && hotelBooking.hotelBookingRooms!=undefined && hotelBooking.hotelBookingRooms!='' && hotelBooking.hotelBookingRooms.length>0?
                                <div className="col-md-3">
                                    <div className="dtblehdLine dtbleRowLine dtlsLastFexed">
                                        <div className="dtlsLastFexedInn">                                            
                                            <div className="dtlsBoxsScroll">
                                                {hotelBooking.hotelBookingRooms.map((room,k) => 
                                                    <div className="addhtls" key={k}>
                                                        <a href="javascript:;" className="closeAddhtls" onClick={(e) => handleRemoveRoom(room)} ><img src={`${baseStoreURL}/images/close.png`} alt="close.png" /></a>
                                                        <h4>{room.name} ({room.roomType})</h4>
                                                        {room.child>0?
                                                            <span className="adultChild">{room.adults*room.quantity} Adults & {room.child*room.quantity} child</span>
                                                        :
                                                        <span className="adultChild">{room.adults*room.quantity} Adults</span>
                                                        }
                                                        <div className="perNgtPrice">
                                                            <strong className="hsalePrice">{room.currency} {formatCurrency(room.price*room.quantity)}</strong>
                                                            <span className="hInfo">Per night</span>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                            <div className="dtblehdLine dtbleRowLine dtlsfpri">
                                                {hotelBooking.totalChild>0?
                                                    <div className="dtblehdLine dtblehd">{hotelBooking.totalAdults} Adults & {hotelBooking.totalChild} Children</div>
                                                :
                                                    <div className="dtblehdLine dtblehd">{hotelBooking.totalAdults} Adults</div>
                                                }
                                                <strong className="hsalePrice">{hotelBooking.currency} {hotelBooking.amount}</strong>
                                                <span className="dtlsString">+{hotelBooking.currency} {hotelBooking.taxes} taxes & fees</span>
                                                <span className="dtlspnroom">Per night for {hotelBooking.totalRooms} Rooms</span>
                                                <a href="cart.html" className="btn hButton">Proceed </a>
                                                <span className="droomLeft">Our last 2 rooms!</span>
                                            </div>
                                        </div>                                
                                    </div>
                                </div>
                            :''
                        :''}
                    </div>
                </div>           
            </div>
            {/*------Mobile POPUP WITH SELECTED ROOMS----*/}
            <div className="seltroomoverly" style={{display:mobileRoomSelectionPopupStatus?'block':'none'}} onClick={handleMobileRoomSelectionPopup}></div>
            <div className="seltroombox" style={{display:mobileRoomSelectionPopupStatus?'block':'none'}}>
                <div className="seltroomboxxes">
                    <div className="text-left pt-4 seltroomTitle">
                        <span className="d-block titleMob-2 blackColor">Selected Rooms</span>
                        <span className="d-block greenColor mb-1">2 Rooms for 5 Adults & 2 Children</span>
                        <span className="d-block redColor mb-3">Current selection doesn't accommodate 8 Guests.</span>
                    </div>                    
                    <div className="seltroomboxInn">            
                        <div className="cardMobile mb-3">
                            <div className="cardMobContent">
                                <div className="d-flex cardMobTitle"><span className="d-block purpleColor">Deluxe Room</span><span className="cardDelete">X</span></div>
                                <div className="cardAdltPr pt-2">
                                    <div className="cardAdltPrLft">
                                        <span className="d-block grayColor"><strong className="blackColor">2Adults & 1 child</strong></span>
                                        <span className="cardPriceStrick grayColor">₹ 20000</span>
                                        <strong className="lackColor cardBoldPrice">₹ 15000</strong>
                                        <span className="hInfo">Per night</span>
                                        <p> 
                                            <span className="d-block grayColor">taxes & fees</span>
                                        </p>
                                    </div>                                    
                                </div>
                            </div>
                        </div>            
                    </div>
                </div>
            </div>
            {/*------End of Mobile POPUP WITH SELECTED ROOMS----*/}
            </Fragment>
        );
    }else{
        return "";
    }
}


const mapStateToProps = (state, hotel) => {
    return {
        currentHotel: hotel,
        state: state
    }
}
export default connect(mapStateToProps)(HotelDetailImages);