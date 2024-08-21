import React, {useState,Fragment} from 'react';
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

	const handleMobileMenu = () => {
		setShowMenu(!showMenu);
	}

	const handleSignInUpPopup = () => {
		setVisibleValue("visible");
	}

	const handleMobileSignInUpPopup = () => {
		setShowMenu(!showMenu);
		setVisibleValue("visible");
	}

	const handleCloseLoginPopup = () => {
		setVisibleValue("");
	}

	const handleSignInTab = () => {
		setSignInActiveClass(true);
		setSignUpActiveClass(false);
		setMoveLeftClassSignIn("");
		setMoveLeftClassSignUp("");
	}

	const handleSignUpTab = () => {
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
		const params = { 'email': loginEmail,'password': loginPassword };
		const responseData = await AuthRepository.Login(params);
		if (responseData.success==1) {
			let loggedInUser = responseData.data;
			toast.success(responseData.message);
			dispatch(login(loggedInUser));
		}else{
			toast.error(responseData.message);
		}
		setLoading(false);
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

	return (
		<Fragment>
		<div className="mb-2 justify-content-center mb-md-0 navboxmobile mobileMenu" style={{display: showMenu? "block" : "none"}}>
			<a href="javascript:;" className="navboxclose" onClick={handleMobileMenu}>X</a>
			<div className="navmheader">
				{auth.isLoggedIn && Boolean(auth.isLoggedIn) === true?
				<Link href="javascript:;" className="loginBtnMob"><img src={`${baseStoreURL}/images/my-account/profile-pic.jpg`} alt="profile-pic.jpg" /> {auth.user.user.email}</Link>
				:
				<Link href="javascript:;" className="loginBtnMob" onClick={handleMobileSignInUpPopup}><img src={`${baseStoreURL}/images/user.png`} alt="CasioIndiaShop"/> Login</Link>
				}
			</div>
			<ul className="nav col-12 col-md-auto">
				<li><Link href="javascript:;" className="nav-link px-2 link-dark"><img src={`${baseStoreURL}/images/hotel.png`} alt="" />
						Hotels</Link></li>
				<li><Link href="javascript:;" className="nav-link px-2 link-secondary"><img src={`${baseStoreURL}/images/flight.png`}
							alt="flight.png" /> Flights</Link></li>
				<li><Link href="javascript:;" className="nav-link px-2 link-dark"><img src={`${baseStoreURL}/images/cruise.png`} alt="cruise.png" />
						Cruise</Link></li>
				<li><Link href="javascript:;" className="nav-link px-2 link-dark"><img src={`${baseStoreURL}/images/holiday-packages.png`}
							alt="holiday-packages.png" /> Holiday Packages</Link></li>
	
				<li><Link href="my-profile.html" className="nav-link px-2 link-dark"><img src={`${baseStoreURL}/images/holiday-packages.png`}
					alt="" /> My Profile</Link></li>
	
				<li><Link href="my-login-details.html" className="nav-link px-2 link-dark"><img src={`${baseStoreURL}/images/login-details.png`}
					alt="" />  Login Details</Link></li>
	
				<li><Link href="javascript:;" onClick={(e) => handleLogout(e)} className="nav-link px-2 link-dark"><img src={`${baseStoreURL}/images/user-icon.png`} alt="" />
					logout</Link></li>
			</ul>
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
									{auth.isLoggedIn && Boolean(auth.isLoggedIn) === true?
										<Link href="javascript:;" className="loginBtnMob"><img src={`${baseStoreURL}/images/my-account/profile-pic.jpg`} alt="profile-pic.jpg" /> {auth.user.user.email}</Link>
										:
										<Link href="javascript:;" className="loginBtnMob" onClick={handleMobileSignInUpPopup}><img src={`${baseStoreURL}/images/user.png`} alt="CasioIndiaShop"/> Login</Link>
									}
								</div>
								<ul className="nav col-12 col-md-auto">
									<li><Link href={`${baseStoreURL}`} className="nav-link px-2 link-secondary">Hotels</Link></li>
									<li><Link href="javascript:;" className="nav-link px-2 link-dark">Flights</Link></li>								
									<li><Link href="javascript:;" className="nav-link px-2 link-dark">Cruise</Link></li>
									<li><Link href="javascript:;" className="nav-link px-2 link-dark">Holiday Packages</Link></li>
								</ul>
							</div>							
							<div className="col-md-3 text-end hdRight">
								{auth.isLoggedIn && Boolean(auth.isLoggedIn) === true?
									<div className="logedInUser">
										<div className="lgdUserCover lgoddbtn" onClick={handleAccountDropdown}><span className="lgdUser">{auth.user.user.name.slice(0,1)}</span><span className="lgdUserText">{auth.user.user.name}</span> </div>
										<ul className="logedInUserdd" style={{display: accountDropdown? "block" : "none"}}>
											<li><img src={`${baseStoreURL}/images/user-icon.png`} alt="user-icon.png"/> <Link href="my-profile.html">My Profile</Link></li>
											<li><img src={`${baseStoreURL}/images/holiday-packages.png`} alt="holiday-packages.png"/> <Link href="my-account-listing.html">My Trips</Link></li>
											<li><img src={`${baseStoreURL}/images/logout-icon.png`} alt="logout-icon.png"/> <Link href="javascript:;" onClick={(e) => handleLogout(e)}>Logout</Link></li>
										</ul>
									</div>
								:
									<button type="button" className="btn me-2" onClick={handleSignInUpPopup}>
										<img src={`${baseStoreURL}/images/home/user-icon.png`} alt="user-icon.png" /> Login
									</button>
								}
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
					<div className="frgotPassword"><a href="">Lost your password?</a></div>
					<input type="submit" id="submit" value="Submit"/>
				</form>			
				<form className={`register ${moveLeftClassSignUp}`}>
					<div className="lrScroll">
						<label for="name-register">Full Name:</label>
						<input type="text" id="name-register"/>
						<label for="phone">Phone:</label>
						<input type="text" id="phone"/>
						<label for="email-register">Email:</label>
						<input type="text" id="email-register"/>
						<label for="password">Password:</label>
						<input type="password" id="password"/>
						<p className="check-mark">
						<input type="checkbox" id="accept-terms"/>
						<label for="accept-terms">By proceeding, you agree with our <a href="">Terms of Service</a>, <a href="">Privacy Policy</a>.</label>
						</p>
						<input type="submit" id="submit" value="Create Account"/>	
					</div>
				</form>				
			</div>
		</div>
		<ToastContainer autoClose={2000} closeOnClick draggable theme="light"/>
		</Fragment>
	);
}

export default connect((state) => state)(NavHeader);