import React, {useState,useEffect} from 'react';
import Skeleton from '@mui/material/Skeleton';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
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
import HotelRepository from '@/repositories/HotelRepository';

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
	const [value, setValue] = React.useState(0);
	const [loading, setLoading] = useState(false);
	const [text,setText] = useState('');
	const [destinations, setDestinations] = useState([]);
	const [adultDropDownToogle,setAdultDropdownToogle] = useState(false);
	const [adultCount,setAdultsCount] = useState(2);
	const [childCount,setChildCount] = useState(0);
	const [roomCount,setRoomCount] = useState(1);
	const [checkInOut,setCheckInOut] = useState([]);
	const [errorMessage, setErrorMessage] = useState(null);
	const [successMessage, setSuccessMessage] = useState(null);
	const [roomInputPlaceHolder,setRoomInputPlaceHolder] = useState(adultCount+" Adults, "+roomCount+" Room");
	const handleAdultDropdown = () => {
		setAdultDropdownToogle(true);
	}
	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	const onTextChanged = (e) => {
		const lowercasedValue = e.target.value.toLowerCase().trim();
		if(e.target.value.length>2){
			fetchDestinations(lowercasedValue);
		}
		setText(e.target.value);
	}

	async function fetchDestinations(text){
		setLoading(true);
		const response = await fetch('/api/search-destinations',{
			method: 'POST',
			body: JSON.stringify({ 'destination':text })
		});
		const data = await response.json();
		setDestinations(data);
		setLoading(false);
	}


	/*async function searchHotel(params){
		setLoading(true);
		const response = await fetch('/api/search-hotel',{
			method: 'POST',
			body: JSON.stringify({'destination':params.city_name,'rooms':params.rooms,'adults':params.adults,'child':params.child,'childAge':params.childAge,'checkInDate':params.checkInDate,'checkOutDate':params.checkOutDate})
		});
		const data = await response.json();
		console.log(data);
		setLoading(false);
	}*/

	async function searchHotel(params){
		setLoading(true);
		let body = {'destination':params.city_name,'rooms':params.rooms,'adults':params.adults,'child':params.child,'childAge':params.childAge,'checkInDate':params.checkInDate,'checkOutDate':params.checkOutDate};
		const responseData = await HotelRepository.searchHotel(body);
		console.log(responseData);
	}

	const disableAdultDropdown = () => {
		if(adultDropDownToogle){
			setAdultDropdownToogle(false);
		}
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
	}

	const handleChildDecreaseCount = () => {
		let childCounting = childCount;
		if(childCounting>=1){
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
		}
	}

	const handleHotelSearchForm = (e) => {
		e.preventDefault();
		setErrorMessage('');
		
		var city_name = e.target.elements['city_name'].value;
		if(city_name=='' || city_name==null || city_name==undefined){
			setErrorMessage('Please choose Where To');
			return false;
		}	
		let checkIn = "";
		let checkOut = "";
		if(checkInOut.length>0){
			checkIn = checkInOut[0];
			checkOut = checkInOut[1];
		}
		if(checkIn=='' || checkIn==null || checkIn==undefined){
			setErrorMessage("Please select Check-In Date");
			return false;
		}
		if(checkOut=='' || checkOut==null || checkOut==undefined){
			setErrorMessage("Please select Check-Out Date");
			return false;
		}
		
		let rooms = roomCount;
		if(rooms=='' || rooms==undefined || rooms==null){
			setErrorMessage("Please choose Rooms");
			return false;
		}

		let adults = adultCount;
		if(adults=='' || adults==undefined || adults==null){
			setErrorMessage("Please choose Adults");
			return false;
		}

		let child = childCount;
		let childAgeOutput = [];
		if(child>0){
			for(var k=0;k<child;k++){
				let index = 'child-age-'+k;
				childAgeOutput.push(e.target.elements[index].value);
			}
		}
		let params = new Array();
		params['city_name'] = city_name;
		params['rooms'] = rooms;
		params['adults'] = adults;
		params['child'] = child;
		params['childAge'] = childAgeOutput;
		params['checkInDate'] = checkIn;
		params['checkOutDate'] = checkOut;
		searchHotel(params);
	}

	const handleCheckInOut = (value) => {
		//e.preventDefault();
		setCheckInOut(value);
	}

	return (
		<div className="hsearchCover" onClick={clearSearchFilter}>			
			<div className="container">
				<div className="row">
					<div className="col-md-12">
						<h1>Compare and Book Cheap Flights on Over 500 Airlines</h1>
					</div>
				</div>
				<div className="row hbanner">
					<div className="col-md-12">
						<Tabs value={value} className="tab_container tabBox" onChange={handleChange} aria-label="basic tabs example">
						  <Tab className="htabIcons htHotelIcon" label="Hotel" id="simple-tab-0" aria-controls="simple-tabpanel-0"/>
						  <Tab className="htabIcons htFlightIcon" label="Flight" id="simple-tab-1" aria-controls="simple-tabpanel-1"/>
						  <Tab className="htabIcons htfliHotelIcon" label="Hotel + Flight" id="simple-tab-2" aria-controls="simple-tabpanel-2"/>
						  <Tab className="htabIcons htCruiseIcon" label="Cruise" id="simple-tab-3" aria-controls="simple-tabpanel-3"/>
						  <Tab className="htabIcons htHotelPackIcon" label="Holiday Packages" id="simple-tab-4" aria-controls="simple-tabpanel-4"/>
						</Tabs>
						<CustomTabPanel value={value} index={0} className="tab-content borderRadiComman tabinn">
							<form onSubmit={handleHotelSearchForm}>
								<div className="w-full mb-3">
									<Autocomplete
										freeSolo
										id="combo-box-demo"
										options={destinations}
										renderInput={(params) => <TextField {...params} onChange={onTextChanged} defaultValue={text} value={text} name="city_name" id="city_name" className="border-0 rounded w-full searchIcon hFormIcon" placeholder="Where to?" />}
									/>
								</div>
								<div className="flex items-center gap-3 fildTwoCover">
									<div className="fildTwo">
										<DateRangePicker placeholder="Check-In & Check-Out" onChange={(e) => handleCheckInOut(e)} defaultValue={checkInOut} name="checkinout" className="border-0 rounded w-full calenderIcon hFormIcon" format="MM/dd/yyyy" character=" – " shouldDisableDate={combine(allowedMaxDays(7), beforeToday())}/>
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
												<div key={idx}><select name="childAge[]" id={`child-age-${idx}`} className="child-age-dropdown" required={true}><option value="">Add Child {idx+1}</option><option value="0">Infant</option><option value="1">1 Year Old</option><option value="2">2 yrs</option><option value="3">3 yrs</option><option value="4">4 yrs</option><option value="5">5 yrs</option><option value="6">6 yrs</option><option value="7">7 yrs</option><option value="8">8 yrs</option><option value="9">9 yrs</option><option value="10">10 yrs</option><option value="11">11 yrs</option><option value="12">12 yrs</option><option value="13">13 yrs</option><option value="14">14 yrs</option><option value="15">15 yrs</option><option value="16">16 yrs</option><option value="17">17 yrs</option></select></div>
											))}
											</div>
											<button type="button" className="rounded-md findBtn right" onClick={disableAdultDropdown}>Apply</button>
										</div>
									</div>
								</div>
								<div className="w-full mt-4 mb-0 flex justify-content-end">
									<button type="submit" name="submit" className="rounded-md findBtn">Find Your Hotel</button>
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