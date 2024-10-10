import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import {baseStoreURL} from '@/repositories/Repository';
import { DateRangePicker } from 'rsuite';
import Skeleton from '@mui/material/Skeleton';
import Autocomplete from '@mui/joy/Autocomplete';
import Box from '@mui/material/Box';
import { DatePicker } from 'rsuite';
const { combine, allowedMaxDays, beforeToday } = DateRangePicker;
import 'rsuite/DateRangePicker/styles/index.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false;
import { faMinus,faPlus } from '@fortawesome/free-solid-svg-icons'
import CircularProgress from '@mui/joy/CircularProgress';
import AutocompleteOption from '@mui/joy/AutocompleteOption';
import Typography from '@mui/joy/Typography';
import parse from 'autosuggest-highlight/parse';
import match from 'autosuggest-highlight/match';
import HotelRepository from '@/repositories/HotelRepository';
import Link from 'next/link';
import { connect,useDispatch } from 'react-redux';
import { clearHotelBooking,getHotelBooking } from '@/store/booking/action';

function HotelModifySearch(props){
	const Router = useRouter();
	const { auth,hotelBooking } = props;
	const dispatch = useDispatch();
	const [searchBtnDisable,setSearchBtnDisable] = useState("");
	const [searchBtnCursor, setSearchBtnCursor] = useState("");
    const [cityName,setCityName] = useState(Router.query.cityName);
	const [loading, setLoading] = useState(false);
	const [checkInDate, setCheckInDate] = useState(Router.query.checkin);
	const [checkOutDate, setCheckOutDate] = useState(Router.query.checkout);
	const [text,setText] = useState('');
	const [destinations, setDestinations] = useState([]);
	const [adultDropDownToogle,setAdultDropdownToogle] = useState(false);
	const [adultCount,setAdultsCount] = useState(parseInt(Router.query.adults));
	const [childCount,setChildCount] = useState(parseInt(Router.query.child));
	const [roomCount,setRoomCount] = useState(parseInt(Router.query.rooms));
	const [checkInOut,setCheckInOut] = useState([]);
	const [childAge, setChildAge] = useState(Router.query.childAge.split(","));
	const [searchType, setSearchType] = useState(Router.query.searchType);
	const [searchValue, setSearchValue] = useState(Router.query.searchValue);
	const [searchSource, setSearchSource] = useState(Router.query.searchSource);
	const [roomInputPlaceHolder,setRoomInputPlaceHolder] = useState(adultCount+" Adults, "+roomCount+" Room");
	const [open, setOpen] = useState(false);
	const [datepickerArray,setDatepickerArray] = useState([]);
	const [isOpen, setIsOpen] = useState(false);
	const [datepickerCount, setDatePickerCount] = useState(0);
	const [autocompleteLoading, setAutoCompleteLoading] = useState(false);
	const handleAdultDropdown = () => {
		setAdultDropdownToogle(true);
	}
	const handleChange = (event, newValue) => {
		setValue(newValue);
	};


	const handleSearchHotel = () => {
		let params = {'cityName':text,'checkin':checkInDate,'checkout':checkOutDate,'searchSource':searchSource,'searchType':searchType,'searchValue':searchValue,'rooms':roomCount,'adults':adultCount,'child':childCount,'childAge':childAge};
		searchHotel(params);
	}

	async function searchHotel(params){
		console.log(params);
		/*localStorage.removeItem('cityName');
		localStorage.removeItem('traceId');
		localStorage.removeItem('searchParams');
		localStorage.setItem('cityName',params.cityName);
		Router.push(`${baseStoreURL}/hotels/hotel-listing/?checkin=${params.checkin}&checkout=${params.checkout}&cityName=${params.cityName}&searchSource=${params.searchSource}&searchType=${params.searchType}&searchValue=${params.searchValue}&rooms=${params.rooms}&adults=${params.adults}&child=${params.child}&childAge=${params.childAge}`);
		//Router.reload();
		setTimeout(function(){location.reload()},500);*/
	}

	const onTextChanged = (e) => {
		if(e!=null && e!=undefined && e!=''){
			if(e.target!=null && e.target!=undefined && e.target!=''){
				if(e.target.value!=null && e.target.value!=undefined && e.target.value!=''){
					const lowercasedValue = e.target.value.toLowerCase().trim();
					if(e.target.value.length>2){
						setAutoCompleteLoading(true);
						fetchDestinations(lowercasedValue);
					}
					setText(e.target.value);	
					dispatch(clearHotelBooking());	
					dispatch(getHotelBooking());		
					setSearchBtnCursor("");
					setSearchBtnDisable("");
				}
			}
		}
	}

	async function fetchDestinations(text){
		setLoading(true);
		let params = {'keyword':text};
		const responseData = await HotelRepository.searchKeyword(params);
		if(responseData.success){
			setDestinations(responseData.data.destinations);
		}
		setAutoCompleteLoading(false);
		setLoading(false);
	}



	const disableAdultDropdown = () => {
		if(adultDropDownToogle){
			setAdultDropdownToogle(false);			
		}
	}

	const handleChildAge = (e) => {
		let child = childCount;
		let childAgeOutput = [];
		let temp = childAge;
		if(temp!='' && temp!=undefined && temp!=null){
			if(temp.length>0){
				if(temp.length==1){
					childAgeOutput.push(temp);
				}else{
					childAgeOutput = temp;
				}
			}else{
				childAgeOutput = temp.split(",");
			}
		}
		if(child>0){
			if(e.target.value!=''){
				childAgeOutput.push(e.target.value);
			}
		}	
		let childAgeString = childAgeOutput.join(",");	
		setChildAge(childAgeString);
		dispatch(clearHotelBooking());	
		setSearchBtnCursor("");
		setSearchBtnDisable("");
	}

	const clearSearchFilter = () => {
		setText('');
		setDestinations([]);
		//setAdultDropdownToogle(false);
	}	

	const handleAdultsIncreaseCount = () => {
		let adultCounting = adultCount;
		adultCounting = adultCounting + 1;
		setAdultsCount(adultCounting);
		let roomInput = "";
		if(adultCounting>0 && adultCounting==1){
			roomInput += adultCounting+" Adult";
		}else if(adultCounting>1){
			roomInput += adultCounting+" Adults";
		}
		if(childCount>0 && childCount==1){
			roomInput += ", "+childCount+ " Child";
		}else if(childCount>1){
			roomInput += ", "+childCount+ " Children";
		}
		if(roomCount>0 && roomCount==1){
			roomInput += ", "+roomCount+ " Room";
		}else if(roomCount>1){
			roomInput += ", "+roomCount+ " Rooms";
		}
		setRoomInputPlaceHolder(roomInput);
		dispatch(clearHotelBooking());	
		setSearchBtnCursor("");
		setSearchBtnDisable("");
	}

	const handleAdultsDecreaseCount = () => {
		let adultCounting = adultCount;
		if(adultCounting>1){
			adultCounting = adultCounting - 1;
			setAdultsCount(adultCounting);
			let roomInput = "";
			if(adultCounting>0 && adultCounting==1){
				roomInput += adultCounting+" Adult";
			}else if(adultCounting>1){
				roomInput += adultCounting+" Adults";
			}
			if(childCount>0 && childCount==1){
				roomInput += ", "+childCount+ " Child";
			}else if(childCount>1){
				roomInput += ", "+childCount+ " Children";
			}
			if(roomCount>0 && roomCount==1){
				roomInput += ", "+roomCount+ " Room";
			}else if(roomCount>1){
				roomInput += ", "+roomCount+ " Rooms";
			}
			setRoomInputPlaceHolder(roomInput);
			dispatch(clearHotelBooking());	
			setSearchBtnCursor("");
			setSearchBtnDisable("");
		}
	}

	const handleChildIncreaseCount = () => {
		let childCounting = childCount;
		childCounting = childCounting + 1;
		setChildCount(childCounting);
		let roomInput = "";
		if(adultCount>0 && adultCount==1){
			roomInput += adultCount+" Adult";
		}else if(adultCount>1){
			roomInput += adultCount+" Adults";
		}
		if(childCounting>0 && childCounting==1){
			roomInput += ", "+childCounting+ " Child";
		}else if(childCounting>1){
			roomInput += ", "+childCounting+ " Children";
		}
		if(roomCount>0 && roomCount==1){
			roomInput += ", "+roomCount+ " Room";
		}else if(roomCount>1){
			roomInput += ", "+roomCount+ " Rooms";
		}
		setRoomInputPlaceHolder(roomInput);
		setSearchBtnCursor("");
		setSearchBtnDisable("");
	}

	const handleChildDecreaseCount = () => {
		let childCounting = childCount;
		if(childCounting>=1){
			if(childCounting>0){
				let temp = childAge;
				if(temp!='' && temp!=undefined && temp!=null){
					let childAgeOutput = [];
					if(temp.length>0){
						if(temp.length==1){
							childAgeOutput.push(temp);
						}else{
							childAgeOutput = temp;
						}
						if(childAgeOutput.length>0){
							childAgeOutput.pop();
						}
					}else{
						childAgeOutput = temp.split(",");
						if(childAgeOutput.length>0){
							childAgeOutput.pop();
						}
					}					
					let childAgeString = childAgeOutput.join(",");	
					setChildAge(childAgeString);
				}
			}else{
				setChildAge("");
			}
			childCounting = childCounting - 1;		
			setChildCount(childCounting);
			let roomInput = "";
			if(adultCount>0 && adultCount==1){
				roomInput += adultCount+" Adult";
			}else if(adultCount>1){
				roomInput += adultCount+" Adults";
			}
			if(childCounting>0 && childCounting==1){
				roomInput += ", "+childCounting+ " Child";
			}else if(childCounting>1){
				roomInput += ", "+childCounting+ " Children";
			}
			if(roomCount>0 && roomCount==1){
				roomInput += ", "+roomCount+ " Room";
			}else if(roomCount>1){
				roomInput += ", "+roomCount+ " Rooms";
			}
			setRoomInputPlaceHolder(roomInput);
			dispatch(clearHotelBooking());	
			setSearchBtnCursor("");
			setSearchBtnDisable("");
		}
	}

	const handleRoomIncreaseCount = () => {
		let roomCounting = roomCount;
		roomCounting = roomCounting + 1;
		setRoomCount(roomCounting);
		let roomInput = "";
		if(adultCount>0 && adultCount==1){
			roomInput += adultCount+" Adult";
		}else if(adultCount>1){
			roomInput += adultCount+" Adults";
		}
		if(childCount>0 && childCount==1){
			roomInput += ", "+childCount+ " Child";
		}else if(childCount>1){
			roomInput += ", "+childCount+ " Children";
		}
		if(roomCounting>0 && roomCounting==1){
			roomInput += ", "+roomCounting+ " Room";
		}else if(roomCounting>1){
			roomInput += ", "+roomCounting+ " Rooms";
		}
		setRoomInputPlaceHolder(roomInput);
		setSearchBtnCursor("");
		setSearchBtnDisable("");
	}

	const handleRoomDecreaseCount = () => {
		let roomCounting = roomCount;
		if(roomCounting>1){
			roomCounting = roomCounting - 1;
			setRoomCount(roomCounting);
			let roomInput = "";
			if(adultCount>0 && adultCount==1){
				roomInput += adultCount+" Adult";
			}else if(adultCount>1){
				roomInput += adultCount+" Adults";
			}
			if(childCount>0 && childCount==1){
				roomInput += ", "+childCount+ " Child";
			}else if(childCount>1){
				roomInput += ", "+childCount+ " Children";
			}
			if(roomCounting>0 && roomCounting==1){
				roomInput += ", "+roomCounting+ " Room";
			}else if(roomCounting>1){
				roomInput += ", "+roomCounting+ " Rooms";
			}
			setRoomInputPlaceHolder(roomInput);
			setSearchBtnCursor("");
			setSearchBtnDisable("");
		}
	}


	const handleDatePicker = (e) => {
		setDatePickerCount(0);
		setDatepickerArray([]);
		setIsOpen(!isOpen);		
		dispatch(clearHotelBooking());	
		setSearchBtnCursor("");
		setSearchBtnDisable("");
	}

	const handleRangeDatePicker = (value) => {
		let temp = new Array();
		let previouseValue = datepickerArray;
		if(previouseValue.length==1){
			for(let i=0;i<previouseValue.length;i++){
				temp.push(previouseValue[i]);
			}
			temp.push(value);
			let checkIn = temp[0];
			let checkOut = temp[1];
			console.log(temp);
			if(new Date(checkIn)< new Date(checkOut)){			
				setCheckInOut(temp);
			}else{
				let newTemp = new Array();
				newTemp.push(temp[1]);
				newTemp.push(temp[0]);
				console.log(newTemp);
				setCheckInOut(newTemp);
			}
			handleCheckInOut(temp);
		}else if(previouseValue.length==0){
			temp.push(value);
		}
		if(temp.length>0){		
			setDatepickerArray(temp);
		}
		let totalCount = datepickerCount;
		let count = parseInt(totalCount);
		count++;
		setDatePickerCount(count);
		if(count==1){
			let checkIn = value;
			let checkIndDate = new Date(checkIn);
			let checkInDateString = checkIndDate.toLocaleDateString("en-US", { // you can use undefined as first argument
				year: "numeric",
				month: "2-digit",
				day: "2-digit",
			});
			setCheckInDate(checkInDateString);			
		}
		if(count==2){
			let checkOut = value;
			let checkOutdDate = new Date(checkOut);
			let checkOutDateString = checkOutdDate.toLocaleDateString("en-US", { // you can use undefined as first argument
				year: "numeric",
				month: "2-digit",
				day: "2-digit",
			});
			setCheckOutDate(checkOutDateString);
			setIsOpen(!isOpen);
		}
	}

	const handleCheckInOut = (value) => {
		setCheckInOut(value);
		let checkIn = "";
		let checkOut = "";
		if(value.length>0){
			checkIn = value[0];
			checkOut = value[1];
		}
		let checkIndDate = new Date(checkIn);
		let checkInDateString = checkIndDate.toLocaleDateString("en-US", { // you can use undefined as first argument
			year: "numeric",
			month: "2-digit",
			day: "2-digit",
		});
		setCheckInDate(checkInDateString);
		let checkOutdDate = new Date(checkOut);
		let checkOutDateString = checkOutdDate.toLocaleDateString("en-US", { // you can use undefined as first argument
			year: "numeric",
			month: "2-digit",
			day: "2-digit",
		});
		setCheckOutDate(checkOutDateString);
	}

	const handleInputChange = (event, value) => {
		if(value!=null && value!=undefined && value!=''){			
			setSearchType(value.searchType);
			setText(value.label);
			setSearchValue(value.id);
			setSearchSource(value.source);
		}
	};

    useEffect(() => {
        let mounted = true;
        let city = Router.query.cityName;
        try{
			if(city==''){
            	city = localStorage.getItem('cityName');
			}
        }catch(e){
            city = "";
        }
        setCityName(city);
		setText(city);
		let checkInOutArray  = new Array();
		let checkInCompleteDate = new Date(checkOutDate);
		let checkoutCompleteDate = new Date(checkInDate);
		checkInOutArray.push(checkInCompleteDate);
		checkInOutArray.push(checkoutCompleteDate);
		setCheckInOut(checkInOutArray);
        return () => mounted = false;
    }, []);

    return (
        <div className="hsearchCover" id="search-fixed">
			<div className="container">
				<div className="row searchHd">
					<div className="col-md-12">
						<h1><img src={`${baseStoreURL}/images/hotel-icon.png`} alt="hotel-icon.png" className="hsIcons" /> Hotel</h1>
					</div>
				</div>
				<div className="row hbanner">
					<div className="col-md-12">
						<section id="content1" className="tab-content borderRadiComman hotelSearch hsmobile">
							<a href="javascript:;" className="hsclose">X</a>
							<div className="row">
								<div className="col-md-6">
									<div className="w-full mb-3">
									<Autocomplete
										freeSolo
										id="combo-box-demo"
										placeholder="Where To?"
										options={destinations}
										value={text}
										onChange={handleInputChange}
										onInputChange={onTextChanged}
										className="border-0 rounded w-full searchIcon hFormIcon"
										loading={autocompleteLoading}
										endDecorator={
											autocompleteLoading ? (
											  <CircularProgress size="sm" sx={{ bgcolor: 'background.surface' }} />
											) : null
										}
										renderOption={(props, option, { inputValue }) => {
											const matches = match(option.label, inputValue);
											const parts = parse(option.label, matches);
								  
											return (
											  <AutocompleteOption {...props}>
												<Typography level="inherit">
												  {option.label === inputValue
													? option.label
													: parts.map((part, index) => (
														<Typography
														  key={index}
														  {...(part.highlight && {
															variant: 'soft',
															color: 'primary',
															fontWeight: 'lg',
															px: '2px',
														  })}
														>
														  {part.text}
														</Typography>
													  ))}
												</Typography>
											  </AutocompleteOption>
											);
										}}
									/>
									</div>
								</div>
								<div className="col-md-3">
									<div className="">
										<DateRangePicker placeholder="Check-In & Check-Out" open={isOpen} onOpen={(e) => handleDatePicker(e)} onSelect={(e) => handleRangeDatePicker(e)} onChange={(e) => handleCheckInOut(e)} value={[new Date(checkInDate),new Date(checkOutDate)]}  name="checkinout" className="border-0 rounded w-full calenderIcon hFormIcon" format="MM/dd/yyyy" character=" – " shouldDisableDate={combine(allowedMaxDays(7), beforeToday())}/>
									</div>
								</div>
								<div className="col-md-3">
									<div className="">
										<input placeholder={roomInputPlaceHolder} readonly={true} onClick={handleAdultDropdown} className="border-0 rounded w-full adultsIcon hFormIcon"	type="text"/>
										<div className="acdropdownCover" style={{display: adultDropDownToogle? "block" : "none"}}>
											<div className="addLine">
												<span className="addLineTitle">Rooms</span> 
												<div className="addCount">
													<a href="javascript:void(0);" onClick={handleRoomDecreaseCount}><FontAwesomeIcon icon={faMinus} /></a>
													<input placeholder="1" value={roomCount} readonly={true} name="rooms" className="border-0 rounded" type="text"/>
													<a href="javascript:void(0);" onClick={handleRoomIncreaseCount}><FontAwesomeIcon icon={faPlus} /></a>
												</div>
											</div>
											<div className="addLine">
												<span className="addLineTitle">Adults</span> 
												<div className="addCount">
													<a href="javascript:void(0);" onClick={handleAdultsDecreaseCount}><FontAwesomeIcon icon={faMinus} /></a>
													<input placeholder="1" value={adultCount} readonly={true} name="adults" className="border-0 rounded"	type="text"/>
													<a href="javascript:void(0);" onClick={handleAdultsIncreaseCount}><FontAwesomeIcon icon={faPlus} /></a>
												</div>
											</div>
											<div className="addLine">
												<span className="addLineTitle">Child</span> 
												<div className="addCount">
													<a href="javascript:void(0);" onClick={handleChildDecreaseCount}><FontAwesomeIcon icon={faMinus} /></a>
													<input placeholder="1" value={childCount} readonly={true} name="child" className="border-0 rounded"	type="text"/>
													<a href="javascript:void(0);" onClick={handleChildIncreaseCount}><FontAwesomeIcon icon={faPlus} /></a>
												</div>
											</div>

											<div className="childAgeDropdowns">
											{Array.from(Array(childCount)).map((item, idx) => (
												<div key={idx}><select name="childAge[]" defaultValue={childAge[idx]} id={`child-age-${idx}`} className="child-age-dropdown" onChange={handleChildAge} required={true}><option value="">Add Child {idx+1}</option><option value="0">Infant</option><option value="1">1 Year Old</option><option value="2">2 yrs</option><option value="3">3 yrs</option><option value="4">4 yrs</option><option value="5">5 yrs</option><option value="6">6 yrs</option><option value="7">7 yrs</option><option value="8">8 yrs</option><option value="9">9 yrs</option><option value="10">10 yrs</option><option value="11">11 yrs</option><option value="12">12 yrs</option><option value="13">13 yrs</option><option value="14">14 yrs</option><option value="15">15 yrs</option><option value="16">16 yrs</option><option value="17">17 yrs</option></select></div>
											))}
											</div>
											<div className="addLine"><button type="button" className="rounded-md findBtn right" onClick={disableAdultDropdown}>Apply</button></div>
										</div>
									</div>
								</div>
							</div>
							
							<div className="w-full mt-2 mb-0 flex justify-content-center">
								<a href={`${baseStoreURL}/hotels/hotel-listing/?checkin=${checkInDate}&checkout=${checkOutDate}&searchType=${searchType}&searchValue=${searchValue}&searchSource=${searchSource}&cityName=${text}&rooms=${roomCount}&adults=${adultCount}&child=${childCount}&childAge=${childAge}`} className="rounded-md findBtn" style={{pointerEvents:searchBtnDisable,cursor:searchBtnCursor}}>Update Search</a>
							</div>
						</section>
					</div>
				</div>
			</div>
		</div>
    );
}

export default connect((state) => state)(HotelModifySearch);