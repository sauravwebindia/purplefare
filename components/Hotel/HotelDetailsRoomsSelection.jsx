import React, { useEffect, useState,Fragment } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router'; 
import { formatCurrency,generateTempArray } from '@/utilities/common-helpers';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
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
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function HotelDetailsRoomsSelection(props){
    const dispatch = useDispatch();
    const { hotelBooking, auth, rooms } = props.state;
    const Router = useRouter();
    const [hotel, setHotel] = useState(props.currentHotel.hotel);
    const [mobileRoomSelectionPopupStatus, setMobileRoomSelectionPopupStatus] = useState(false);
    const [loading,setLoading] = useState(false);
    //const [rooms,setRooms] = useState([]);
    const [adults,setAdults] = useState(0);
    const [child,setChild] = useState(0);
    const [selectRoom,setSelectRoom] = useState(null);
    const [errorBooking,setErrorBooking] = useState(false);
    const [roomDetailPopupDisplay, setRoomDetailPopupDisplay] = useState(false);
    const [roomDetailPopupCode,setRoomDetailPopupCode] = useState(null);
    const [commonPopupDisplay, setCommonPopupDisplay] = useState(false);
    const [commonPopupHeading, setCommonPopupHeading] = useState("");
    const [commonPopupText, setCommonPopupText] = useState("");
    const [proceedBookingPopupDisplay, setProceedBookingPopupDisplay] = useState(false);
    const [proceedBookingPopupHeading, setProceedBookingPopupHeading] = useState("");
    const [proceedBookingPopupText, setProceedBookingPopupText] = useState("");
    const [roomImage,setRoomImage] = useState("");
    const [roomDetailPopupHTMl,setRoomDetailPopupHTML] = useState("");
    const [errorBookingText, setErrorBookingText] = useState("");
    const [searchString,setSearchString] = useState("");
    const [saveSearchParams,setSearchParams] = useState("");
    const [userUniqueId,setUserUniqueId]  = useState("");
    useEffect(() => {  
        let mounted = true;
        if(localStorage.getItem('uuid')!=null && localStorage.getItem('uuid')!=undefined && localStorage.getItem('uuid')!=''){
            setUserUniqueId(localStorage.getItem('uuid'));
        }
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
        setSearchParams(searchParams);
        var queryString = Object.keys(searchParams).map(function(key) {
            return key + '=' + searchParams[key];
        }).join('&');
        setSearchString(queryString);
        if(props==null || props=='' || props==undefined){
            Router.push('/');
        }
        setAdults(searchParams.adults);
        setChild(searchParams.child);
        return () => mounted = false;
    }, []);  

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

    const handleRemoveRoom = (room) => {
        let existRoomIntoBooking = hotelBooking.hotelBookingRooms.find(
			item => item.id === room.id
		);        
        if(existRoomIntoBooking){
            dispatch(removeRoom(room));
        }
    }

    const handleMobileRoomSelectionPopup = () => {
        setMobileRoomSelectionPopupStatus(!mobileRoomSelectionPopupStatus);
    }

    const handleCommonPopup = (code) => {
        setCommonPopupDisplay(!commonPopupDisplay);
    }

    const handleProceedBookingPopup = () => {
        setProceedBookingPopupDisplay(!proceedBookingPopupDisplay);
    }

    const handleBookingRoom = (room,rateItem) => {
        let hotelRooms = hotel.rooms;
        let hotelCurrentRoom;
        if(hotelRooms.length>0){
            for(let p=0;p<hotelRooms.length;p++){
                if(room.code==hotelRooms[p].roomCode){
                    hotelCurrentRoom = hotelRooms[p];
                    break;
                }
            }
        }
        let listRooms = rooms.roomItems; 
        let currentRoom;  
        if(listRooms.length>0){
            for(let j=0;j<listRooms.length;j++){
                if(listRooms[j]['code']==room.code){
                    currentRoom = listRooms[j];
                    break;
                }
            }
        }
        let sameRoomCodeBookings = hotelBooking.hotelBookingRooms.filter(
			item => item.id === rateItem.rateKey
		);
        if(sameRoomCodeBookings!=undefined && sameRoomCodeBookings!='' && sameRoomCodeBookings!=null){
            let totalPax = 0;
            for(let k=0;k<sameRoomCodeBookings.length;k++){
                totalPax = totalPax + (sameRoomCodeBookings[k].quantity);
            }
            if(hotelCurrentRoom!=null && hotelCurrentRoom!=undefined && hotelCurrentRoom!=''){
                if(hotelCurrentRoom.roomCode==room.code){
                    if(totalPax>=rateItem.allotment){
                        //toast.error(`Max Pax ${hotelCurrentRoom.maxPax} is allowed for this room`);
                        setCommonPopupDisplay(true);
                        setCommonPopupHeading("Alert");
                        setCommonPopupText(`Max Allotment ${rateItem.allotment} is allowed for ${currentRoom.name} ${rateItem.boardName}`);
                        return false;
                    }
                }   
            }
        }

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
        let roomRate = {            
            'id':rateItem.rateKey,
            'quantity':1,
            'name':room.name,
            'code':room.code,
            'amount':rateItem.new_sellingRate,
            'saleAmount':rateItem.new_net,
            'taxes':taxes,
            'currency':rateItem.currencySign,
            'adults':rateItem.adults,
            'rooms':rateItem.rooms,
            'child':rateItem.children,
            'cancellation':rateItem.cancellationPolicies,
            'room':currentRoom,
            'roomType':rateItem.boardName,
        }
        let existRoomRateIntoBooking = hotelBooking.hotelBookingRooms.find(
			item => item.id === roomRate.id
		);
        
        if(!existRoomRateIntoBooking){
            dispatch(addRoom(roomRate));
        }else{
            dispatch(increaseRoomQty(roomRate));
        }
    }

    const handleForBooking = () => {
        let searchRooms = Router.query.rooms;
        let searchAdults = Router.query.adults;
        let searchChild = Router.query.child;
        let checkInDate = Router.query.checkInDate;
        let checkOutDate = Router.query.checkOutDate;
        let error = false;
        let addedAdults = hotelBooking.totalAdults;
        let addedRooms = hotelBooking.totalRooms;
        if(addedAdults>searchAdults){
            error = true;
        }
        if(hotelBooking.totalRooms>searchRooms){
            error = true;
        }
        if(hotelBooking.totalChild>searchChild){
            error = true;
        }
        let alertText = "";
        if(error){
            setErrorBooking(true);
            if(addedRooms>searchRooms){
                alertText = `You searched for ${searchRooms} Rooms with ${searchAdults} Guests but you added ${addedRooms} Rooms with ${addedAdults} Guests.`;
            }
            if(addedRooms==searchRooms && addedAdults>searchAdults){
                alertText = `Current selection doesn't accommodate ${addedAdults} Guests.`;
            }
            if(addedRooms<searchRooms || addedAdults<searchAdults){
                alertText = `You searched for ${searchRooms} Rooms with ${searchAdults} Guests but you added ${addedRooms} Rooms with ${addedAdults} Guests.`;
            }
            setErrorBookingText(alertText);
            setMobileRoomSelectionPopupStatus(true);
            setProceedBookingPopupDisplay(true);
            setProceedBookingPopupHeading("Alert");
            setProceedBookingPopupText(alertText);
            return false;
        }else{
            setErrorBooking(false);
            setErrorBookingText("");           
            saveBooking();             
        }
    }

    const handleForceProceedBooking = () => {
        saveBooking();
    }

    async function saveBooking(){
        let params = {'hotel':hotel,'uuid':userUniqueId,'searchParams':saveSearchParams,'checkInDate':Router.query.checkInDate,'checkOutDate':Router.query.checkOutDate,'hotelBooking':hotelBooking};
        const responseData = await HotelRepository.saveBooking(params);
        if(responseData.success==1){
            Router.push(`${baseStoreURL}/hotels/review?${searchString}`);
        }else{
            return false;
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
    
    const handleCloseRoomPopupDetails = () => {
        setRoomDetailPopupCode("");        
        setRoomDetailPopupDisplay(false);    
        setRoomDetailPopupHTML("");    
    }

    const handleRoomPopupDetails = (code) => {
        setRoomDetailPopupCode(code);
        setRoomDetailPopupDisplay(true);
        setRoomDetailPopupHTML(generateRoomDetailsPopup(code));
    }

    const generateRoomDetailsPopup = (code) => {
        let room;        
        let roomNewDetails = new Array();        
        let listRooms = rooms.roomItems;   
        if(listRooms.length>0){
            for(let j=0;j<listRooms.length;j++){
                if(listRooms[j]['code']==code){
                    room = listRooms[j];
                    break;
                }
            }
            if(room!=null && room!=undefined && room!=''){
                if(room.code==code){
                    roomNewDetails['overview'] = room;
                }
                let hotelRooms = hotel.rooms;
                if(hotelRooms.length>0){
                    for(let k=0;k<hotelRooms.length;k++){
                        if(code==hotelRooms[k].roomCode){
                            roomNewDetails['information'] = hotelRooms[k];
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
                        roomNewDetails['images'] = innerImages;
                        roomNewDetails['roomMainImage'] = roomMainImage[0];
                    }else{
                        roomNewDetails['images'] = null;
                        roomNewDetails['roomMainImage'] = null;
                    }
                }
                let roomBedInfo = "";
                let roomOtherInfo = "";
                
                let responsiveObject = {
                    0:{
                        items:1
                    },
                    600:{
                        items:1
                    },
                    1000:{
                        items:1
                    }
                };
                if(roomNewDetails['information']!=undefined && roomNewDetails['information']!=null && roomNewDetails['information']!=''){
                    if(roomNewDetails['information']['isParentRoom']==true){
                        roomBedInfo = (                    
                            roomNewDetails['information']['roomStays'].length>0?
                            roomNewDetails['information']['roomStays'].map((roomStays,i) => (  
                                    roomStays.roomStayFacilities!=undefined && roomStays.roomStayFacilities!=null && roomStays.roomStayFacilities!=''?
                                        roomStays.roomStayFacilities.map((item,k) => (
                                            item!=undefined?
                                            <span key={k}><img src={`${baseStoreURL}/images/details/bed.png`} alt="bed.png" /> {item['number']} {item['description']['content']}</span>
                                            :''
                                        ))
                                    :''                                               
                                ))
                            :''                      
                        );
        
                        roomOtherInfo = (      
                            roomNewDetails['information']!=undefined && roomNewDetails['information']!=null && roomNewDetails['information']!=''?
                                roomNewDetails['information']['roomFacilities']!=undefined && roomNewDetails['information']['roomFacilities']!=null && roomNewDetails['information']['roomFacilities']!='' && roomNewDetails['information']['roomFacilities'].length>0?
                                    roomNewDetails['information']['roomFacilities'].map((roomFacility,i) => (  
                                        <>
                                        {roomFacility.description.content=="Room size (sqm)"?
                                            <span><img src={`${baseStoreURL}/images/details/room-size.png`} alt="bathtab.png" /> Room size: {roomFacility.number} m²</span>
                                        :''}
                                        {roomFacility.description.content=="Bathtub"?
                                            <span><img src={`${baseStoreURL}/images/details/bathtab.png`} alt="bathtab.png" /> {roomFacility.description.content}</span>
                                        :''}
                                        {roomFacility.description.content=="Wifi" || roomFacility.description.content=="WiFi" || roomFacility.description.content=="Wi-fi" || roomFacility.description.content=="Wi-Fi"?
                                            <span><img src={`${baseStoreURL}/images/wifi.png`} alt="wifi.png" /> {roomFacility.description.content}</span>
                                        :''}
                                        {roomFacility.description.content=="TV" || roomFacility.description.content=="tv"?
                                            <span><img src={`${baseStoreURL}/images/tv.png`} alt="tv.png" /> {roomFacility.description.content}</span>
                                        :''}                                    
                                        </>                      
                                    ))
                                :''
                            :''
                        );
                    }
                }
        
                return (
                    <Fragment>
                        <h2 class="modal__title purpleColor pt-1">{room.name}</h2>
                        <div class="moreDtlsScroll">
                            <div class="moreDtlsGallery">
                                <div class="mdgallery">
                                {roomNewDetails['images']!=null?
                                    <OwlCarousel className='owl-theme' responsive={responsiveObject} slideBy={1} loop={false} lazyLoad={true} autoplay={false} dots={false} margin={10} navText={['<a href="javascript:void(0);" class="ssArrow lSlideArrow"><img src="'+baseStoreURL+'/images/home/left-slider-arrow.png" alt="left-slider-arrow.png" class="img-fluid"/></a>','<a href="javascript:void(0);" class="ssArrow rSlideArrow"><img src="'+baseStoreURL+'/images/home/right-slider-arrow.png" alt="right-slider-arrow.png" class="img-fluid" /></a>']} nav>
                                        {
                                        roomNewDetails['images']!=null?
                                            roomNewDetails['images'].map((item,i) => (
                                                <img src={`${item.image_base_url}${item.path}`} key={i} alt={`${item.roomCode}`}/>
                                            ))
                                        :''}
                                    </OwlCarousel>
                                    :
                                    <img src={`${baseStoreURL}/images/no-hotel-image.jpg`} alt="no-hotel-image.jpg"/>
                                }                            
                                </div> 
                            </div>
    
                            {roomOtherInfo!='' || roomBedInfo!=''?
                                <div class="mdRoomInfo">
                                    {roomOtherInfo}
                                    {roomBedInfo}
                                </div>                        
                            :''}
                            {
                            roomNewDetails['information']!=undefined && roomNewDetails['information']!=null && roomNewDetails['information']!=''?
                                roomNewDetails['information']['roomFacilities']!=undefined && roomNewDetails['information']['roomFacilities']!=null && roomNewDetails['information']['roomFacilities']!='' && roomNewDetails['information']['roomFacilities'].length>0?
                                <div class="mAmenitiesPopup">
                                    <h5>Room Facilities</h5>
                                    <ul>                                    
                                        {roomNewDetails['information']['roomFacilities'].map((roomFacility,i) => ( 
                                            roomFacility.description.content!="Room size (sqm)"?
                                            <li>{roomFacility.description.content}</li>
                                            :''
                                        ))}                                      
                                    </ul>
                                </div>
                                :''
                            :''
                            }
                        </div>
                    </Fragment>
                );
            }else{
                return "";
            }
        }else{
            return "";
        }
        
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

        let responsiveObject = {
            0:{
                items:1
            },
            600:{
                items:1
            },
            1000:{
                items:1
            }
        };

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
                    
                    <div className="dromHotlDesktop">
                        {roomDetails['roomMainImage']!=null?
                            <OwlCarousel className='owl-theme' responsive={responsiveObject} slideBy={1} loop={true} lazyLoad={true} autoplay={true} dots={true} margin={10} navText={['<a href="javascript:void(0);" class="ssArrow lSlideArrow"><img src="'+baseStoreURL+'/images/home/left-slider-arrow.png" alt="left-slider-arrow.png" class="img-fluid"/></a>','<a href="javascript:void(0);" class="ssArrow rSlideArrow"><img src="'+baseStoreURL+'/images/home/right-slider-arrow.png" alt="right-slider-arrow.png" class="img-fluid" /></a>']} nav>
                                <img src={`${roomDetails['roomMainImage'].image_base_url}${roomDetails['roomMainImage'].path}`} alt={`${roomDetails['roomMainImage'].roomCode}`} className="img-fluid" />
                            </OwlCarousel>
                        :
                        <img src={`${baseStoreURL}/images/no-hotel-image.jpg`} alt="no-hotel-image.jpg" className="img-fluid" />
                        }
                    </div> 
                    <ul className="dromami">
                        <HotelRoomGeneralInformation roomInfoDetails={roomDetails}/>   
                    </ul>                    
                    <a href="javascript:;" className="dtlsMore" id="mdetails-btn" onClick={(e)=> handleRoomPopupDetails(props.room.code)}>More Details</a>
                </div>
            </div>
        );
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
                                {roomFacility.description.content=="Wifi" || roomFacility.description.content=="WiFi" || roomFacility.description.content=="Wi-fi" || roomFacility.description.content=="Wi-Fi"?
                                    <li><img src={`${baseStoreURL}/images/wifi.png`} alt="wifi.png" /> <span>{roomFacility.description.content}</span> </li>
                                :''}
                                {roomFacility.description.content=="TV" || roomFacility.description.content=="tv"?
                                    <li><img src={`${baseStoreURL}/images/tv.png`} alt="tv.png" /> <span>{roomFacility.description.content}</span> </li>
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
        let k = props.k;
        let currencySign = props.currencySign;
        let rateItem = props.rateItem;
        var monthNames = ["Jan", "Feb", "March", "April", "May","June","July", "Aug", "Sep", "Oct", "Nov","Dec"];
        if(cancelItem!=null && cancelItem!=undefined && cancelItem!=''){
            if(cancelItem.from!=null && cancelItem.from!=undefined && cancelItem.from!=''){
                let cancelDateObject = new Date(cancelItem.from);
                let nextDay = new Date(cancelItem.from);
                nextDay.setDate(cancelDateObject.getDate() + 1);
                let nextDayCancellation = nextDay.toDateString(); 
                let date = new Date(cancelItem.from).toDateString();
                let checkInDateStart = new Date(Router.query.checkInDate).toDateString();
                if(rateItem!=undefined && rateItem!=null && rateItem!=''){
                    if(cancelItem.new_amount==rateItem.new_net && date==checkInDateStart){
                        return(<li key={k}><span className="redColor">Non Refundable</span></li>);
                    }else if(date<checkInDateStart){
                        return(<li key={k}><span className="redColor">Non Refundable</span></li>);
                    }else if(cancelItem.new_amount==rateItem.new_net && date!=checkInDateStart){
                        return (
                            <>
                            <li key={k}>Free Cancellation before {date}</li>
                            {cancelItem.new_amount==rateItem.new_net?
                            <li key={k}><span className="redColor">Non Refundable after {date}</span></li>
                            :
                            <li key={k}>Cancellation charge start from {nextDayCancellation} {currencySign} {formatCurrency(cancelItem.new_amount)}</li>
                            }
                            </>
                        );
                    }
                }else{
                    return (
                        <>
                        <li key={k}>Free Cancellation before {date}</li>
                        <li key={k}>Cancellation charge start from {nextDayCancellation} {currencySign} {formatCurrency(cancelItem.new_amount)}</li>
                        </>
                    );
                }
            }else{
                return "";
            }
        }else{
            return "";
        }
    }

    function HotelRoomPriceInformation(props){
        let rateItem = props.rateItem;
        let room = props.room;
        let hotelRooms = hotel.rooms;
        let hotelCurrentRoom;
        if(hotelRooms.length>0){
            for(let p=0;p<hotelRooms.length;p++){
                if(room.code==hotelRooms[p].roomCode){
                    hotelCurrentRoom = hotelRooms[p];
                    break;
                }
            }
        }
        let disableAddBtn = false;
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
        let sameRoomCodeBookings = hotelBooking.hotelBookingRooms.filter(
			item => item.id === rateItem.rateKey
		);
        if(sameRoomCodeBookings!=undefined && sameRoomCodeBookings!='' && sameRoomCodeBookings!=null){
            let totalPax = 0;
            for(let k=0;k<sameRoomCodeBookings.length;k++){
                totalPax = totalPax + (sameRoomCodeBookings[k].quantity);
            }
            if(hotelCurrentRoom!=null && hotelCurrentRoom!=undefined && hotelCurrentRoom!=''){
                if(hotelCurrentRoom.roomCode==room.code){
                    if(totalPax>=rateItem.allotment){
                        disableAddBtn = true;
                    }
                }   
            }
        }
        return (
            <div className="dtblehdLine dtbleRowLine addRoomDtlsNew">
                <div className="dtInnSpace">
                    {rateItem.children>0?
                        rateItem.adults>1?
                        <span className="detlsAdltCount">{rateItem.adults} Adults & {rateItem.children} Child</span>
                        :
                        <span className="detlsAdltCount">{rateItem.adults} Adult & {rateItem.children} Child</span>
                    :
                        rateItem.adults>1?
                        <span className="detlsAdltCount">{rateItem.adults} Adults</span>
                        :
                        <span className="detlsAdltCount">{rateItem.adults} Adult</span>
                    }
                    {rateItem.new_net==rateItem.new_sellingRate?
                        <span className="hsalePrice">{rateItem.currencySign} {formatCurrency(rateItem.new_net)}</span>
                    :
                        <>
                            <span className="holdPrice">{rateItem.currencySign} {formatCurrency(rateItem.new_sellingRate)}</span>
                            <span className="hsalePrice">{rateItem.currencySign} {formatCurrency(rateItem.new_net)}</span>
                        </>
                    }
                    {taxes>0?
                    <span className="smallTxt">+ {rateItem.currencySign} {taxes} Tax</span>
                    :
                    ""}
                    {disableAddBtn==false?
                    <a href="javascript:;" onClick={(e) => handleBookingRoom(room,rateItem)} className={`addRoomDtls`}>Add Room</a>
                    :
                    <a href="javascript:;" onClick={(e) => handleBookingRoom(room,rateItem)} className={`addRoomDtls disabled`}>Add Room</a>
                    }
                </div>
            </div>
        )
    }

    function HotelRoomFacilitiesInformation(props){
        let rateItem = props.rateItem;
        let room = props.room;
        let mealType = "";
        let cancellationPolicy = "";
        let rateComments = "";
        let promotionText = "";
        if(rateItem.rateComments!=null && rateItem.rateComments!=undefined && rateItem.rateComments!=''){
            rateComments = (
                <li>{rateItem.rateComments}</li>
            );
        }
        if(rateItem.promotions!=null && rateItem.promotions!=undefined && rateItem.promotions!=''){
            if(rateItem.promotions.name!=null && rateItem.promotions.name!=undefined && rateItem.promotions.name!=''){
                promotionText = (
                    <li>{rateItem.promotions.name}</li>
                );
            }
        }
        let boardName = rateItem.boardName;
        if(rateItem.cancellationPolicies!=undefined && rateItem.cancellationPolicies!=null && rateItem.cancellationPolicies!=''){
            if(rateItem.cancellationPolicies.length>0){
                rateItem.cancellationPolicies.map((cancelItem,k) => ( 
                    cancellationPolicy = (<PrintCancellationPolicyDate k={k} currencySign={rateItem.currencySign} cancelItem={cancelItem} rateItem={rateItem} room={room}/>)
                ))
            }
        }
        if(boardName.toLowerCase()=='room only'){
            mealType = (
                <li>No Meals</li>
            );
        }else if(boardName.toLowerCase()=='bed and breakfast'){
            mealType = (
                <li>Breakfast included</li>
            );
        }else if(boardName.toLowerCase()=='half board'){
            mealType = (
                <li>Breakfast & Lunch or Dinner any one meal included</li>
            );
        }else if(boardName.toLowerCase()=='full board'){
            mealType = (
                <li>Breakfast, Lunch and Dinner all three meals included</li>
            );
        }else if(boardName.toLowerCase()=='dinner included'){
            mealType = (
                <li>Dinner included</li>
            );
        }else if(boardName.toLowerCase()=='continental breakfast'){
            mealType = (
                <li>Continental Breakfast included</li>
            );
        }else if(boardName.toLowerCase().match(/breakfast/)){
            mealType = (
                <li>{titleCase(boardName)} included</li>
            );
        }
        return (
            <ul>   
                {cancellationPolicy}    
                {rateComments}  
                {promotionText}      
                {mealType}
            </ul>
        )
    }

    if(!loading){ 
        return (
            <Fragment>
            <div className="roomsBox" id="roomsid">                
                <div className="droomType">
                    <div className="row">                            
                        <div className="col-md-9">
                        {rooms!=null && rooms!=undefined && rooms!='' && rooms.roomItems.length>0?
                            rooms.roomItems.map((item,i) => (
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
                                                            room.adults>1?
                                                            <span className="adultChild">{room.adults*room.quantity} Adults</span>
                                                            :
                                                            <span className="adultChild">{room.adults*room.quantity} Adult</span>
                                                        }
                                                        <div className="perNgtPrice">
                                                            {room.amount==room.saleAmount?
                                                            <strong className="hsalePrice">{room.currency} {formatCurrency(room.saleAmount*room.quantity)}</strong>
                                                            :
                                                            <>
                                                            <strong className="hsalePrice">{room.currency} {formatCurrency(room.saleAmount*room.quantity)}</strong>
                                                            </>
                                                            }
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
                                                <strong className="hsalePrice">{hotelBooking.currency} {hotelBooking.saleAmount}</strong>
                                                {hotelBooking.taxes>0?
                                                <span className="dtlsString">+{hotelBooking.currency} {hotelBooking.taxes} taxes & fees</span>
                                                :''}
                                                <span className="dtlspnroom">Per night for {hotelBooking.totalRooms} Rooms</span>
                                                <Link onClick={(e) => handleForBooking()} href="javascript:;" className="btn hButton">Proceed </Link>
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
            {hotelBooking!=null && hotelBooking!=undefined && hotelBooking!=''?
                hotelBooking.hotelBookingRooms!=null && hotelBooking.hotelBookingRooms!=undefined && hotelBooking.hotelBookingRooms!='' && hotelBooking.hotelBookingRooms.length>0?
                <>               
                <div className="seltroomoverly" style={{display:mobileRoomSelectionPopupStatus?'block':'none'}} onClick={handleMobileRoomSelectionPopup}></div>
                <div className="seltroombox" style={{display:mobileRoomSelectionPopupStatus?'block':'none'}}>
                    <div className="seltroomboxxes">
                        <div className="text-left pt-4 seltroomTitle">
                            <span className="d-block titleMob-2 blackColor">Selected Rooms</span>
                            {hotelBooking.totalChild>0?
                                hotelBooking.totalAdults>1?
                                <span className="d-block greenColor mb-1">{hotelBooking.totalRooms} Rooms for {hotelBooking.totalAdults} Adults & {hotelBooking.totalChild} Children</span>
                                :
                                <span className="d-block greenColor mb-1">{hotelBooking.totalRooms} Rooms for {hotelBooking.totalAdults} Adult & {hotelBooking.totalChild} Children</span>
                                :
                                hotelBooking.totalAdults>1?
                                <span className="d-block greenColor mb-1">{hotelBooking.totalRooms} Rooms for {hotelBooking.totalAdults} Adults</span>
                                :
                                <span className="d-block greenColor mb-1">{hotelBooking.totalRooms} Rooms for {hotelBooking.totalAdults} Adult</span>
                            }
                            {errorBooking==true?
                            <span className="d-block redColor mb-3">{errorBookingText}</span>
                            :''}
                        </div>                    
                        <div className="seltroomboxInn">    
                            {hotelBooking.hotelBookingRooms.map((room,k) => (       
                                <div className="cardMobile mb-3" key={k}>
                                    <div className="cardMobContent">
                                        <div className="d-flex cardMobTitle"><span className="d-block purpleColor">{room.name} ({room.roomType})</span><span className="cardDelete" onClick={(e) => handleRemoveRoom(room)}>X</span></div>
                                        <div className="cardAdltPr pt-2">
                                            <div className="cardAdltPrLft">
                                                {room.child>0?
                                                    <span className="d-block grayColor"><strong className="blackColor">{room.quantity*room.adults} Adults & {room.quantity*room.child} Child</strong></span>
                                                :
                                                <span className="d-block grayColor"><strong className="blackColor">{room.quantity*room.adults} Adults</strong></span>
                                                }
                                                <strong className="lackColor cardBoldPrice">{hotelBooking.currency} {room.quantity*room.saleAmount}</strong>
                                                <span className="hInfo">Per night</span>                                                 
                                                {room.taxes>0?
                                                <p>
                                                <span className="d-block grayColor">+{hotelBooking.currency} {room.quantity*room.taxes} taxes & fees</span>
                                                </p>
                                                :''}                                                
                                            </div>                                    
                                        </div>
                                    </div>
                                </div> 
                            ))}           
                        </div>
                    </div>
                </div>
                </>
                :''
            :''}
            {/*------End of Mobile POPUP WITH SELECTED ROOMS----*/}
            {/* Mobile bottom buttons */}
            {hotelBooking!=null && hotelBooking!=undefined && hotelBooking!='' && hotelBooking.hotelBookingRooms!=null && hotelBooking.hotelBookingRooms!=undefined && hotelBooking.hotelBookingRooms!='' && hotelBooking.hotelBookingRooms.length>0?
                <div className="dockable">
                    <div className="dockableInn">
                        <div className="dockLeft">
                            {hotelBooking.saleAmount==hotelBooking.amount?
                            <strong className="tlsPrice">{hotelBooking.currency} {formatCurrency(hotelBooking.saleAmount)}</strong>
                            :
                            <>
                            <strong className="hdoldPrice">{hotelBooking.currency} {formatCurrency(hotelBooking.amount)}</strong>
                            <strong className="tlsPrice">{hotelBooking.currency} {formatCurrency(hotelBooking.saleAmount)}</strong>
                            </>
                            }
                            {hotelBooking.taxes!=null && hotelBooking.taxes!=undefined && hotelBooking.taxes!='' && hotelBooking.taxes>0?
                                <span className="hdTaxFee">+ {hotelBooking.currency}{formatCurrency(hotelBooking.taxes)} Taxes & fees</span>
                            :''}
                            {hotelBooking.totalChild>0?
                            <span className="textColor fontSize-12">Per Night for {hotelBooking.totalRooms} Rooms ({hotelBooking.totalAdults} Adults & {hotelBooking.totalChild} Children)</span>
                            :
                            <span className="textColor fontSize-12">Per Night for {hotelBooking.totalRooms} Rooms ({hotelBooking.totalAdults} Adults)</span>
                            }
                        </div>
                        <div className="dockRight">
                            <a href="#" className="btn bnBtn" onClick={() => handleMobileRoomSelectionPopup()}>Continue</a>
                        </div>
                    </div>
                </div>
            :       
                rooms!=null && rooms!=undefined && rooms!=''?
                    rooms.roomItems.length>0?
                        rooms.roomItems[0]!=null && rooms.roomItems[0]!=undefined && rooms.roomItems[0]!=''?
                        <div className="dockable">
                            <div className="dockableInn">
                                <div className="dockLeft">
                                    {rooms.roomItems[0].rates[0].new_sellingRate==rooms.roomItems[0].rates[0].new_net?
                                        <strong className="tlsPrice">{rooms.roomItems[0].rates[0].currencySign} {formatCurrency(rooms.roomItems[0].rates[0].new_net)}</strong>
                                        :
                                        <>
                                        <strong className="hdoldPrice">{rooms.roomItems[0].rates[0].currencySign} {formatCurrency(rooms.roomItems[0].rates[0].new_sellingRate)}</strong>
                                        <strong className="tlsPrice">{rooms.roomItems[0].rates[0].currencySign} {formatCurrency(rooms.roomItems[0].rates[0].new_net)}</strong>
                                        </>
                                    }
                                    {rooms.roomItems[0].rates[0].taxes!=null && rooms.roomItems[0].rates[0].taxes!=undefined && rooms.roomItems[0].rates[0].taxes!=''?
                                        <span className="hdTaxFee">+ {rooms.roomItems[0].rates[0].currencySign}{formatCurrency(rooms.roomItems[0].rates[0].taxes.taxes[0].new_amount)} Taxes & fees</span>
                                    :''}
                                    {Router.query.child>0?
                                    <span className="textColor fontSize-12">Per Night for {Router.query.rooms} Rooms ({Router.query.adults} Adults & {Router.query.child} Children)</span>
                                    :
                                    <span className="textColor fontSize-12">Per Night for {Router.query.rooms} Rooms ({Router.query.adults} Adults)</span>
                                    }
                                </div>
                                <div className="dockRight">
                                    <a href="#roomsid" className="btn bnBtn selt-room-btn">Select Room</a>
                                </div>
                            </div>
                        </div>
                        :''
                    :''
                :''
            }
            {/* End Mobile bottom buttons */}
            {/* COMMON POPUP FOR TEXT */}
            <div className={`modal__container ${commonPopupDisplay==true?`show-modal`:``}`} id="text-popup-popup">
                <div className="modal__content modal-sm">
                    <div className="modal__close close-modal5" title="Close" onClick={() => handleCommonPopup()}>
                        <img src={`${baseStoreURL}/images/close.png`} alt="close.png" className="modal__img"/>
                    </div>
                    <h2 className="modal__title">{commonPopupHeading}</h2>
                    <p>{commonPopupText}</p>
                </div>
            </div>
            {/* END OF COMMON POPUP FOR TEXT*/} 
            {/* PROCEED BOOKING POPUP FOR TEXT */}
            <div className={`modal__container ${proceedBookingPopupDisplay==true?`show-modal`:``}`} id="text-popup-popup">
                <div className="modal__content modal-sm">
                    <div className="modal__close close-modal5" title="Close" onClick={() => handleProceedBookingPopup()}>
                        <img src={`${baseStoreURL}/images/close.png`} alt="close.png" className="modal__img"/>
                    </div>
                    <h2 className="modal__title">{proceedBookingPopupHeading}</h2>
                    <p>{proceedBookingPopupText}</p>
                    <button onClick={() => handleForceProceedBooking()} className="btn hButton">Proceed</button>
                </div>
            </div>
            {/* END OF PROCEED BOOKING POPUP FOR TEXT*/} 
            <div className={`modal__container ${roomDetailPopupDisplay==true?`show-modal`:``}`} id="more-details-popup">
                <div className="modal__content modal-xl">
                    <div className="modal__close close-modal7" title="Close" onClick={() => handleCloseRoomPopupDetails()}>
                    <img src={`${baseStoreURL}/images/close.png`} alt="close.png" className="modal__img"/>
                    </div>   
                    {roomDetailPopupHTMl}   
                </div>
            </div>   
            <ToastContainer autoClose={2000} closeOnClick draggable theme="light"/>
            </Fragment>
        );
    }else{
        const skeletonView = generateTempArray(5).map((i) => (
            <Skeleton/>
        ));
        return (
            <div className="roomsBox" id="roomsid">                
                <div className="droomType">
                    <div className="row">                            
                        <div className="col-md-9">
                        {skeletonView}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


const mapStateToProps = (state, hotel) => {
    return {
        currentHotel: hotel,
        state: state
    }
}
export default connect(mapStateToProps)(HotelDetailsRoomsSelection);