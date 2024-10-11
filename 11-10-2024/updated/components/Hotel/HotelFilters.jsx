import React, {useState,useEffect} from 'react';
import { formatCurrency,generateTempArray } from '@/utilities/common-helpers';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import HotelRepository from '@/repositories/HotelRepository';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { baseStoreURL } from '@/repositories/Repository';
import { connect,useDispatch } from 'react-redux';

function HotelFilters(props) {
    const dispatch = useDispatch();
    const router = useRouter();
    const { auth } = props;
    const [loading, setLoading] = useState(false);
    const [skeltonLoading,setSkeltonLoading] = useState(false);
    const [listFilters,setListFilters] = useState([]);
    const [sortBy, setSortBy] = useState("Recommended");

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


    async function fetchUpdateHotelFilters(){
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
        setSkeltonLoading(true);
        const responseData = await HotelRepository.searchHotelsFilters(params);
        if(responseData.success==1){            
            setListFilters(responseData.data.filters);            
            setSkeltonLoading(false);
        }
        setSkeltonLoading(false);
    }

    async function fetchHotelFilters(params){
        setSkeltonLoading(true);
        const responseData = await HotelRepository.searchHotelsFilters(params);
        if(responseData.success==1){            
            setListFilters(responseData.data.filters);            
            setSkeltonLoading(false);
        }
        setSkeltonLoading(false);
    }

    async function applyFilters() {
		setLoading(true);
		let filterArray = new Array();
		let filterRArray = new Array();
		var searchParams = localStorage.getItem('searchParams');       
        
		var appliedFilters = localStorage.getItem('persist:filters');
            if (appliedFilters != null && appliedFilters != '' && appliedFilters != undefined) {
                filterArray = JSON.parse(appliedFilters);
            }
		if (filterArray.length > 0 && searchParams!=null && searchParams!=undefined && searchParams!='') {
            let searchJSONArray = JSON.parse(searchParams);
            searchJSONArray['f'] = filterArray;
            searchJSONArray['sort_by'] = sortBy;
            var queryString = Object.keys(searchJSONArray).map(function(key) {
                return key + '=' + searchJSONArray[key];
            }).join('&');
			const params = { 'f': filterArray, 'sort_by': sortBy};
			const responseData = await HotelRepository.applyFilters(searchJSONArray);
			if (responseData.success==1) {
				if (responseData.data != '' && responseData.data != null && responseData.data != undefined) {
                    if(responseData.data.filters!=null && responseData.data.filters!=undefined && responseData.data.filters!=''){
					    setListFilters(responseData.data.filters);					
                        router.push(`${baseStoreURL}/hotels/hotel-listing?${queryString}`);
                    }
				}
			}
		} else {
            let searchJSONArray = JSON.parse(searchParams);
            searchJSONArray['sort_by'] = sortBy;
            var queryString = Object.keys(searchJSONArray).map(function(key) {
                return key + '=' + searchJSONArray[key];
            }).join('&');
			router.push(`${baseStoreURL}/hotels/hotel-listing?${queryString}`);
		}
		setLoading(false);
	}

    const applyHotelSideFilter = (filterLabel,filterLabelValue) => {
        let filterArray = new Array();
        if (filterLabel!='' && filterLabel!=null && filterLabel!=undefined && filterLabelValue != '' && filterLabelValue != null && filterLabelValue != undefined) {
            let filterValue = filterLabel+'::'+filterLabelValue;
            var appliedFilters = localStorage.getItem('persist:filters');
            filterArray = JSON.parse(appliedFilters);
            if (filterArray != null && filterArray != undefined && filterArray != '') {
				if (filterArray.length > 0) {
					let tmpIndex = filterArray.indexOf(filterValue);
					if (tmpIndex !== -1) {				
						filterArray.splice(tmpIndex,1);					
					} else {
						filterArray.push(filterValue);
					}
					localStorage.setItem('persist:filters', JSON.stringify(filterArray));
					applyFilters();
				} else {
					filterArray.push(filterValue);
					localStorage.setItem('persist:filters', JSON.stringify(filterArray));
					applyFilters();
				}
			} else {
				let filterArray = new Array();
				filterArray.push(filterValue);
				localStorage.setItem('persist:filters', JSON.stringify(filterArray));
				applyFilters();
			}
        }
    }

    if(!skeltonLoading){
        let FilterView = "";
        if(listFilters.length>0){
            FilterView = listFilters.map((item,i) => (
                <div className="filtBx" key={i}>
                    <h4>{item.name} <span className="arrowIcon"></span></h4>
                    {item.name=="Review & Ratings"?
                        <div className="list-group">
                            {item.values.map((child,k) => (
                                child.name!=''?
                                    <div className="list-group-item d-flex gap-2 rdList" key={k}>
                                        <input id={`searchFilters_${item.name}_${child.name}`} className="radio-custom" name={`searchFilters[${item.name}][${child.name}]`} type="checkbox" onClick={(e) => applyHotelSideFilter(item.name,child.name)}/>
                                        <label for={`searchFilters_${item.name}_${child.name}`} className="radio-custom-label">
                                            <span className="hStrRate">
                                                {generateTempArray(Math.round(child.name).toFixed(1)).map((i) => (
                                                    <img src={`${baseStoreURL}/images/star-active.png`} alt="" className="hstrActive"/>
                                                ))}
                                            </span>
                                        </label>
                                    </div>
                                :''
                            ))}
                        </div>
                    :
                    <div className="list-group">
                        {item.values.map((child,k) => (
                            child.name!=''>0?
                                <div className="list-group-item d-flex gap-2 rdList" key={k}>
                                    <input id={`searchFilters_${item.name}_${child.name}`} className="radio-custom" name={`searchFilters[${item.name}][${child.name}]`} type="checkbox" onClick={(e) => applyHotelSideFilter(item.name,child.name)}/>
                                    <label for={`searchFilters_${item.name}_${child.name}`} className="radio-custom-label">{child.name}</label>
                                </div>
                            :''
                        ))}
                    </div>
                    }
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
export default connect((state) => state)(HotelFilters);