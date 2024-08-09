import React, {useState,useEffect} from 'react';
import { formatCurrency,generateTempArray } from '@/utilities/common-helpers';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import HotelRepository from '@/repositories/HotelRepository';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function HotelFilters() {
    const router = useRouter();
    const [skeltonLoading,setSkeltonLoading] = useState(false);
    const [listFilters,setListFilters] = useState([]);

    useEffect(() => {
        let mounted = true;
        let checkInDate = router.query.checkin;
        let checkOutDate = router.query.checkout;
        let adults = router.query.adults;
        let child = router.query.child;
        let childAge = router.query.childAge;
        let searchType = router.query.searchType;
        let searchValue = router.query.searchValue;   
        let searchSource = router.query.searchSource; 
        let rooms = router.query.rooms; 
        let traceId = "";
        let cityName = "";
        try{
            traceId = localStorage.getItem('traceId');
            cityName = localStorage.getItem('cityName');
        }catch(e){
            traceId = "";
            cityName = "";
        }
        let params = {'traceId':traceId,'cityName':cityName,'searchSource':searchSource,'searchType':searchType,'searchValue':searchValue,'checkInDate':checkInDate,'checkOutDate':checkOutDate,'adults':adults,'rooms':rooms,'child':child,'childAge':childAge.split(",")};
        fetchHotelFilters(params);
        return () => mounted = false;
    }, []);

    async function fetchHotelFilters(params){
        setSkeltonLoading(true);
        const responseData = await HotelRepository.searchHotelsFilters(params);
        if(responseData.success==1){            
            setListFilters(responseData.data.filters);            
            setSkeltonLoading(false);
        }
        setSkeltonLoading(false);
    }

    if(!skeltonLoading){
        let FilterView = "";
        if(listFilters.length>0){
            FilterView = listFilters.map((item,i) => (
                <div className="filtBx" key={i}>
                    <h4>{item.name} <span className="arrowIcon"></span></h4>
                    <div className="list-group">
                        {item.values.map((child,k) => (
                            child.total>0?
                                <div className="list-group-item d-flex gap-2 rdList" key={k}>
                                    <input id="radio-1" className="radio-custom" name="radio-group" type="radio"/>
                                    <label for="radio-1" className="radio-custom-label">{child.name} <small className="text-body-secondary ml-auto">({child.total})</small></label>
                                </div>
                            :''
                        ))}
                    </div>
                </div>
            ));
            return (
                <div className="filterbx">
                    <h2>Filter <Link href="" className="float-end fltrremove">Clear Filter</Link> <Link href="" className="float-end fltrclose">X</Link></h2>
                    <div className="ltotalHotel">
                        Filter 594 Total Hotels
                    </div>
                    {FilterView}
                    {listFilters.length>6?
                    <div className="filtMore">
                        <Link href="#">Show More</Link>
                    </div>
                    :''}
                    <div className="applyfilterMobile">
                        <Link href="#" className="clearFilter">Clear Filter</Link>
                        <Link href="#" className="applyFilter">Apply Filter</Link>
                    </div>            
                </div>
            );
        }else{
            let FilterView = "";
            return(
                <div className="filterbx">
                    <h2><Skeleton/> <Link href="" className="float-end fltrremove"><Skeleton/></Link> <Link href="" className="float-end fltrclose"><Skeleton/></Link></h2>
                    <div className="ltotalHotel">
                        <Skeleton/>
                    </div>
                    {FilterView}
                </div>
            );
        }        
    }else{
        let FilterView = "";
        FilterView = generateTempArray(5).map((i) => (
            <div className="filtBx" key={i}>
                <h4><Skeleton/> <span className="arrowIcon"></span></h4>
                <div className="list-group">
                    <div className="list-group-item d-flex gap-2 rdList">
                        <input id="radio-1" className="radio-custom" name="radio-group" type="radio"/>
                        <label for="radio-1" className="radio-custom-label"><Skeleton/> <small className="text-body-secondary ml-auto">(<Skeleton/>)</small></label>
                    </div>
                    <div className="list-group-item d-flex gap-2 rdList">
                        <input id="radio-2" className="radio-custom" name="radio-group" type="radio"/>
                        <label for="radio-2" className="radio-custom-label"><Skeleton/> <small className="text-body-secondary ml-auto">(<Skeleton/>)</small></label>
                    </div>
                    <div className="list-group-item d-flex gap-2 rdList">
                        <input id="radio-3" className="radio-custom" name="radio-group" type="radio"/>
                        <label for="radio-3" className="radio-custom-label"><Skeleton/> <small className="text-body-secondary ml-auto">(<Skeleton/>)</small></label>
                    </div>
                </div>
            </div>
        ));
        return(
            <div className="filterbx">
                <h2><Skeleton/> <Link href="" className="float-end fltrremove"><Skeleton/></Link> <Link href="" className="float-end fltrclose"><Skeleton/></Link></h2>
                <div className="ltotalHotel">
                    <Skeleton/>
                </div>
                {FilterView}
            </div>
        );
    }
}