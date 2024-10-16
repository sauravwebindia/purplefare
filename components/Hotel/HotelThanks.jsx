import React, { useEffect, useState, Fragment } from 'react';
import { useRouter } from 'next/router';
import { connect,useDispatch } from 'react-redux';
import { formatCurrency,generateTempArray } from '@/utilities/common-helpers';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import HotelRepository from '@/repositories/HotelRepository';
import AuthRepository from '@/repositories/AuthRepository';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Link from 'next/link';
import {baseStoreURL} from '@/repositories/Repository';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false;
import { faCheck, faCloudDownloadAlt, faHamburger, faPhone, faTicketAlt, faUserPlus } from '@fortawesome/free-solid-svg-icons'

function HotelThanks(props){
    const router = useRouter();
	const { auth,hotelBooking } = props;
    const [booking,setBooking] = useState(null);
    const [loading,setLoading] = useState(false);
    const [inclusionPopupDisplay, setInclusionPopupDisplay] = useState(false);
    const [inclusionPopupText, setInclusionPopupText] = useState("");
    const [roomDetailPopupCode,setRoomDetailPopupCode] = useState(null);
    const [profile,setProfile] = useState(null);
    const [checkInAge,setCheckInAge] = useState("");
    const [holderName, setHolderName] = useState("");
    const [holderSurName,setHolderSurName] = useState("");
    const [holderEmail, setHolderEmail] = useState("");
    const [holderPhone, setHolderPhone] = useState("");
    const [rateComments, setRateComment] = useState("");
    const [actionLoader, setActionLoader] = useState(false);
	const dispatch = useDispatch();
    useEffect(() => {  
        let mounted = true;
        setLoading(true);
        if(auth.isLoggedIn){
            fetchMyProfile(auth.user.access_token);
        }
        fetchSuccessHotelBooking(router.query.referenceNo);
        return () => mounted = false;
    }, []); 


    async function fetchMyProfile(token){
        let params = {'token':token};
        const responseData = await AuthRepository.MyProfile(params);
        if(responseData.success==1){
            setProfile(responseData.data.user);
            let user = responseData.data.user;
            if(user.email!=''){
                setHolderEmail(user.email);
                let name = user.name.split(" ");
                console.log(user.name);
                if(name.length>0){
                    if(name[0]!=null && name[0]!=undefined && name[0]!=''){
                        setHolderName(name[0]);
                    }
                    if(name[1]!=null && name[1]!=undefined && name[1]!=''){
                        setHolderSurName(name[1]);
                    }
                }
                setHolderPhone(user.phone);
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

    const handleInclusionPopup = () => {
        setInclusionPopupText("");
        setInclusionPopupDisplay(!inclusionPopupDisplay);
    }

    async function fetchSuccessHotelBooking(referenceNo){
        let params = {'referenceNo':referenceNo};
        const responseData = await HotelRepository.fetchBooking(params);
        if(responseData.success==1){
            setBooking(responseData.data.booking);
            setLoading(false);
        }else{
            router.back() ?? router.push('/');
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
                let checkInDateStart = new Date(booking.checkInDate).toDateString();
                let checkInDateObject = new Date(booking.checkInDate);
                if(rateItem!=undefined && rateItem!=null && rateItem!=''){
                    if(cancelDateObject>new Date() && cancelDateObject<checkInDateObject){
                        if(cancelItem.new_amount==rateItem.new_net && date!=checkInDateStart){
                            return (
                                <>
                                <span className="smallTxt piInclude" key={k}>Free Cancellation before {date}</span>
                                {cancelItem.new_amount==rateItem.new_net?
                                <span className="smallTxt piInclude" key={k}><span className="text-red">Non Refundable after {date}</span></span>
                                :
                                <span className="smallTxt piInclude" key={k}>Cancellation charge start from {nextDayCancellation} {currencySign} {formatCurrency(cancelItem.new_amount)}</span>
                                }
                                </>
                            );
                        }else if(cancelItem.new_amount==rateItem.new_net && date==checkInDateStart){
                            return(<span className="smallTxt piInclude" key={k}><span className="text-red">Non Refundable</span></span>);
                        }else if(date<checkInDateStart){
                            return(<span className="smallTxt piInclude" key={k}><span className="text-red">Non Refundable</span></span>);
                        }else if(cancelItem.new_amount==rateItem.new_net && date!=checkInDateStart){
                            return (
                                <>
                                <span className="smallTxt piInclude" key={k}>Free Cancellation before {date}</span>
                                {cancelItem.new_amount==rateItem.new_net?
                                <span className="smallTxt piInclude" key={k}><span className="text-red">Non Refundable after {date}</span></span>
                                :
                                <span className="smallTxt piInclude" key={k}>Cancellation charge start from {nextDayCancellation} {currencySign} {formatCurrency(cancelItem.new_amount)}</span>
                                }
                                </>
                            );
                        }
                    }else{
                        return(<span className="smallTxt piInclude" key={k}><span className="text-red">Non Refundable</span></span>);
                    }
                }else{
                    return (
                        <>
                        <span className="smallTxt piInclude" key={k}>Free Cancellation before {date}</span>
                        <span className="smallTxt piInclude" key={k}>Cancellation charge start from {nextDayCancellation} {currencySign} {formatCurrency(cancelItem.new_amount)}</span>
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

    function HotelRoomFacilitiesInformation(props){
        let room = props.room;
        let roomInclusions = JSON.parse(room.roomInclusions);
        let rates = roomInclusions.rates;
        let rateItem;
        if(rates.length>0){
            for(let k=0;k<rates.length;k++){
                if(rates[k].rateKey==room.rateKey){
                    rateItem = rates[k];
                    break;
                }
            }
        }
        let mealType = "";
        let cancellationPolicy = "";
        let rateComments = "";
        let promotionText = "";
        let refundableText = "";
        if(rateItem.rateComments!=null && rateItem.rateComments!=undefined && rateItem.rateComments!=''){
            rateComments = (
                <span className="smallTxt piInclude">{rateItem.rateComments}</span>
            );
        }
        if(rateItem.promotions!=null && rateItem.promotions!=undefined && rateItem.promotions!=''){
            if(rateItem.promotions.name!=null && rateItem.promotions.name!=undefined && rateItem.promotions.name!=''){
                promotionText = (
                    <span className="smallTxt piInclude">{rateItem.promotions.name}</span>
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
                <span className="smallTxt piInclude">No Meals</span>
            );
        }else if(boardName.toLowerCase()=='bed and breakfast'){
            mealType = (
                <span className="smallTxt piInclude">Breakfast included</span>
            );
        }else if(boardName.toLowerCase()=='half board'){
            mealType = (
                <span className="smallTxt piInclude">Breakfast & Lunch or Dinner any one meal included</span>
            );
        }else if(boardName.toLowerCase()=='full board'){
            mealType = (
                <span className="smallTxt piInclude">Breakfast, Lunch and Dinner all three meals included</span>
            );
        }else if(boardName.toLowerCase()=='dinner included'){
            mealType = (
                <span className="smallTxt piInclude">Dinner included</span>
            );
        }else if(boardName.toLowerCase()=='continental breakfast'){
            mealType = (
                <span className="smallTxt piInclude">Continental Breakfast included</span>
            );
        }else if(boardName.toLowerCase().match(/breakfast/)){
            mealType = (
                <span className="smallTxt piInclude">{titleCase(boardName)} included</span>
            );
        }
        return (
            <ul className="ps-3">   
                {cancellationPolicy}    
                {rateComments}  
                {promotionText}      
                {mealType}
            </ul>
        )
    }

    const handleRoomPopupDetail = (code) => {
        setRoomDetailPopupCode(code);        
        let roomInclusionText = "";
        roomInclusionText = generateRoomInclusionDetailsPopup(code);
        if(roomInclusionText!=null && roomInclusionText!='' && roomInclusionText!=undefined){
            setInclusionPopupText(roomInclusionText);
            setInclusionPopupDisplay(true);
        }
    }

    const generateRoomInclusionDetailsPopup = (code) => {
        let room;        
        let roomNewDetails = new Array();        
        let hotel = JSON.parse(booking.hotelDetail);
        let listRooms = booking.rooms;   
        if(listRooms.length>0){
            for(let j=0;j<listRooms.length;j++){
                if(listRooms[j]['roomCode']==code){
                    room = listRooms[j];
                    break;
                }
            }
            if(room!=null && room!=undefined && room!=''){
                if(room.roomCode==code){
                    roomNewDetails['overview'] = room;
                }
                let hotelDetails = JSON.parse(booking.hotelDetail);  
                let hotelRooms = hotelDetails.rooms;
                if(hotelRooms.length>0){
                    for(let k=0;k<hotelRooms.length;k++){
                        if(code==hotelRooms[k].roomCode){
                            roomNewDetails['information'] = hotelRooms[k];
                            break;
                        }
                    }
                }
                if(roomNewDetails['information']!=undefined && roomNewDetails['information']!=null && roomNewDetails['information']!=''){
                    return (
                        <>
                        <h2 className="modal__title">{room.roomRatePlanName}</h2>
                        {roomNewDetails['information']!=undefined && roomNewDetails['information']!=null && roomNewDetails['information']!=''?
                            roomNewDetails['information']['roomFacilities']!=undefined && roomNewDetails['information']['roomFacilities']!=null && roomNewDetails['information']['roomFacilities']!='' && roomNewDetails['information']['roomFacilities'].length>0?
                            <>
                                <p className="smallTxt">Room Inclusions</p>
                                <ul>                                    
                                    {roomNewDetails['information']['roomFacilities'].map((roomFacility,i) => ( 
                                        roomFacility.description.content!="Room size (sqm)"?
                                        <li>{roomFacility.description.content}</li>
                                        :''
                                    ))}                                      
                                </ul>
                            </>
                            :''
                        :''
                        }
                        </>
                    );
                }else{
                    return "";
                }
            }
        }
    }

    function HotelRoomCancellationProgressBar(props){
        let room = props.room;
        let cancelPolicy = "";
        if(room.cancellation!=null && room.cancellation!=undefined && room.cancellation!=''){
            let roomCancellation = JSON.parse(room.cancellation);
            if(roomCancellation!=null && roomCancellation!=undefined && roomCancellation!=''){
                if(roomCancellation.length>0){
                    cancelPolicy = roomCancellation[roomCancellation.length-1];
                }
            }
            if(cancelPolicy!='' && cancelPolicy!=undefined && cancelPolicy!=null){
                let cancelDateObject = new Date(cancelPolicy.from);
                let nextDay = new Date(cancelPolicy.from);
                nextDay.setDate(cancelDateObject.getDate() - 1);
                let nextDayCancellation = nextDay.toDateString(); 
                let date = new Date(cancelPolicy.from).toDateString();
                let checkInDateStart = new Date(booking.checkInDate).toDateString();
                let checkInDateObject = new Date(booking.checkInDate);
                if(cancelPolicy.from!=undefined && cancelPolicy.from!=null && cancelPolicy.from!=''){
                    if(cancelDateObject>new Date() && cancelDateObject<checkInDateObject){
                        return (
                            <div className="container d-flex align-items-center">
                                <div className="progresCover">
                                    <div className="progresbar">
                                        <span className="progRefund">Refundable</span>
                                        <div className="steps">
                                            <span className="progCircle"></span>
                                            <strong>Now</strong>
                                        </div>
                                        <span className="line"></span>
                                        <span className="line"></span>
                                        <div className="steps">                                    
                                            <span className="progCircle"></span>
                                            <strong>{date}</strong>
                                        </div>
                                            
                                    </div> 
                                </div>  
                            </div>
                        );
                    }else{
                        return "";
                    }
                }else{
                    return "";
                }
            }else{
                return "";
            }
        }else{
            return "";
        }
    }

    if(!loading && booking!=null){
        let hotel = JSON.parse(booking.hotelDetail);
        if(booking.rooms.length>0 && Array.isArray(booking.rooms)){
            if(booking.rooms[0].rateComments!='' && booking.rooms[0].rateComments!=null && booking.rooms[0].rateComments!=undefined){
                setRateComment(booking.rooms[0].rateComments);
            }
        }
        let params = JSON.parse(booking.searchParams);
        let queryString = Object.keys(params).map(function(key) {
            return key + '=' + params[key];
        }).join('&');
        return (
            <Fragment>
            <div class="col-md-8">
                <div className="cartLeft">
                    <div className="boxWithShadow mb-3">
                        <div className="bookingSucess">
                            <div className="paySucss">
                                <FontAwesomeIcon icon={faCheck} />
                                <h5>Booking Successful</h5>
                                <p>Confirm and E-Vouchers sent to <strong>{booking.customerEmail}</strong> and <strong>{booking.customerPhone}</strong></p>
                                <div className="thtotalamt">
                                    <span className="thhd">Amount Paid</span>
                                    <span className="thttl">{booking.bookingCurrency} {formatCurrency(booking.bookingAmount)}</span>
                                </div>
                            </div>
                    
                        </div>
                    </div>
                    <div className="boxWithShadow mb-3">
                        <div className="sumrybid">
                            <div>Summary</div>
                            <div><span className="gray">Booking ID</span> {booking.bookingReference}</div>
                        </div>
                        <div className="bkInfoBox">
                            <div className="bkInfoBoxImg">
                                <img src={booking.hotelImageUrl} alt={booking.hotelName}/>
                            </div>
                            <div className="bkInfoBoxText">
                                <div className="dhName">
                                    <h2>{booking.hotelName} 
                                        <div className="hdStrRate">
                                            {generateTempArray(Math.round(hotel.rating).toFixed(1)).map((i) => (
                                                <img src={`${baseStoreURL}/images/star-active.png`} alt="star-active.png" className="hstrActive"/>
                                            ))}
                                        </div>
                                    </h2>
                                    <p><i className="fas fa-map-marker-alt"></i> {titleCase(hotel.address)}, {titleCase(hotel.city)}, {titleCase(hotel.country)}</p>                                
                                </div>
                            </div>
                        </div>
                        <div className="thfulDetls">
                            <h6 className="text-center mb-3">{booking.totalNight} NIGHTS</h6>
                            <div className="cartBinfo">
                                <div>
                                    <span>CHECK-IN</span>
                                    <strong>{new Date(booking.checkInDate).toDateString()}</strong>
                                    <span className="black">{booking.checkInTime}</span>
                                </div>
                                <div>
                                    <span>CHECK-OUT</span>
                                    <strong>{new Date(booking.checkOutDate).toDateString()}</strong>
                                    <span className="black">{booking.checkOutTime}</span>
                                </div>
                                <div>
                                    <span>GUESTS & ROOMS</span>
                                    <strong>{booking.totalAdults} Adults | {booking.totalRooms} Room</strong>
                                </div>
                                <div>
                                    <span>PRIMARY GUEST</span>
                                    <strong>{booking.customerFirstName} {booking.customerLastName}</strong>
                                </div>
                            </div>
                        </div>                  
                    </div>
                    <div className="boxWithShadow mb-3">
                        <div className="thTlPrice">
                            <div className="thtpHd">
                                <span>Total Price</span>
                                <span><strong>{booking.bookingCurrency} {formatCurrency(booking.bookingAmount)}</strong></span>
                            </div>
                            {booking.rooms.length>0?
                                    booking.rooms.map((room,k) => (
                                    <div className="thdetails">
                                        <ul>
                                            <li>
                                                <h2>{room.roomName}</h2>
                                                {room.roomAdults>1?
                                                    room.roomChild>0?
                                                    <span className="smallTxt gray">{room.roomAdults} Adults & {room.roomChild} Child {room.quantity>1?`X ${room.quantity} Rooms`:''}</span>
                                                    :
                                                    <span className="smallTxt gray">{room.roomAdults} Adults {room.quantity>1?`X ${room.quantity} Rooms`:''}</span>
                                                :
                                                    room.roomChild>0?
                                                    <span className="smallTxt gray">{room.roomAdults} Adult & {room.roomChild} Child {room.quantity>1?`X ${room.quantity} Rooms`:''}</span>
                                                    :
                                                    <span className="smallTxt gray">{room.roomAdults} Adult {room.quantity>1?`X ${room.quantity} Rooms`:''}</span>
                                                }
                                            </li>
                                            <li>
                                                <h2>Price Includes</h2>
                                                <HotelRoomFacilitiesInformation room={room}/>
                                                {hotel.facilities.length>0 ?
                                                    hotel.facilities.slice(0,5).map((item,k) => (
                                                        <span className="smallTxt piInclude" key={k}>{item}</span>
                                                    ))
                                                :''
                                                }
                                            </li>
                                        </ul>                            
                                    </div>
                                )) 
                            :''} 
                        </div>
                    </div>
                    <div className="boxWithShadow mb-3">
                        <div className="cartInfobox">
                            <h2>Important Information</h2>
                            <h4>{hotel.accommodationType} Rules</h4>
                            <ul>
                                <li>Check-in begins at {booking.checkInTime} and check-out is at {booking.checkOutTime}.</li>
                                {rateComments!=''?
                                <li>{rateComments}</li>
                                :''}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-md-4">
                <div className="cartRight">
                    <div className="cartRightBox mb-3">
                        <div className="cartPaymentInfo thmanageTrip">
                            <h3>Manage Your Trip</h3>
                            <ul className="purchase-props">
                                <li><Link target="_blank" href={`${baseStoreURL}/hotels/hotel-details/${booking.hotelCode}/${Math.floor(Math.random() * 10)}/${booking.uuid}-${params.searchSource}?${queryString}`}><FontAwesomeIcon icon={faPhone} /> Contact Property</Link></li>
                                <li><Link href={`${baseStoreURL}/hotels/cancel-booking/${booking.bookingReference}`}><FontAwesomeIcon icon={faTicketAlt} /> Cancel Booking</Link></li>
                                <li style={{display:"none"}}><Link href=""><FontAwesomeIcon icon={faHamburger} /> Add Meal</Link></li>
                                <li style={{display:"none"}}><Link href="add-guest.html"><FontAwesomeIcon icon={faUserPlus} /> Add Guest</Link></li>
                                <li><Link href={`${baseStoreURL}/hotels/download-ticket/${booking.bookingReference}`}><FontAwesomeIcon icon={faCloudDownloadAlt} /> Download Ticket</Link></li>
                            </ul>
                        </div>
                    </div>
                    <Link href={`${baseStoreURL}/account/bookings`} targe="_blank" className="btn btn-primary w-100 gtmtBtn">Go to My Trip</Link>
                </div>
            </div>
            {/*** INCLUSION POPUP ***/}
            <div className={`modal__container ${inclusionPopupDisplay==true?`show-modal`:``} adGustlPopup incPopup`} id="inclution-popup">
                <div className="modal__content modal-sm">
                    <div className="modal__close close-modal4" title="Close"  onClick={() => handleInclusionPopup()}>
                        <img src={`${baseStoreURL}/images/close.png`} alt="close.png" className="modal__img"/>
                    </div>
                    {inclusionPopupText}
                </div>
            </div>
            {/*** END OF INCLUSION POPUP ***/}
            <div className="loaderbg" style={{display:actionLoader==false?"none":"block"}}>
                <img src={`${baseStoreURL}/images/purplefare-loader.gif`} alt="purplefare-loader.gif" />
            </div>
            <ToastContainer autoClose={2000} closeOnClick draggable theme="light"/>
            </Fragment>
        );
    }else{
        const skeletonView = generateTempArray(5).map((i) => (
            <Skeleton/>
        ));
        return (
            <div className="row">
                <div className="col-md-8">
                    <div className="cartLeft">
                        {skeletonView}
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="cartRight">
                        {skeletonView}
                    </div>
                </div>
            </div>
        );
    }
}

export default connect((state) => state)(HotelThanks);