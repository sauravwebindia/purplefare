import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router'; 
import { formatCurrency } from '@/utilities/common-helpers';

export default function MobileStickyHotelPrice(props){
    const Router = useRouter();
    const [loading,setLoading] = useState(true);
    const [defaultRoom,setDefaultRoom] = useState(null);
    let facilitiesArray = new Array();
    useEffect(() => {  
        let mounted = true;
        if(props==null || props=='' || props==undefined){
            Router.push('/');
        }
        let hotel_beds_rooms = "";
        try{
            hotel_beds_rooms = localStorage.getItem('hotel_beds_rooms');
        }catch(e){

        }
        if(hotel_beds_rooms!='' && hotel_beds_rooms!=null && hotel_beds_rooms!=undefined){
            let roomsArray = JSON.parse(hotel_beds_rooms);
            let newArr = roomsArray.slice(0, 1);                
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
                setLoading(false);
            }
        }
        return () => mounted = false;
    }, []);
    if(!loading){      
        if(defaultRoom!=null){           
            return (
                <div className="dockable">
                    <div className="dockableInn">
                        <div className="dockLeft">
                            <span className="oldPrice">₹ {formatCurrency(defaultRoom.defaultRate.sellingRate)}</span>
                            <strong className="tlsPrice">₹ {formatCurrency(defaultRoom.defaultRate.net)}</strong>
                            {defaultRoom.defaultRate.taxes!=null && defaultRoom.defaultRate.taxes!=undefined && defaultRoom.defaultRate.taxes!=''?
                                <span className="hdTaxFee">+ ₹{formatCurrency(defaultRoom.defaultRate.taxes.taxes[0].clientAmount)} Taxes & fees</span>
                            :''}
                        </div>
                        <div className="dockRight">
                            <a href="#roomsid" className="btn bnBtn">Select Room</a>
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
}