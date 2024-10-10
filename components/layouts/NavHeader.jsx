import React, {useState, useEffect,Fragment} from 'react';
import { baseStoreURL } from '@/repositories/Repository';
import { connect, useDispatch } from 'react-redux';
import Link from 'next/link';
import { logOut } from '@/store/auth/action';
import { login } from '@/store/auth/action';
import { useRouter } from 'next/router';
import { ToastContainer, toast } from 'react-toastify';
import AuthRepository from '@/repositories/AuthRepository';
import 'react-toastify/dist/ReactToastify.css';

function NavHeader (props) {
	const Router = useRouter();
	const dispatch = useDispatch();
    const { auth } = props;
	const [loginUserEmail,setLoginUserEmail] = auth.isLoggedIn?useState(auth.user.user.email):useState("");
	const [loginUserName,setLoginUserName] = auth.isLoggedIn?useState(auth.user.user.name):useState("");
	const [isLoggedIn,setIsLoggedIn] = useState(false);
	const [loading, setLoading] = useState(false);
	const [showMenu, setShowMenu] = useState(false);
	const [accountDropdown, setAccountDropdown] = useState(false);
	const [setVisible, setVisibleValue] = useState("");
	const [signInActiveClass, setSignInActiveClass] = useState(true);
	const [signUpActiveClass, setSignUpActiveClass] = useState(false);
	const [moveLeftClassSignIn, setMoveLeftClassSignIn] = useState("");
	const [moveLeftClassSignUp, setMoveLeftClassSignUp] = useState("");
	const [loginEmail, setLoginEmail] = useState("");
	const [loginPassword, setLoginPassword] = useState("");
	const [registerName, setRegisterName] = useState("");
	const [registerEmail, setRegisterEmail] = useState("");
	const [registerPassword, setRegisterPassword] = useState("");
	const [registerTermsConditions, setRegisterTermsConditions] = useState(0);
	const [actionBtnLoading,setActionBtnLoading] = useState(false);


	useEffect(() => {  
        let mounted = true;
		setIsLoggedIn(auth.isLoggedIn);
		return () => mounted = false;
	}, []);

	const handleMobileMenu = () => {
		setShowMenu(!showMenu);
	}

	const handleSignInUpPopup = () => {
		setLoginEmail("");
		setLoginPassword("");
		setRegisterEmail("");
		setRegisterName("");
		setRegisterPassword("");
		setRegisterTermsConditions(0);
		setVisibleValue("visible");
	}

	const handleMobileSignInUpPopup = () => {
		setShowMenu(!showMenu);
		setVisibleValue("visible");
	}

	const handleCloseLoginPopup = () => {
		setLoginEmail("");
		setLoginPassword("");
		setRegisterEmail("");
		setRegisterName("");
		setRegisterPassword("");
		setRegisterTermsConditions(0);
		setVisibleValue("");
	}

	const handleSignInTab = () => {
		setLoginEmail("");
		setLoginPassword("");
		setSignInActiveClass(true);
		setSignUpActiveClass(false);
		setMoveLeftClassSignIn("");
		setMoveLeftClassSignUp("");
	}

	const handleSignUpTab = () => {
		setRegisterEmail("");
		setRegisterName("");
		setRegisterPassword("");
		setRegisterTermsConditions(0);
		setSignUpActiveClass(true);
		setSignInActiveClass(false);
		setMoveLeftClassSignUp("move-left");
		setMoveLeftClassSignIn("move-left");
		
	}

	const handleAccountDropdown = () => {
		setAccountDropdown(!accountDropdown);
	}


	async function loginUser() {
		setLoading(true);
		setActionBtnLoading(true);
		const params = { 'email': loginEmail,'password': loginPassword };
		const responseData = await AuthRepository.Login(params);
		if (responseData.success==1) {
			setActionBtnLoading(false);
			let loggedInUser = responseData.data;
			toast.success(responseData.message);
			dispatch(login(loggedInUser));
			setLoginEmail("");
			setLoginPassword("");
			setLoginUserEmail(loggedInUser.user.email);
			setLoginUserName(loggedInUser.user.name);
			Router.push('/');
			setVisibleValue("");
		}else{
			setActionBtnLoading(false);
			toast.error(responseData.message);
			return false;
		}
		setLoading(false);
		setActionBtnLoading(false);
	}


	async function registerUser() {
		setLoading(true);
		setActionBtnLoading(true);
		const params = {'name':registerName, 'email': registerEmail,'password': registerPassword };
		const responseData = await AuthRepository.Register(params);
		if (responseData.success==1) {
			let loggedInUser = responseData.data;
			setLoginUserEmail(loggedInUser.user.email);
			setLoginUserName(loggedInUser.user.name);
			toast.success(responseData.message);
			setActionBtnLoading(false);			
			dispatch(login(loggedInUser));	
			setRegisterEmail("");
			setRegisterName("");
			setRegisterPassword("");
			setRegisterTermsConditions(0);
			Router.push('/');		
		}else{
			toast.error(responseData.message);
			setActionBtnLoading(false);
		}
		setLoading(false);
		setActionBtnLoading(false);
	}


	const handleLogout = (e) => {
		e.preventDefault();
		dispatch(logOut());
		Router.push('/');
	};

	const handleLoginSubmit = (e) => {
		e.preventDefault();
		let flag = true;
		if (loginEmail == '') {
			flag = false;
			toast.error('Email field is required.');
			return false;
		}else{
			if (!/^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/.test(loginEmail)){
				flag = false;
				toast.error('Please enter valid email.');
				return false;
			}
		}

		if (loginPassword == '') {
			flag = false;
			toast.error('Password field is required.');
			return false;
		}

		if(flag){
			loginUser();
		}
	}
	
	
	const handleRegisterSubmit = (e) => {
		e.preventDefault();
		let flag = true;

		if (registerName == '') {
			flag = false;
			toast.error('Name field is required.');
			return false;
		}

		if (registerEmail == '') {
			flag = false;
			toast.error('Email field is required.');
			return false;
		}else{
			if (!/^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/.test(registerEmail)){
				flag = false;
				toast.error('Please enter valid email.');
				return false;
			}
		}

		if (registerPassword == '') {
			flag = false;
			toast.error('Password field is required.');
			return false;
		}

		if(registerTermsConditions==0){
			flag = false;
			toast.error('Please agree Privacy Policy & Terms Service.');
			return false;
		}

		if(flag){
			registerUser();
		}
	}

	const handleRegisterTermsConditions = () => {
		if(registerTermsConditions==1){
			setRegisterTermsConditions(0);
		}else{
			setRegisterTermsConditions(1);
		}
	}

	function AfterLogin(){
		if(auth.isLoggedIn){
			return (
				<div className="logedInUser">
					<div className="lgdUserCover lgoddbtn" onClick={handleAccountDropdown}><span className="lgdUser">{auth.user.user.name.slice(0,1)}</span><span className="lgdUserText">{loginUserName}</span> </div>
					<ul className="logedInUserdd" style={{display: accountDropdown? "block" : "none"}}>
						<li><img src={`${baseStoreURL}/images/user-icon.png`} alt="user-icon.png"/> <Link href={`${baseStoreURL}/account/profile`}>My Profile</Link></li>
						<li><img src={`${baseStoreURL}/images/holiday-packages.png`} alt="holiday-packages.png"/> <Link href={`${baseStoreURL}/account/bookings`}>My Trips</Link></li>
						<li><img src={`${baseStoreURL}/images/logout-icon.png`} alt="logout-icon.png"/> <Link href="javascript:;" onClick={(e) => handleLogout(e)}>Logout</Link></li>
					</ul>
				</div>
			);
		}else{
			return (
				<button type="button" className="btn me-2" onClick={handleSignInUpPopup}>
					<img src={`${baseStoreURL}/images/home/user-icon.png`} alt="user-icon.png" /> Login
				</button>
			);
		}
	}

	function MenuAfterLogin(){
		if(auth.isLoggedIn){
			return (
				<Fragment>
					<div className="navmheader">
						<Link href="javascript:;" className="loginBtnMob"><img src={`${baseStoreURL}/images/my-account/profile-pic.jpg`} alt="profile-pic.jpg" /> {loginUserEmail}</Link>
					</div>
					<ul className="nav col-12 col-md-auto">
						<li><Link href={`${baseStoreURL}/hotel-search`} className="nav-link px-2 link-dark"><img src={`${baseStoreURL}/images/hotel.png`} alt="" />
								Hotels</Link></li>
						<li><Link href="javascript:;" className="nav-link px-2 link-secondary"><img src={`${baseStoreURL}/images/flight.png`}
									alt="flight.png" /> Flights</Link></li>
						<li><Link href="javascript:;" className="nav-link px-2 link-dark"><img src={`${baseStoreURL}/images/cruise.png`} alt="cruise.png" />
								Cruise</Link></li>
						<li><Link href="javascript:;" className="nav-link px-2 link-dark"><img src={`${baseStoreURL}/images/holiday-packages.png`}
									alt="holiday-packages.png" /> Holiday Packages</Link></li>

						<li><Link href={`${baseStoreURL}/account/profile`} className="nav-link px-2 link-dark"><img src={`${baseStoreURL}/images/holiday-packages.png`}
							alt="" /> My Profile</Link></li>

						<li><Link href={`${baseStoreURL}/account/overview`} className="nav-link px-2 link-dark"><img src={`${baseStoreURL}/images/login-details.png`}
							alt="" />  Login Details</Link></li>

						<li><Link href="javascript:;" onClick={(e) => handleLogout(e)} className="nav-link px-2 link-dark"><img src={`${baseStoreURL}/images/user-icon.png`} alt="" />
							logout</Link></li>
					</ul>
				</Fragment>
			);
		}else{
			return (
				<Fragment>
					<div className="navmheader">
						<Link href="javascript:;" className="loginBtnMob" onClick={handleMobileSignInUpPopup}><img src={`${baseStoreURL}/images/user.png`} alt="CasioIndiaShop"/> Login</Link>
					</div>
					<ul className="nav col-12 col-md-auto">
						<li><Link href={`${baseStoreURL}/hotel-search`} className="nav-link px-2 link-dark"><img src={`${baseStoreURL}/images/hotel.png`} alt="" />
								Hotels</Link></li>
						<li><Link href="javascript:;" className="nav-link px-2 link-secondary"><img src={`${baseStoreURL}/images/flight.png`}
									alt="flight.png" /> Flights</Link></li>
						<li><Link href="javascript:;" className="nav-link px-2 link-dark"><img src={`${baseStoreURL}/images/cruise.png`} alt="cruise.png" />
								Cruise</Link></li>
						<li><Link href="javascript:;" className="nav-link px-2 link-dark"><img src={`${baseStoreURL}/images/holiday-packages.png`}
									alt="holiday-packages.png" /> Holiday Packages</Link></li>
					</ul>
				</Fragment>
			)
		}
	}

	function BtnAfterLogin(){
		if(auth.isLoggedIn){
			return (
				<Link href="javascript:;" className="loginBtnMob"><img src={`${baseStoreURL}/images/my-account/profile-pic.jpg`} alt="profile-pic.jpg" /> {loginUserEmail}</Link>
			);
		}else{
			return (
				<Link href="javascript:;" className="loginBtnMob" onClick={handleMobileSignInUpPopup}><img src={`${baseStoreURL}/images/user.png`} alt="CasioIndiaShop"/> Login</Link>
			);
		}
	}

	return (
		<Fragment>
		<div className="mb-2 justify-content-center mb-md-0 navboxmobile mobileMenu" style={{display: showMenu? "block" : "none"}}>
			<a href="javascript:void(0);" className="navboxclose" onClick={handleMobileMenu}>X</a>
			<MenuAfterLogin/>
		</div>
		<header className="headerLine">
			<div className="container">
				<div className="row">
					<div className="col-md-12">
						<div className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between hder">
							<Link href="/" className="d-flex align-items-center col-md-3 mb-2 mb-md-0 text-dark text-decoration-none">
								<img src={`${baseStoreURL}/images/home/logo.png`} alt="logo.png" className="hdLogo" />
							</Link>
							<Link href="javascript:;" className="navbar-toggler navmobile" onClick={handleMobileMenu}>
								<span className="navbar-toggler-icon"></span>
							</Link>
							<div className="mb-2 justify-content-center mb-md-0 desktopMenu">
								<Link href="javascript:;" className="navboxclose">X</Link>
								<div className="navmheader">
									<BtnAfterLogin/>
								</div>
								<ul className="nav col-12 col-md-auto">
									<li><Link href={`${baseStoreURL}`} className="nav-link px-2 link-secondary">Hotels</Link></li>
									<li><Link href="javascript:;" className="nav-link px-2 link-dark">Flights</Link></li>								
									<li><Link href="javascript:;" className="nav-link px-2 link-dark">Cruise</Link></li>
									<li><Link href="javascript:;" className="nav-link px-2 link-dark">Holiday Packages</Link></li>
								</ul>
							</div>							
							<div className="col-md-3 text-end hdRight">
								<AfterLogin/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</header>
		<div className={`overlay ${setVisible}`}></div>
		<div className={`main-popup ${setVisible}`}>
			<div className="popup-header">
				<div id="popup-close-button" onClick={handleCloseLoginPopup}>
					<a href="javascript:;"></a>
				</div>
				<ul>
					<li><a href="javascript:;" id="sign-in" onClick={handleSignInTab} className={signInActiveClass?'active':''}>Sign In</a></li>
					<li><a href="javascript:;" id="register" onClick={handleSignUpTab} className={signUpActiveClass?'active':''}>Create Account</a></li>
				</ul>
			</div>
			<div className="popup-content">
				<form className={`sign-in ${moveLeftClassSignIn}`} onSubmit={handleLoginSubmit} autoComplete="off">
					<label for="email">Email:</label>
					<input type="email" id="email" name="email" maxLength="150" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} required={true}/>
					<label for="password">Password:</label>
					<input type="password" id="password" name="password" maxLength="20" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} required={true}/>				
					<div className="frgotPassword"><Link href={`${baseStoreURL}/forgot-password`}>Lost your password?</Link></div>
					<input type="submit" className="subBtn" id="login-submit" value={`${actionBtnLoading==true?'Please wait':'Login'}`}/>
				</form>			
				<form className={`register ${moveLeftClassSignUp}`} onSubmit={handleRegisterSubmit} autoComplete="off">
					<div className="lrScroll">
						<label for="name-register">Full Name:</label>
						<input type="text" id="register-name" name="name" maxLength="100" value={registerName} onChange={(e) => setRegisterName(e.target.value)} required={true}/>
						<label for="email-register">Email:</label>
						<input type="text" id="register-email" name="email" maxLength="150" value={registerEmail} onChange={(e) => setRegisterEmail(e.target.value)} required={true}/>
						<label for="password">Password:</label>
						<input type="password" id="register-password" name="password" maxLength="20" value={registerPassword} onChange={(e) => setRegisterPassword(e.target.value)} required={true}/>
						<p className="check-mark">
						<input type="checkbox" id="accept-terms" name="terms-conditions" onClick={handleRegisterTermsConditions} value={registerTermsConditions} checked={registerTermsConditions==1?true:false}/>
						<label for="accept-terms">By proceeding, you agree with our <Link href={`${baseStoreURL}/pages/terms-conditions`}>Terms of Service</Link>, <Link href={`${baseStoreURL}/pages/privacy-policy`}>Privacy Policy</Link>.</label>
						</p>
						<input type="submit" className="subBtn" id="register-submit" value={`${actionBtnLoading==true?'Please wait':'Create Account'}`}/>	
					</div>
				</form>				
			</div>
		</div>
		<ToastContainer autoClose={2000} closeOnClick draggable theme="light"/>
		</Fragment>
	);
}

export default connect((state) => state)(NavHeader);