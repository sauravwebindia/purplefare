import React, {useState,Fragment} from 'react';
import { baseStoreURL } from '@/repositories/Repository';
import { connect, useDispatch } from 'react-redux';
import Link from 'next/link';
import { logOut } from '@/store/auth/action';
import { useRouter } from 'next/router';

function NavHeader (props) {
	const Router = useRouter();
    const { auth } = props;
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

	const handleLoginSubmit = (e) => {

	}

	return (
		<Fragment>
		<div className="mb-2 justify-content-center mb-md-0 navboxmobile mobileMenu" style={{display: showMenu? "block" : "none"}}>
            <a href="javascript:;" className="navboxclose" onClick={handleMobileMenu}>X</a>
            <div className="navmheader">
                <a href="#" className="loginBtnMob"><img src={`${baseStoreURL}/images/my-account/profile-pic.jpg`} alt="" /> rup.rauthan@gmail.com</a>
            </div>
            <ul className="nav col-12 col-md-auto">
                <li><a href="listing.html" className="nav-link px-2 link-dark"><img src={`${baseStoreURL}/images/hotel.png`} alt="" />
                        Hotels</a></li>
                <li><a href="#" className="nav-link px-2 link-secondary"><img src={`${baseStoreURL}/images/flight.png`}
                            alt="" /> Flights</a></li>
                <li><a href="#" className="nav-link px-2 link-dark"><img src={`${baseStoreURL}/images/cruise.png`} alt="" />
                        Cruise</a></li>
                <li><a href="#" className="nav-link px-2 link-dark"><img src={`${baseStoreURL}/images/holiday-packages.png`}
                            alt="" /> Holiday Packages</a></li>
    
                <li><a href="my-profile.html" className="nav-link px-2 link-dark"><img src={`${baseStoreURL}/images/holiday-packages.png`}
                    alt="" /> My Profile</a></li>
    
                <li><a href="my-login-details.html" className="nav-link px-2 link-dark"><img src={`${baseStoreURL}/images/login-details.png`}
                    alt="" />  Login Details</a></li>
    
                <li><a href="index.html" className="nav-link px-2 link-dark"><img src={`${baseStoreURL}/images/user-icon.png`} alt="" />
                    logout</a></li>
            </ul>
        </div>
		<header className="headerLine">
			<div className="container">
				<div className="row">
					<div className="col-md-12">
						<div className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between hder">
							<a href="/" className="d-flex align-items-center col-md-3 mb-2 mb-md-0 text-dark text-decoration-none">
								<img src={`${baseStoreURL}/images/home/logo.png`} alt="logo.png" className="hdLogo" />
							</a>
							<a href="javascript:;" className="navbar-toggler navmobile" onClick={handleMobileMenu}>
								<span className="navbar-toggler-icon"></span>
							</a>
							<div className="mb-2 justify-content-center mb-md-0 desktopMenu">
								<a href="javascript:;" className="navboxclose">X</a>
								<div className="navmheader">
									<a href="#" className="loginBtnMob"><img src={`${baseStoreURL}/images/my-account/profile-pic.jpg`} alt="" /> rup.rauthan@gmail.com</a>
								</div>
								<ul className="nav col-12 col-md-auto">
									<li><a href="#" className="nav-link px-2 link-secondary">Hotels</a></li>
									<li><a href="#" className="nav-link px-2 link-dark">Flights</a></li>								
									<li><a href="#" className="nav-link px-2 link-dark">Cruise</a></li>
									<li><a href="#" className="nav-link px-2 link-dark">Holiday Packages</a></li>
								</ul>
							</div>							
							<div className="col-md-3 text-end hdRight">
								{auth.isLoggedIn && Boolean(auth.isLoggedIn) === true?
									<div className="logedInUser">
										<div className="lgdUserCover lgoddbtn" onClick={handleAccountDropdown}><span className="lgdUser">R</span><span className="lgdUserText">{auth.user.logindata.name}</span> </div>
										<ul className="logedInUserdd" style={{display: accountDropdown? "block" : "none"}}>
											<li><img src={`${baseStoreURL}/images/user-icon.png`} alt=""/> <a href="my-profile.html">My Profile</a></li>
											<li><img src={`${baseStoreURL}/images/holiday-packages.png`} alt=""/> <a href="my-account-listing.html">My Trips</a></li>
											<li><img src={`${baseStoreURL}/images/logout-icon.png`} alt=""/> <a href="index.html">Logout</a></li>
										</ul>
									</div>
								:
									<button type="button" className="btn me-2" onClick={handleSignInUpPopup}>
										<img src={`${baseStoreURL}/images/home/user-icon.png`} alt="" /> Login
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
		</Fragment>
	);
}

export default connect((state) => state)(NavHeader);