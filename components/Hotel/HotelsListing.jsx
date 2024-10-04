import React, {useState,Fragment, useEffect} from 'react';
import Link from 'next/link';
import { formatCurrency,generateTempArray } from '@/utilities/common-helpers';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import InfiniteScroll from "react-infinite-scroll-component";
import HotelRepository from '@/repositories/HotelRepository';
import {baseStoreURL} from '@/repositories/Repository';
import { useRouter } from 'next/router';
import { connect,useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false;
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import dynamic from "next/dynamic";
const OwlCarousel = dynamic(() => import("react-owl-carousel"), {
  ssr: false,
});
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import HotelFilters from '@/components/Hotel/HotelFilters';
import { clearHotelBooking } from '@/store/booking/action';

function HotelsListing(props){
    const router = useRouter();
    const dispatch = useDispatch();
    const [skeltonLoading, setSkeltonLoading] = useState(false);
    const [loading, setLoading] = useState(false);
    const [traceId,setTraceId] = useState(null);
    const [currentPage,setCurrentPage] = useState(1);
    const [totalResults,setTotalResults] = useState(0);
    const [hotelsListing, setHotelsListing] = useState([]); 
    const [listFilters,setListFilters] = useState([]);
    const [loadingProducts, setLoadingProducts] = useState(false);
	const [hasMore, setHasMore] = useState(false);
    const [cityName, setCityName] = useState(null);
	const [nextPage, setNextPage] = useState(1);
    const [isImageError,setImageError] = useState(false);
    const [imageSrc,setImageSrc] = useState(null);
    const [bookingNights, setBookingNights] = useState(1);
    const [hotelSearchParams,setHotelSearchParams] = useState("");
    const [sortBy, setSortBy] = useState("Recommended");
    const [openfilter, setCurrentOpenFilter] = useState("Accommodation Types");
    const [mobileFilterShow,setShowMobileFilter] = useState(true);

    useEffect(() => {
        let mounted = true;
        let checkInDate = router.query.checkin;
        let checkOutDate = router.query.checkout;
        var date1 = new Date(checkInDate);
        var date2 = new Date(checkOutDate);
        var timeDiff = Math.abs(date2.getTime() - date1.getTime());
        var numberOfNights = Math.ceil(timeDiff / (1000 * 3600 * 24)); 
        setBookingNights(numberOfNights);
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
        let params = {'traceId':traceId,'sort_by':sortBy,'cityName':cityName,'searchSource':searchSource,'searchType':searchType,'searchValue':searchValue,'checkInDate':checkInDate,'checkOutDate':checkOutDate,'adults':adults,'rooms':rooms,'child':child,'childAge':childAge.split(",")};
        var queryString = Object.keys(params).map(function(key) {
            return key + '=' + params[key];
        }).join('&');
        setHotelSearchParams(queryString);
        searchHotelsListing(params);
        fetchHotelFilters(params);
        return () => mounted = false;
    }, []);

    const handleFilterTab = (filterTab) => {
		setCurrentOpenFilter(filterTab);
	}

    async function searchHotelsListing(params){
        setLoadingProducts(true);
        setSkeltonLoading(true);  
        localStorage.removeItem('persist:filters');      
        const responseData = await HotelRepository.searchHotel(params);
        if(responseData.success==1){            
            setHotelsListing(responseData.data.hotelResults.data);
            setTotalResults(responseData.data.hotelResults.total);
            setTraceId(responseData.data.traceId);
            localStorage.setItem('traceId',responseData.data.traceId);
            localStorage.setItem('cityName',responseData.data.cityName);
            localStorage.setItem('searchParams',JSON.stringify(params));
            setCurrentPage(responseData.data.hotelResults.current_page);
            setCityName(responseData.data.cityName);
            let lastPage = parseInt(responseData.data.hotelResults.last_page);
            let currentPage = parseInt(responseData.data.hotelResults.current_page); 
            if(lastPage>currentPage){   
                setNextPage(currentPage+1);
                setHasMore(true);
            }else{
                setNextPage(currentPage);
                setHasMore(false);
            }
            setLoadingProducts(false);
            setSkeltonLoading(false);
        }else{
            setHasMore(false);
            setLoadingProducts(false);
            setSkeltonLoading(false);
        }  
        //setShowMobileFilter(false);      
    }

    async function fetchHotelFilters(params){
        setLoading(true);
        const responseData = await HotelRepository.searchHotelsFilters(params);
        if(responseData.success==1){            
            setListFilters(responseData.data.filters);   
            //setShowMobileFilter(false);         
            //setSkeltonLoading(false);
        }
        setLoading(false);
    }

    async function applyHandleFilters(sort_by='') {
		//setLoading(true);
        setSkeltonLoading(true);   
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
            const filterResponseData = await HotelRepository.searchHotelsFilters(searchJSONArray);
            if(filterResponseData.success==1){            
                setListFilters(filterResponseData.data.filters);
                //setShowMobileFilter(false);
            }			
            const responseData = await HotelRepository.applyFilters(searchJSONArray);
			if (responseData.success==1) {
				if (responseData.data != '' && responseData.data != null && responseData.data != undefined) {
                    if(responseData.data.hotelResults!=null && responseData.data.hotelResults!=undefined && responseData.data.hotelResults!=''){
					    //setListFilters(responseData.data.filters);
                        setHotelsListing(responseData.data.hotelResults.data);	
                        setTotalResults(responseData.data.hotelResults.total);
                        setTraceId(responseData.data.traceId);
                        localStorage.setItem('traceId',responseData.data.traceId);
                        localStorage.setItem('cityName',responseData.data.cityName);
                        //localStorage.setItem('searchParams',JSON.stringify(params));
                        setCurrentPage(responseData.data.hotelResults.current_page);
                        setCityName(responseData.data.cityName);
                        let lastPage = parseInt(responseData.data.hotelResults.last_page);
                        let currentPage = parseInt(responseData.data.hotelResults.current_page); 
                        if(lastPage>currentPage){   
                            setNextPage(currentPage+1);
                            setHasMore(true);
                        }else{
                            setNextPage(currentPage);
                            setHasMore(false);
                        }
                        setLoadingProducts(false);
                        setSkeltonLoading(false);			
                        //router.push(`${baseStoreURL}/hotels/hotel-listing?${queryString}`);
                    }
				}
			}
		} else {
            let searchJSONArray = JSON.parse(searchParams);
            searchJSONArray['sort_by'] = sort_by;
            var queryString = Object.keys(searchJSONArray).map(function(key) {
                return key + '=' + searchJSONArray[key];
            }).join('&');
            const filterResponseData = await HotelRepository.searchHotelsFilters(searchJSONArray);
            if(filterResponseData.success==1){            
                setListFilters(filterResponseData.data.filters);
                //setShowMobileFilter(false);
            }			
            const responseData = await HotelRepository.applyFilters(searchJSONArray);
			if (responseData.success==1) {
				if (responseData.data != '' && responseData.data != null && responseData.data != undefined) {
                    if(responseData.data.hotelResults!=null && responseData.data.hotelResults!=undefined && responseData.data.hotelResults!=''){
					    //setListFilters(responseData.data.filters);
                        setHotelsListing(responseData.data.hotelResults.data);	
                        setTotalResults(responseData.data.hotelResults.total);
                        setTraceId(responseData.data.traceId);
                        localStorage.setItem('traceId',responseData.data.traceId);
                        localStorage.setItem('cityName',responseData.data.cityName);
                        //localStorage.setItem('searchParams',JSON.stringify(params));
                        setCurrentPage(responseData.data.hotelResults.current_page);
                        setCityName(responseData.data.cityName);
                        let lastPage = parseInt(responseData.data.hotelResults.last_page);
                        let currentPage = parseInt(responseData.data.hotelResults.current_page); 
                        if(lastPage>currentPage){   
                            setNextPage(currentPage+1);
                            setHasMore(true);
                        }else{
                            setNextPage(currentPage);
                            setHasMore(false);
                        }
                        setLoadingProducts(false);
                        setSkeltonLoading(false);			
                        //router.push(`${baseStoreURL}/hotels/hotel-listing?${queryString}`);
                    }
				}
			}
		}
		//setLoading(false);
        setSkeltonLoading(false);
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
					applyHandleFilters();
				} else {
					filterArray.push(filterValue);
					localStorage.setItem('persist:filters', JSON.stringify(filterArray));
					applyHandleFilters();
				}
			} else {
				let filterArray = new Array();
				filterArray.push(filterValue);
				localStorage.setItem('persist:filters', JSON.stringify(filterArray));
				applyHandleFilters();
			}
        }
    }

    async function getListHotels() {
        let checkInDate = router.query.checkin;
        let checkOutDate = router.query.checkout;
        let adults = router.query.adults;
        let child = router.query.child;
        let childAge = router.query.childAge;
        let searchType = router.query.searchType;
        let searchValue = router.query.searchValue;    
        let searchSource = router.query.searchSource;
        let rooms = router.query.rooms; 
        var searchParams = localStorage.getItem('searchParams');       
        let filterArray = new Array();
		var appliedFilters = localStorage.getItem('persist:filters');
        if (appliedFilters != null && appliedFilters != '' && appliedFilters != undefined) {
            filterArray = JSON.parse(appliedFilters);
        }
        let params;
        if (filterArray.length > 0) {
            params = {'f':filterArray,'sort_by':sortBy,'cityName':cityName,'traceId':traceId,'page':nextPage,'searchSource':searchSource,'searchType':searchType,'searchValue':searchValue,'checkInDate':checkInDate,'checkOutDate':checkOutDate,'adults':adults,'rooms':rooms,'child':child,'childAge':childAge.split(",")};
        }else{
            params = {'sort_by':sortBy,'cityName':cityName,'traceId':traceId,'page':nextPage,'searchSource':searchSource,'searchType':searchType,'searchValue':searchValue,'checkInDate':checkInDate,'checkOutDate':checkOutDate,'adults':adults,'rooms':rooms,'child':child,'childAge':childAge.split(",")};
        }
        setLoadingProducts(true);
        setSkeltonLoading(true);
        localStorage.removeItem('persist:filters');
        const responseData = await HotelRepository.searchHotel(params);
        if(responseData.success==1){            
            setHotelsListing(hotelsListing => [...hotelsListing, ...responseData.data.hotelResults.data]);
            setTotalResults(responseData.data.hotelResults.total);
            if(traceId!=responseData.data.traceId){
                setTraceId(responseData.data.traceId);
                localStorage.setItem('traceId',responseData.data.traceId);
                localStorage.setItem('cityName',responseData.data.cityName);
                localStorage.setItem('searchParams',JSON.stringify(params));
            }
            setCityName(responseData.data.cityName);
            setCurrentPage(responseData.data.hotelResults.current_page);
            let lastPage = parseInt(responseData.data.hotelResults.last_page);
            let currentPage = parseInt(responseData.data.hotelResults.current_page);            
            if(lastPage>currentPage){    
                setNextPage(currentPage+1);
                setHasMore(true);
            }else{
                setNextPage(currentPage);
                setHasMore(false);
            }
            setLoadingProducts(false);
            setSkeltonLoading(false);
        }else{
            setHasMore(false);
            setLoadingProducts(false);
            setSkeltonLoading(false);
        }
    }

    const handleImageError = () => {
        if(!isImageError){
            setImageSrc("https://b2b.tektravels.com/Images/HotelNA.jpg");
            setImageError(!isImageError);
        }
    }

    const handleMobileFilter = () => {
        setShowMobileFilter(!mobileFilterShow);
    }

    const handleSortBy = (e) => {
        if(e!=null && e!=undefined && e!=''){
            if(e.target!=null && e.target!=undefined && e.target!=''){
                if(e.target.value!=null && e.target.value!=undefined && e.target.value!=''){
                    setSortBy(e.target.value);
                    //console.log(e.target.value);
                    applyHandleFilters(e.target.value);
                }
            }
        }
    }
    
    let HotelsView = "";
    let FilterView = "";
    if(listFilters.length>0){
        FilterView = listFilters.map((item,i) => (
            <div className="filtBx" key={i}>
                <h4>{item.name} <span className="arrowIcon" onClick={(e) => handleFilterTab(item.name)}></span></h4>
                {item.name=="Review & Ratings"?
                    openfilter === item.name ?
                    <div className="list-group">
                        {item.values.map((child,k) => (
                            child.name!=''?
                                <div className="list-group-item d-flex gap-2 rdList" key={k}>
                                    <input id={`searchFilters_${item.name}_${child.name}`} className="radio-custom" name={`searchFilters[${item.name}][${child.name}]`} type="checkbox" checked={child.checked==true?true:false} onChange={(e) => applyHotelSideFilter(item.name,child.name)}/>
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
                    :''
                :
                openfilter === item.name ?
                <div className="list-group">
                    {item.values.map((child,k) => (
                        child.name!=''>0?
                            <div className="list-group-item d-flex gap-2 rdList" key={k}>
                                <input id={`searchFilters_${item.name}_${child.name}`} className="radio-custom" name={`searchFilters[${item.name}][${child.name}]`} type="checkbox" checked={child.checked==true?true:false} onChange={(e) => applyHotelSideFilter(item.name,child.name)}/>
                                <label for={`searchFilters_${item.name}_${child.name}`} className="radio-custom-label">{child.name}</label>
                            </div>
                        :''
                    ))}
                </div>
                :''
                }
            </div>
        ));
        FilterView = (
            <div className="filterbx" style={{display:mobileFilterShow?"block":"none"}}>
                <h2>Filter <Link href="" className="float-end fltrremove">Clear Filter</Link> <Link href="" className="float-end fltrclose">X</Link></h2>
                <div className="ltotalHotel">
                    Filter {totalResults} Total Hotels
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
        FilterView = (
            <div className="filterbx" style={{display:mobileFilterShow?"block":"none"}}>
                <h2><Skeleton/> <Link href="" className="float-end fltrremove"><Skeleton/></Link> <Link href="" className="float-end fltrclose"><Skeleton/></Link></h2>
                <div className="ltotalHotel">
                    <Skeleton/>
                </div>
            </div>
        );
    }
    if(!skeltonLoading){
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
        
        
        if(hotelsListing.length>0){
            HotelsView = hotelsListing.map((item,i) => (
                <div className="hListn" key={i}>
                    <Link target="_blank" href={`${baseStoreURL}${item.hotel_url}?${hotelSearchParams}`} className="ldlink"></Link>
                    <div className="hListnDtls">
                        <div className="hListnImg">
                            <span className="flag" style={{display:"none"}}>Breakfast Included</span>
                            <span className="hlWish"><FontAwesomeIcon icon={faHeart} /></span>
                            {item.images.length>0?
                                <div className="contain">
                                    <OwlCarousel className='owl-theme' margin={10} autoplay={true} responsive={responsiveObject} lazyLoad={true} slideBy={1} dots={true}>
                                        {item.images.map((image,i) => (
                                            <div className="item"><img src={`${image?image:imageSrc}`} onError={handleImageError} width="266" height="204" alt={item.name} className="img-fluid" /></div>
                                        ))}
                                    </OwlCarousel>
                                </div>
                            :''}                            
                        </div>
                        <div className="hListnDels">
                            <h2>{item.name}</h2>
                            <div className="hStrRate">
                                {item.rating>0?generateTempArray(item.rating).map((i) => (
                                <img src={`${baseStoreURL}/images/star-active.png`} key={i} alt="star-active.png" className="hstrActive" />
                                )):''}
                                {5 - item.rating>0?generateTempArray(5 - item.rating).map((i) => (
                                <img src={`${baseStoreURL}/images/star.png`} key={i} alt="star.png" className="hstr" />
                                )):''}
                            </div>
                            <p className="hAddr"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z"/></svg> {item.address}</p>
                            <ul className="hChkList" style={{display:"none"}}>
                                <li>Free Cancellation</li>
                                <li>No Prepayment Needed</li>
                            </ul>
                            {item.price>item.sale_price?
                                <span className="hOffPrice" style={{display:'none'}}>Only 5 rooms left at this price on our site</span>
                            :''}
                            {item.Facilities!=undefined && item.Facilities!=null ?item.Facilities.length>0?
                                <div className="hfacility">
                                    <ul>
                                        {item.Facilities.map((facility,k) => (
                                            <li key={k}>{facility}</li>
                                        ))}
                                    </ul>
                                </div>
                            :'':''}
                            
                        </div>
                    </div>
                    <div className="hListnCalActin">
                        <div className="hRatings">
                            <Link href="javascript:;" className="">{Math.round(item.rating).toFixed(1)}</Link> {item.ratingType}
                        </div>
                        <div className="loffers" style={{display:"none"}}>
                            <h5 className="hOfferPerct">15% off</h5>
                            <span className="hOffLto">Limited time offer</span>
                        </div>
                        <div className="lpriceby">
                            {item.price>item.sale_price?
                            <>
                                <span className="holdPrice">{item.currency} {formatCurrency(item.price)}</span>
                                <strong className="hsalePrice">{item.currency} {formatCurrency(item.sale_price)}</strong>
                            </>
                            :
                            <strong className="hsalePrice">{item.currency} {formatCurrency(item.sale_price)}</strong>
                            }
                            <span className="hInfo">1 Room / Per Night</span>
                            {bookingNights==1?
                                <span className="totalPrice">{bookingNights} Night: {item.currency} {formatCurrency(item.sale_price*router.query.adults*router.query.rooms*bookingNights)}</span>
                            :
                            <span className="totalPrice">{bookingNights} Nights: {item.currency} {formatCurrency(item.sale_price*router.query.adults*router.query.rooms*bookingNights)}</span>
                            }
                            <Link target="_blank" href={`${baseStoreURL}${item.hotel_url}`} className="btn hButton">See Availability </Link>
                        </div>
                    </div>
                </div>
            ));
        }else{
            HotelsView =  (<p>Not Hotels Found!!!</p>);
        }
    }else{
		const skeletonView = generateTempArray(5).map((i) => (
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
        FilterView = (
            <div className="filterbx" style={{display:mobileFilterShow?"block":"none"}}>
                <h2><Skeleton/> <Link href="" className="float-end fltrremove"><Skeleton/></Link> <Link href="" className="float-end fltrclose"><Skeleton/></Link></h2>
                <div className="ltotalHotel">
                    <Skeleton/>
                </div>
                {skeletonView}
            </div>
        );
        HotelsView = generateTempArray(5).map((i) => (
            <div className="hListn" key={i}>
                <Skeleton className="ldlink"/>
                <div className="hListnDtls">
                    <div className="hListnImg">
                        <span className="flag"><Skeleton/></span>
                        <span className="hlWish"><i className="fas fa-heart active" aria-hidden></i></span>
                        <Skeleton className="img-fluid" />
                    </div>
                    <div className="hListnDels">
                        <h2><Skeleton/></h2>
                        <div className="hStrRate">
                            <Skeleton containerClassName="avatar-skeleton" />
                            <Skeleton containerClassName="avatar-skeleton" />
                            <Skeleton containerClassName="avatar-skeleton" />
                            <Skeleton containerClassName="avatar-skeleton" />
                            <Skeleton containerClassName="avatar-skeleton" />
                        </div>
                        <p className="hAddr"><Skeleton/></p>
                        <ul className="hChkList">
                            <li><Skeleton/></li>
                            <li><Skeleton/></li>
                        </ul>
                        <span className="hOffPrice"><Skeleton/></span>
                        <div className="hfacility">
                            <Skeleton containerClassName="avatar-skeleton" />
                            <Skeleton containerClassName="avatar-skeleton" />
                            <Skeleton containerClassName="avatar-skeleton" />
                            <Skeleton containerClassName="avatar-skeleton" />
                            <Skeleton containerClassName="avatar-skeleton" />
                        </div>                        
                    </div>
                </div>
                <div className="hListnCalActin">
                    <div className="hRatings">
                        <Link href="#" className=""><Skeleton/></Link> <Skeleton/>
                    </div>
                    <div className="loffers">
                        <h5 className="hOfferPerct"><Skeleton/></h5>
                        <span className="hOffLto"><Skeleton/></span>
                    </div>
                    <div className="lpriceby">
                        <span className="holdPrice"><Skeleton/></span>
                        <strong className="hsalePrice"><Skeleton/></strong>
                        <span className="hInfo"><Skeleton/></span>
                        <a href="#" className="btn hButton"><Skeleton/></a>
                    </div>
                </div>
            </div>
        ));
    }
    return (
        <Fragment>
            <div className="col-md-3">
                {FilterView}
            </div>
            <div className="col-md-9">
                <div className="mFixBtns">
                    <Link href="javascript:;" className="filterbtnmob" onClick={handleMobileFilter}><i className="fas fa-sort-amount-down-alt"></i> Filter</Link>
                    <div className="shortBybx">
                        Sort By: 
                        <select name="sort_by" id="sort_by" onChange={(e) => handleSortBy(e)}>
                            <option selected={sortBy=='Recommended'?true:false} value="Recommended">Recommended</option>
                            {/*<option selected={sortBy=='Lowest Price'?true:false} value="Lowest Price">Lowest Price</option>*/}
                            <option selected={sortBy=='Guest Rating + Number of Reviews'?true:false} value="Guest Rating + Number of Reviews">Guest Rating + Number of Reviews</option>
                        </select>
                    </div>
                </div>
                <div className="listInner">
                    <div className="sbyBox">
                        {skeltonLoading?<Skeleton/>:<h4>{cityName}: {totalResults} Hotels found</h4>}                    
                        <div className="shortBybx sbbDesktop">
                            Sort By: 
                            <select name="sort_by" id="sort_by" onChange={(e) => handleSortBy(e)}>
                                <option selected={sortBy=='Recommended'?true:false} value="Recommended">Recommended</option>
                                {/*<option selected={sortBy=='Lowest Price'?true:false} value="Lowest Price">Lowest Price</option>*/}
                                <option selected={sortBy=='Guest Rating + Number of Reviews'?true:false} value="Guest Rating + Number of Reviews">Guest Rating + Number of Reviews</option>
                            </select>
                        </div>
                    </div>                 
                    <InfiniteScroll
                        dataLength={nextPage}
                        next={getListHotels}
                        hasMore={hasMore}
                        loader={<p style={{ textAlign: 'center' }}><img src={`${baseStoreURL}/images/loader.gif`} alt="PurpleFare"/></p>}
                        endMessage={
                            <p style={{ textAlign: 'center' }}>
                                <strong>All Hotels are loaded!!!</strong>
                            </p>
                        }
                    >
                        {HotelsView}     
                    </InfiniteScroll>        
                </div>
            </div>
        </Fragment>
    );
}

export default connect((state) => state)(HotelsListing);