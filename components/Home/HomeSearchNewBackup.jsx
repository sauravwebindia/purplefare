import React, {useState,useEffect,Fragment} from 'react';
import Skeleton from '@mui/material/Skeleton';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import { DateRangePicker } from 'rsuite';
import { DatePicker } from 'rsuite';
import { useRouter } from 'next/router';
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
	const Router = useRouter();
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
	const [searchPanelOpen, setSearchPanelOpen] = useState(false);
    const [isSearchBoxOpen, setSearchBoxOpen] = useState(false);
	const [openScroll, setOpenScroll] = useState(false);
	const [searchOpen, setSearchOpen] = useState(false);
    const [bgOpen, setBgOpen] = useState(false);
	const [recentSearches, setRecentSearches] = useState([]);
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
		}else{
			setSearchBoxOpen(false);
            setSearchPanelOpen(false);
            setOpenScroll(false);
		}
		setText(e.target.value);
	}

	async function fetchDestinationsNew(text){
		setLoading(true);
		let params = {'keyword':text};
		const responseData = await HotelRepository.searchKeyword(params);
		if(responseData.success){
			const data = responseData.data.destinations;
			setDestinations(data);
			setSearchBoxOpen(true);
			setSearchOpen(true);
            setSearchPanelOpen(true);
            setOpenScroll(true);
		}
		setLoading(false);
	}

	async function fetchDestinations(text){
		setLoading(true);
		const response = await fetch('/api/fetch-destinations',{
			method: 'POST',
			body: JSON.stringify({ 'destination':text })
		});
		const data = await response.json();
		setDestinations(data);
		setSearchBoxOpen(true);
		setSearchOpen(true);
		setSearchPanelOpen(true);
		setOpenScroll(true);
		setLoading(false);
	}

	async function searchHotel(params){
		Router.push('/hotels/hotel-listing/?checkin='+params.checkInDate+'&checkout='+params.checkOutDate+'&searchType=city&searchValue='+params.city_name+'&adults='+params.adults+'&child='+params.child+'&childAge='+params.childAge);
	}

	const disableAdultDropdown = () => {
		if(adultDropDownToogle){
			setAdultDropdownToogle(false);
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
		let checkIndDate = new Date(checkIn);
		let checkInDateString = checkIndDate.toLocaleDateString("en-US", { // you can use undefined as first argument
			year: "numeric",
			month: "2-digit",
			day: "2-digit",
		});
		let checkOutdDate = new Date(checkOut);
		let checkOutDateString = checkOutdDate.toLocaleDateString("en-US", { // you can use undefined as first argument
			year: "numeric",
			month: "2-digit",
			day: "2-digit",
		});
		params['city_name'] = city_name;
		params['rooms'] = rooms;
		params['adults'] = adults;
		params['child'] = child;
		params['childAge'] = childAgeOutput;
		params['checkInDate'] = checkInDateString;
		params['checkOutDate'] = checkOutDateString;
		searchHotel(params);
	}

	const handleCheckInOut = (value) => {
		//e.preventDefault();
		setCheckInOut(value);
	}

	const handleBg = () => {
        setSearchOpen(false);
        setBgOpen(false);
    };

	const removeAllSearch = () => {
        localStorage.removeItem('recent-searches');
        setRecentSearches([]);
        setSearchBoxOpen(true);
        setSearchPanelOpen(false);
    };

	const getHighlightedText = (item, text) => {
        if (text !== '' && text !== undefined && text !== null) {
            const parts = item.split(new RegExp(`(${text})`, 'gi'));
            return (
                <span>
                    {' '}
                    {parts.map((part, i) => (
                        <span
                            key={i}
                            style={
                                part.toLowerCase() === text.toLowerCase()
                                    ? { fontWeight: 'normal' }
                                    : {}
                            }>
                            {part}
                        </span>
                    ))}{' '}
                </span>
            );
        } else {
        }
    };

	const removeRecentSearchItem = (value) => {
        try {
            let newArray = new Array();
            if (recentSearches.length > 0) {
                var recentSearch = localStorage.getItem('recent-searches');
                if (recentSearch != '' &&  recentSearch != null && recentSearch != undefined) {
                    newArray = JSON.parse(recentSearch);
                    let storageindex = newArray.indexOf(value);
                    if (storageindex !== -1) {
                        newArray.splice(storageindex, 1);
                    }

                    localStorage.setItem(
                        'recent-searches',
                        JSON.stringify(newArray)
                    );
                    setRecentSearches(newArray);
                }
            }
        } catch (e) {
            //console.log(e);
        }
    };

	const handleRecentSearches = () => {		
        setBgOpen(true);
        setSearchPanelOpen(false);
        setSearchBoxOpen(false);
        setOpenScroll(true);
        if (recentSearches != null && recentSearches != undefined && recentSearches != '') {
            if (recentSearches.length > 0) {
				setSearchOpen(true);
                setSearchBoxOpen(true);
                setSearchPanelOpen(false);
            } else {
                setSearchBoxOpen(false);
				setSearchOpen(false);
            }
        } else if (recentSearches == null && recentSearches == undefined && recentSearches != '') {
            setSearchBoxOpen(false);
        }
    };

	const destinationSelected = (value) => {
		setText(value);
        setDestinations([]);
        handleDestinationSearch(value);
        setSearchPanelOpen(false);
		setSearchOpen(false);
		setOpenScroll(false);
    };

	const handleDestinationSearch = (text) => {
        if (text != '' && text != null && text != undefined) {
			console.log('welcome');
			console.log(text);
            let searchKeywordsArray = [];
            if (
                recentSearches != undefined &&
                recentSearches != null &&
                recentSearches != ''
            ) {
                searchKeywordsArray = recentSearches;
            }
            if (!searchKeywordsArray.includes(text)) {
                searchKeywordsArray.push(text);
            }

            if (searchKeywordsArray.length > 0) {
                localStorage.setItem(
                    'recent-searches',
                    JSON.stringify(searchKeywordsArray)
                );
                setDestinations(searchKeywordsArray);
            }
            //Router.push('/search/' + text);
        } else {
            return false;
        }
    };

	const handleDestinationRemoveSearch = () => {
        setText('');
        setSearchPanelOpen(false);
        setSearchBoxOpen(false);
        setOpenScroll(false);
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
								<input type="text" name="city_name" id="city_name" placeholder="Where to?" className="border-0 rounded w-full searchIcon hFormIcon" onChange={onTextChanged} onClick={()=> handleRecentSearches()} value={text} />
								{searchOpen ? (
								<>
								{' '}	
								<div className="dropdown-menu searchDropDown" style={{display: openScroll ? 'block' : '',overflowY: openScroll ? 'scroll' : '',maxHeight: openScroll ? '500px' : ''}}>
									<div className="container weRecomDsk">
										<div className="container searchWImg">
											{isSearchBoxOpen ? (
												<Fragment>
												<div className="row">
													<div className="col-md-12 pl-0 pr-0 pb-5-px">
													<div
														className="dropdown-menu position-relative border-0 searchDropDown"
														style={{ display: 'block' }}>
														{recentSearches != '' &&
														recentSearches != undefined &&
														recentSearches != '' ? (
															<>
																<div className="rectSearch">
																	<span>
																		Recent Searches
																	</span>
																	<a
																		onClick={() =>
																			removeAllSearch()
																		}>
																		CLEAR ALL
																	</a>
																</div>

																<div className="list-autocomplete">
																	{recentSearches.map(
																		(
																			item,
																			index
																		) => (
																			<>
																				<button
																					type="button"
																					className="dropdown-item"
																					onClick={() =>
																						suggestionSelected(
																							item
																						)
																					}
																					key={
																						index
																					}>
																					{
																						item
																					}
																				</button>
																				<a className="searchtgClose">
																					<img
																						src={`${baseStoreURL}/static/images/search-tg-close.svg`}
																						alt="PurpleFare.com"
																						key={
																							index
																						}
																						onClick={() =>
																							removeRecentSearchItem(
																								item
																							)
																						}
																					/>
																				</a>
																			</>
																		)
																	)}
																</div>
															</>
														) : null}
													</div>
													</div>
												</div>	
													
												</Fragment>
											) : null}                                    
										</div> 
										{searchPanelOpen ? (
											destinations.length > 0 ? (
												<Fragment>
													<div className="row">
														<div className="col-8 list-autocomplete search-group-suggestions">
															<ul>
																{destinations.map(
																	(item, i) => (
																		<li
																			onClick={() =>
																				destinationSelected(
																					item
																				)
																			}
																			key={i}
																			>
																			{getHighlightedText(
																				item,
																				text
																			)}
																		</li>
																	)
																)}
															</ul>
														</div>
														<div className="col-4 rectSearch">
															<a
																onClick={() =>
																	handleDestinationRemoveSearch()
																}>
																CLEAR ALL
															</a>
														</div>
													</div>
												</Fragment>
											) : (
												''
											)
										) : null}
									</div>
								</div>
								</>
								) : null}{' '}
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