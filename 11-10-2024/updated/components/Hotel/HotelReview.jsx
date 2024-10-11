import React, { useEffect, useState, Fragment } from 'react';
import { useRouter } from 'next/router';
import { connect,useDispatch } from 'react-redux';
import { formatCurrency,generateTempArray } from '@/utilities/common-helpers';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import HotelRepository from '@/repositories/HotelRepository';
import Link from 'next/link';
import {baseStoreURL} from '@/repositories/Repository';

function HotelReview(props){
    const router = useRouter();
	const { auth,hotelBooking } = props;
    const [reviewBooking,setHotelBooking] = useState(null);
    const [loading,setLoading] = useState(false);
    const [inclusionPopupDisplay, setInclusionPopupDisplay] = useState(false);
    const [inclusionPopupText, setInclusionPopupText] = useState("");
    const [roomDetailPopupCode,setRoomDetailPopupCode] = useState(null);
	const dispatch = useDispatch();
    useEffect(() => {  
        let mounted = true;
        setLoading(true);
        if(localStorage.getItem('uuid')!=null && localStorage.getItem('uuid')!=undefined && localStorage.getItem('uuid')!=''){           
            fetchHotelBookingForReview(localStorage.getItem('uuid'));
        }
        return () => mounted = false;
    }, []); 
    
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

    async function fetchHotelBookingForReview(userUniqueId){
        let params = {'uuid':userUniqueId};
        const responseData = await HotelRepository.fetchBookingForReview(params);
        if(responseData.success==1){
            setHotelBooking(responseData.data.booking);
            setLoading(false);
        }else{
            //router.back() ?? router.push('/');
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
                let checkInDateStart = new Date(reviewBooking.checkInDate).toDateString();
                if(rateItem!=undefined && rateItem!=null && rateItem!=''){
                    if(cancelItem.new_amount==rateItem.new_net && date==checkInDateStart){
                        return(<li key={k}><span className="text-red">Non Refundable</span></li>);
                    }else if(date<checkInDateStart){
                        return(<li key={k}><span className="text-red">Non Refundable</span></li>);
                    }else if(cancelItem.new_amount==rateItem.new_net && date!=checkInDateStart){
                        return (
                            <>
                            <li key={k}>Free Cancellation before {date}</li>
                            {cancelItem.new_amount==rateItem.new_net?
                            <li key={k}><span className="text-red">Non Refundable after {date}</span></li>
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
        setInclusionPopupDisplay(true);
        setInclusionPopupText(generateRoomInclusionDetailsPopup(code));
    }

    const generateRoomInclusionDetailsPopup = (code) => {
        let room;        
        let roomNewDetails = new Array();        
        let hotel = JSON.parse(reviewBooking.hotelDetail);
        let listRooms = reviewBooking.rooms;   
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
                let hotelDetails = JSON.parse(reviewBooking.hotelDetail);  
                let hotelRooms = hotelDetails.rooms;
                if(hotelRooms.length>0){
                    for(let k=0;k<hotelRooms.length;k++){
                        if(code==hotelRooms[k].roomCode){
                            roomNewDetails['information'] = hotelRooms[k];
                            break;
                        }
                    }
                }
                console.log(roomNewDetails);
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
                nextDay.setDate(cancelDateObject.getDate() + 1);
                let nextDayCancellation = nextDay.toDateString(); 
                let date = new Date(cancelPolicy.from).toDateString();
                let checkInDateStart = new Date(reviewBooking.checkInDate).toDateString();
                if(cancelPolicy.from<reviewBooking.checkInDate){
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
                                        <strong>{checkInDateStart} | {reviewBooking.checkInTime} <span>Check-in</span></strong>
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
    }

    if(!loading && reviewBooking!=null){
        let hotel = JSON.parse(reviewBooking.hotelDetail);
        return (
            <Fragment>
            <div className="row">
                <div className="col-md-8">
                    <div className="cartLeft">
                        <div className="boxWithShadow mb-3">
                        <div className="bkInfoBox">
                            <div className="bkInfoBoxImg">
                                <img src={reviewBooking.hotelImageUrl} alt={reviewBooking.hotelName}/>
                            </div>
                            <div className="bkInfoBoxText">
                                <div className="dhName">
                                    <h2>About {reviewBooking.hotelName} </h2>
                                    <p><i className="fas fa-map-marker-alt"></i> {titleCase(hotel.address)}, {titleCase(hotel.city)}, {titleCase(hotel.country)} - <Link href={`https://maps.google.com/maps?z=12&q=loc:${hotel.lat},${hotel.lng}`} target="_blank">View on map</Link></p>
                                    <div className="hdRatingbox cartRate">
                                        <Link href="javascript:;" className="">{parseFloat(hotel.rating).toFixed(1)}</Link>
                                    </div>
                                    <div className="cartBinfo">
                                        <div>
                                            <span>CHECK-IN</span>
                                            <strong>{new Date(reviewBooking.checkInDate).toDateString()}</strong>
                                        </div>
                                        <div>
                                            <span>CHECK-OUT</span>
                                            <strong>{new Date(reviewBooking.checkOutDate).toDateString()}</strong>
                                        </div>
                                        <div>
                                            <span>NIGHTS</span>
                                            <strong>{reviewBooking.totalNight}</strong>
                                        </div>
                                        <div>
                                            <span>ROOMS</span>
                                            <strong>{reviewBooking.totalRooms}</strong>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        </div>

                        <div className="boxWithShadow mb-3">
                            <div className="cartSmTitle">
                                {reviewBooking.totalRooms>1?
                                <h4>{reviewBooking.totalRooms} Rooms</h4>
                                :
                                <h4>{reviewBooking.totalRooms} Room</h4>
                                }
                                <p><strong>2 Bedrooms, 1 Washroom | 2 King Beds, 1 Queen Bed, 3 Mattresses</strong></p>
                                <div className="hr"></div>
                            </div>
                            {reviewBooking.rooms.length>0?
                                reviewBooking.rooms.map((room,k) => (
                                <div className="row entirect" key={k}>
                                    <div className="col-md-12">
                                        <div className="hdWithInclus">
                                            <h5 className="fw-bold mb-0">{room.roomName}</h5> 
                                            <a href="javascript:;" className="inclusion-btn" onClick={() => handleRoomPopupDetail(room.roomCode)} id="inclution-btn">See Inclusions</a>
                                        </div>
                                        {room.roomAdults>1?
                                            room.roomChild>0?
                                            <p className="smallTxt grayColor mb-2">{room.roomAdults} Adults & {room.roomChild} Child</p>
                                            :
                                            <p className="smallTxt grayColor mb-2">{room.roomAdults} Adults</p>
                                        :
                                            room.roomChild>0?
                                            <p className="smallTxt grayColor mb-2">{room.roomAdults} Adult & {room.roomChild} Child</p>
                                            :
                                            <p className="smallTxt grayColor mb-2">{room.roomAdults} Adult</p>
                                        }
                                        <HotelRoomFacilitiesInformation room={room}/>
                                        <HotelRoomCancellationProgressBar room={room}/>                                     
                                    </div>
                                </div> 
                                )) 
                            :''}                             
                        </div>

                        <div className="boxWithShadow mb-3 bg-warning-pp">
                            <div className="cartInfobox">
                                <h2>Important Information</h2>
                                <ul>
                                    <li>
                                        <span>Fully Refundable</span> until 11:59pm (property local time) on 07-08-2024. After that time hotel cancellation and change fees apply as stated in the <a className="" title="" href="" >Booking Conditions (this link opens in a modal dialog)</a>.
                                    </li>
                                    <li>Check-in begins at {reviewBooking.checkInTime} and check-out is at {reviewBooking.checkOutTime}.</li>
                                    <li>By selecting Book & Pay Later you agree to theBooking Conditions (this link opens in a modal dialog),<a href={`${baseStoreURL}/pages/terms-conditions`} target="_blank">Terms & Conditions</a> and <a href={`${baseStoreURL}/pages/privacy-policy`} target="_blank">Privacy Policy.</a></li>
                                </ul>
                            </div>
                        </div>

                        <div className={`modal__container adGustlPopup`} id="ad-guest-container">
                            <div className="modal__content modal-sm">
                                <div className="modal__close close-modal" title="Close">
                                    <img src={`${baseStoreURL}/images/close.png`} alt="close.png" className="modal__img"/>
                                </div>

                                <h2 className="modal__title">Add Guests</h2>
                                <p className="smallTxt">Name should be as per official govt. ID & travelers below 18 years of age cannot travel alone</p>
                                <div className="modelInContent">
                                    <div className="row">
                                        <div className="col-md-12">
                                            <label>First Name</label>
                                            <input type="text" value="1234567890" id="mobile"/>
                                        </div>
                                        <div className="col-md-12">
                                            <label>Last Name</label>
                                            <input type="text" value="1234567890" id="mobile"/>
                                        </div>
                                        <div className="col-md-12">
                                            <p className="check-mark mt-2 termLink">
                                                <input type="checkbox" id="gst-terms"/>
                                                <label for="gst-terms">Below 12 years of age</label>
                                            </p>
                                        </div>

                                        <div className="col-md-12">
                                            <a href="javascript:;" className="dummyLink"><input type="submit" id="submit" value="ADD TO SAVED GUESTS" className="proUpdateBtn"/></a>
                                        </div>
                                    </div>
                                </div>

                                
                            </div>
                        </div>
                        <div className="boxWithShadow mb-3">
                            <div className="guestBox">
                                <p className="smallTxt tgcbox">The guest checking into each hotel room must be 21 or older, present a valid Photo ID and credit card.</p>
                                <h2>Guest Name</h2>

                                
                                <div className="row formbx">
                                    <div className="col-md-6">
                                        <div className="form-floating">
                                            <input type="text" className="form-control" id="name" placeholder="Name*"/>
                                            <label for="name">First Name*</label>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-floating">
                                            <input type="text" className="form-control" id="lastname" placeholder="Last Name*"/>
                                            <label for="lastname">Last Name*</label>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-floating">
                                            <input type="email" className="form-control" id="email" placeholder="Email*"/>
                                            <label for="email">Email*</label>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-floating">
                                            <input type="tel" className="form-control" id="mobile" placeholder="Mobile*"/>
                                            <label for="mobile">Mobile*</label>
                                        </div>
                                    </div>

                                    <div className="col-md-12 mb-1">
                                        <a href="javascript:;" className="adguest-btm" id="ad-guest">+ Add Guest</a>
                                    </div>
                                    
                                    

                                </div>
                            </div>
                        </div>
                        

                        
                        <div className="hr mb-2"></div>
                        <p className="smallTxt">By proceeding, I agree to purplefare’s User Agreement, Terms of Service, Supplier Terms & Conditions and Cancellation & Property Booking Policies</p>
                        
                        <a href="thanks.html" className="continuePay grediant-multi-btn">Pay Now</a>

                    </div>
                </div>

                <div className="col-md-4">
                    <div className="cartRight">
                        <div className="cartRightBox mb-3">
                        <div className="cartPaymentInfo">
                            <h3>Reservation Summary</h3>
                            <ul className="purchase-props">
                                <li className="flex-between">
                                    <span className="cttitle">1 Room x 1 Nights <span>Base Price</span></span>
                                    <span className="ctdtals"><strong className="hsalePrice">$ 15000</strong></span> 
                                </li>
                                <li className="flex-between cartDiscount">
                                    <span className="cttitle">Total Discount</span>
                                    <span className="ctdtals">$ 12,508</span> 
                                </li>
                                <li className="flex-between">
                                    <span className="cttitle">Price after Discount</span>
                                    <span className="ctdtals">$ 10,590</span> 
                                </li>
                                <li className="flex-between">
                                    <span className="cttitle">Taxes and fees</span>
                                    <span className="ctdtals">$ 2,816</span> 
                                </li>
                                <li className="flex-between">
                                    <span className="cttitle">Total Amount to be paid</span>
                                    <span className="ctdtals">$ 13,406</span> 
                                </li>
                                </ul>
                        </div>
                        </div>

                        <div className="cartRightBox mb-3">
                            <div className="cartRightBoxInn">
                                <h3>Coupon Codes</h3>
                                <div className="cartdiscount">
                                    
                                        <label className="couponCard">
                                            <input name="plan" className="radio" type="radio" checked/>
                                            
                                            <span className="plan-details">
                                            <span className="offCoupon">
                                                <span className="plan-type">VACATION20</span>
                                                <span className="plan-cost">$90</span>
                                            </span>
                                            <p>Exclusive Offer on Federal Bank Credit Cards.Get INR 2481 off</p>
                                            </span>
                                        </label>
                                        
                                        <label className="couponCard">
                                            <input name="plan" className="radio" type="radio" checked/>
                                            
                                            <span className="plan-details">
                                                <span className="offCoupon">
                                                    <span className="plan-type">VACATION20</span>
                                                    <span className="plan-cost">$100</span>
                                                    <span className="fas fa-times removeCoupon"></span>
                                                </span>
                                                <p>Exclusive Offer on Federal Bank Credit Cards.Get INR 2481 off</p>
                                            </span>
                                            </label>
                                            
                                        
                                        <div className="cpCode">
                                                <input type="text" id="coupon" placeholder="Enter Coupon Code"/>
                                                <button className="btn btn-outline-secondary font-weight-normal mt-10-px" type="button">Apply</button>
                                        </div>
                                </div>
                            </div>
                        </div>
                    </div>
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

export default connect((state) => state)(HotelReview);