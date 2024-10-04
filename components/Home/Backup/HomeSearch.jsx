import React, {useState,useEffect} from 'react';
import Link from 'next/link';
import Skeleton from '@mui/material/Skeleton';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/joy/Autocomplete';
import Box from '@mui/material/Box';
import { DateRangePicker } from 'rsuite';
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
import { useRouter } from 'next/router';
import { baseStoreURL } from '@/repositories/Repository';
import parseHTML from 'html-react-parser';

function CustomTabPanel(props) {
  	const { children, value, index, ...other } = props;

  	return (
		<div
		role="tabpanel"
		hidden={value !== index}
		id={`simple-tabpanel-${index}`}
		aria-labelledby={`simple-tab-${index}`}
		{...other}
		>
		{value === index && (
			<Box sx={{ p: 3 }}>
			{children}
			</Box>
		)}
		</div>
  	);
}

function HomeSearch(){
	const Router = useRouter();
	const [searchBtnDisable,setSearchBtnDisable] = useState("none");
	const [searchBtnCursor, setSearchBtnCursor] = useState("default");
	const [value, setValue] = useState(0);
	const [loading, setLoading] = useState(false);
	const [text,setText] = useState('');
	const [destinations, setDestinations] = useState([]);
	const [adultDropDownToogle,setAdultDropdownToogle] = useState(false);
	const [adultCount,setAdultsCount] = useState(2);
	const [childCount,setChildCount] = useState(0);
	const [roomCount,setRoomCount] = useState(1);
	const [checkInOut,setCheckInOut] = useState([]);
	const [checkInDate, setCheckInDate] =  useState("");
	const [checkOutDate, setCheckOutDate] = useState("");
	const [childAge,setChildAge] = useState("");
	const [errorMessage, setErrorMessage] = useState(null);
	const [successMessage, setSuccessMessage] = useState(null);
	const [input, setInput] = useState(null);
	const [searchType,setSearchType] = useState(null);
	const [searchValue,setSearchValue] = useState(null);
	const [searchSource,setSearchSource] = useState(null);
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

	const onTextChanged = (e) => {
		try{
			localStorage.removeItem('cityName');
			localStorage.removeItem('traceId');
			localStorage.removeItem('searchParams');
		}catch(e){

		}
		if(e!=null && e!=undefined && e!=''){
			if(e.target!=null && e.target!=undefined && e.target!=''){
				if(e.target.value!=null && e.target.value!=undefined && e.target.value!=''){
					const lowercasedValue = e.target.value.toLowerCase().trim();
					if(e.target.value.length>2){
						setAutoCompleteLoading(true);
						fetchDestinations(lowercasedValue);
					}
					setText(e.target.value);
				}
			}
		}
	}

	async function fetchDestinations(text){		
		setLoading(true);
		let params = {'keyword':text};
		const responseData = await HotelRepository.searchKeyword(params);
		if(responseData.success){
			localStorage.removeItem('cityName');
			localStorage.removeItem('traceId');
			setDestinations(responseData.data.destinations);			
		}
		setAutoCompleteLoading(false);
		setLoading(false);
	}


	async function searchHotel(params){
		Router.push('/hotels/hotel-listing/?checkin='+params.checkInDate+'&checkout='+params.checkOutDate+'&searchType='+params.searchType+'&searchValue='+params.searchValue+'&adults='+params.adults+'&child='+params.child+'&childAge='+params.childAge);
		Router.push({pathname:'/hotels/hotel-listing',
			query: { checkin: params.checkInDate, checkout: params.checkOutDate, searchType: params.searchType, searchValue: params.searchValue, adults: params.adults, child: params.child, childAge: params.childAge }
		}, undefined,{locale:true});
	}

	const disableAdultDropdown = () => {
		if(adultDropDownToogle){
			setAdultDropdownToogle(false);	
			if(searchSource!='' && searchSource!=null && searchSource!=undefined && checkInDate!=null && checkInDate!=undefined && checkInDate!='' && checkOutDate!=null && checkOutDate!='' && searchType!='' && searchType!=null && searchType!=undefined){
				setSearchBtnCursor("");
				setSearchBtnDisable("");		
			}	
		}
	}

	const handleChildAge = (e) => {
		let child = childCount;
		let childAgeOutput = [];
		let temp = childAge;
		if(temp!=''){
			childAgeOutput = temp.split(",");
		}
		if(child>0){
			if(e.target.value!=''){
				childAgeOutput.push(e.target.value);
			}
		}	
		childAgeOutput = childAgeOutput.filter(function () { return true });		
		let childAgeString = childAgeOutput.join(",");
		setChildAge(childAgeString);
		if(searchSource!='' && searchSource!=null && searchSource!=undefined && checkInDate!=null && checkInDate!=undefined && checkInDate!='' && checkOutDate!=null && checkOutDate!='' && searchType!='' && searchType!=null && searchType!=undefined){
			setSearchBtnCursor("");
			setSearchBtnDisable("");		
		}
	}

	const clearSearchFilter = () => {
		setText('');
		setDestinations([]);
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
		if(searchSource!='' && searchSource!=null && searchSource!=undefined && checkInDate!=null && checkInDate!=undefined && checkInDate!='' && checkOutDate!=null && checkOutDate!='' && searchType!='' && searchType!=null && searchType!=undefined){
			setSearchBtnCursor("");
			setSearchBtnDisable("");		
		}
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
			if(searchSource!='' && searchSource!=null && searchSource!=undefined && checkInDate!=null && checkInDate!=undefined && checkInDate!='' && checkOutDate!=null && checkOutDate!='' && searchType!='' && searchType!=null && searchType!=undefined){
				setSearchBtnCursor("");
				setSearchBtnDisable("");		
			}
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
		if(searchSource!='' && searchSource!=null && searchSource!=undefined && checkInDate!=null && checkInDate!=undefined && checkInDate!='' && checkOutDate!=null && checkOutDate!='' && searchType!='' && searchType!=null && searchType!=undefined){
			setSearchBtnCursor("");
			setSearchBtnDisable("");		
		}
	}

	const handleChildDecreaseCount = () => {
		let childCounting = childCount;
		if(childCounting>=1){						
			if(childCounting>0){
				let temp = childAge;
				if(temp!=''){
					let childAgeOutput = temp.split(",");
					childAgeOutput.pop();
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
			if(searchSource!='' && searchSource!=null && searchSource!=undefined && checkInDate!=null && checkInDate!=undefined && checkInDate!='' && checkOutDate!=null && checkOutDate!='' && searchType!='' && searchType!=null && searchType!=undefined){
				setSearchBtnCursor("");
				setSearchBtnDisable("");		
			}
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
		if(searchSource!='' && searchSource!=null && searchSource!=undefined && checkInDate!=null && checkInDate!=undefined && checkInDate!='' && checkOutDate!=null && checkOutDate!='' && searchType!='' && searchType!=null && searchType!=undefined){
			setSearchBtnCursor("");
			setSearchBtnDisable("");		
		}
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
			if(searchSource!='' && searchSource!=null && searchSource!=undefined && checkInDate!=null && checkInDate!=undefined && checkInDate!='' && checkOutDate!=null && checkOutDate!='' && searchType!='' && searchType!=null && searchType!=undefined){
				setSearchBtnCursor("");
				setSearchBtnDisable("");		
			}
		}
	}

	const handleDatePicker = (e) => {
		setDatePickerCount(0);
		setDatepickerArray([]);
		setIsOpen(!isOpen);
		if(searchSource!='' && searchSource!=null && searchSource!=undefined && checkInDate!=null && checkInDate!=undefined && checkInDate!='' && checkOutDate!=null && checkOutDate!='' && searchType!='' && searchType!=null && searchType!=undefined){
			setSearchBtnCursor("");
			setSearchBtnDisable("");
		}
	}

	const handleRangeDatePicker = (value) => {
		let temp = new Array();
		let previouseValue = datepickerArray;
		if(previouseValue.length==1){
			for(let i=0;i<previouseValue.length;i++){
				temp.push(previouseValue[i]);
			}
			temp.push(value);
			setCheckInOut(temp);
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
			setAdultDropdownToogle(true);	
			if(searchSource!='' && searchSource!=null && searchSource!=undefined && checkInDate!=null && checkInDate!=undefined && checkInDate!='' && checkOutDate!=null && checkOutDate!='' && searchType!='' && searchType!=null && searchType!=undefined){
				setSearchBtnCursor("");
				setSearchBtnDisable("");		
			}
		}
	}

	const handleCheckInOut = (value) => {
		//e.preventDefault();	
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
			localStorage.setItem('cityName',value.label);
			setSearchValue(value.id);
			setSearchSource(value.source);
			if(searchSource!='' && searchSource!=null && searchSource!=undefined && checkInDate!=null && checkInDate!=undefined && checkInDate!='' && checkOutDate!=null && checkOutDate!='' && searchType!='' && searchType!=null && searchType!=undefined){
				setSearchBtnCursor("");
				setSearchBtnDisable("");		
			}
		}
	};

	return (
		<div className="hsearchCover">			
			<div className="container">
				<div className="row">
					<div className="col-md-12">
						<h1>Compare and Book Cheap Flights on Over 500 Airlines</h1>
					</div>
				</div>
				<div className="row hbanner">
					<div className="col-md-12">
					<div class="hServIcons">
							<div className="hServIconsBox">
								<a href={`${baseStoreURL}/hotel-search`}><img src={`${baseStoreURL}/images/hotel-mobile-icon.png`} alt="hotel-mobile-icon.png" className="img-fluid" />
								<span>Hotel</span></a>
							</div>
							<div className="hServIconsBox">
								<img src={`${baseStoreURL}/images/flight-mobile-icon.png`} alt="flight-mobile-icon.png" className="img-fluid" />
								<span>Flight</span>
							</div>
							<div className="hServIconsBox">
								<img src={`${baseStoreURL}/images/cruise-mobile-icon.png`} alt="cruise-mobile-icon.png" className="img-fluid" />
								<span>Cruise</span>
							</div>
							<div className="hServIconsBox">
								<img src={`${baseStoreURL}/images/holiday-packages-mobile-icon.png`} alt="holiday-packages-mobile-icon.png" className="img-fluid" />
								<span>Holiday Packages</span>
							</div>
						</div>
						<Tabs value={value} defaultValue={value} className="tab_container tabBox" onChange={handleChange} aria-label="basic tabs example">
						  <Tab className="htabIcons htHotelIcon" label="Hotel" id="simple-tab-0" aria-controls="simple-tabpanel-0"/>
						  <Tab className="htabIcons htFlightIcon" label={`Flight`} id="simple-tab-1" aria-controls="simple-tabpanel-1"/>
						  <Tab className="htabIcons htfliHotelIcon" label="Hotel + Flight" id="simple-tab-2" aria-controls="simple-tabpanel-2"/>
						  <Tab className="htabIcons htCruiseIcon" label="Cruise" id="simple-tab-3" aria-controls="simple-tabpanel-3"/>
						  <Tab className="htabIcons htHotelPackIcon" label="Holiday Packages" id="simple-tab-4" aria-controls="simple-tabpanel-4"/>
						</Tabs>
						<CustomTabPanel value={value} index={0} className="tab-content borderRadiComman tabinn">
							<form>
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
								<div className="flex items-center gap-3 fildTwoCover">
									<div className="fildTwo">
										<DateRangePicker placeholder="Check-In & Check-Out" onOpen={(e) => handleDatePicker(e)} onSelect={(e) => handleRangeDatePicker(e)} onChange={(e) => handleCheckInOut(e)} value={checkInOut} defaultValue={checkInOut} name="checkinout" className="border-0 rounded w-full calenderIcon hFormIcon" open={isOpen} format="MM/dd/yyyy" character=" – " shouldDisableDate={combine(allowedMaxDays(7), beforeToday())}/>
									</div>
									<div className="fildTwo">
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
												<div key={idx}><select name="childAge[]" id={`child-age-${idx}`} className="child-age-dropdown" onChange={handleChildAge} required={true}><option value="">Add Child {idx+1}</option><option value="0">Infant</option><option value="1">1 Year Old</option><option value="2">2 yrs</option><option value="3">3 yrs</option><option value="4">4 yrs</option><option value="5">5 yrs</option><option value="6">6 yrs</option><option value="7">7 yrs</option><option value="8">8 yrs</option><option value="9">9 yrs</option><option value="10">10 yrs</option><option value="11">11 yrs</option><option value="12">12 yrs</option><option value="13">13 yrs</option><option value="14">14 yrs</option><option value="15">15 yrs</option><option value="16">16 yrs</option><option value="17">17 yrs</option></select></div>
											))}
											</div>
											<div className="addLine"><button type="button" className="rounded-md findBtn right" onClick={disableAdultDropdown}>Apply</button></div>
										</div>
									</div>
								</div>
								<div className="w-full mt-4 mb-0 flex justify-content-end">
									<Link target="_blank" href={`${baseStoreURL}/hotels/hotel-listing/?checkin=${checkInDate}&checkout=${checkOutDate}&searchType=${searchType}&searchValue=${searchValue}&searchSource=${searchSource}&cityName=${text}&rooms=${roomCount}&adults=${adultCount}&child=${childCount}&childAge=${childAge}`} className="rounded-md findBtn" style={{pointerEvents:searchBtnDisable,cursor:searchBtnCursor}}>Find Your Hotel</Link>
								</div>
							</form>	
						</CustomTabPanel>
						<CustomTabPanel value={value} index={1} className="tab-content borderRadiComman tabinn">	
							<div className="flex items-center gap-3 fildTwoCover">
								<div className="fildTwo">
									<input placeholder="From" className="border-0 rounded w-full searchIcon hFormIcon" type="text"/>
								</div>
								<div className="fildTwo">
									<input placeholder="To" className="border-0 rounded w-full searchIcon hFormIcon" type="text"/>
								</div>
							</div>
							<div className="w-full mb-3 mt-3">
								<DatePicker oneTap placeholder="Departure" className="border-0 rounded w-full calenderIcon hFormIcon" format="MM/dd/yyyy" character=" – " shouldDisableDate={combine(allowedMaxDays(7), beforeToday())}/>
							</div>
							<div className="w-full mt-4 mb-0 flex justify-content-end">
								<a href="" className="rounded-md findBtn">Search</a>
							</div>
						</CustomTabPanel>
					</div>
				</div>
			</div>
		</div>
	);
}

export default HomeSearch;