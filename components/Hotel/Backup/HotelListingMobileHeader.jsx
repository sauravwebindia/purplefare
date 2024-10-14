import React from 'react';
import Link from 'next/link';

export default function HotelListingMobileHeader(){
	return (
		<header className="headerLine">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div
                            className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between hder">
                            <Link href="/"
                                className="d-flex align-items-center col-md-3 mb-2 mb-md-0 text-dark text-decoration-none">
                                <img src="images/home/logo.png" alt="" className="hdLogo" />
                            </Link>
                            <Link href="javascript:;" className="navbar-toggler navmobile">
                                <span className="navbar-toggler-icon"></span>
                            </Link>
                            
                            <div className="mb-2 justify-content-center mb-md-0 navboxmobile">
                                <Link href="javascript:;" className="navboxclose">X</Link>
                                <div className="navmheader">
                                    <Link href="#" className="loginBtnMob"><img src="images/profile-icon.png" alt="" /> Login</Link>
                                </div>
                                <ul className="nav col-12 col-md-auto">
                                    <li><Link href="#" className="nav-link px-2 link-dark"><img src="images/hotel.png" alt="" /> Hotels</Link></li>
                                    <li><Link href="#" className="nav-link px-2 link-secondary"><img src="images/flight.png" alt="" /> Flights</Link></li>
                                    <li><Link href="#" className="nav-link px-2 link-dark"><img src="images/cruise.png" alt="" /> Cruise</Link></li>
                                    <li><Link href="#" className="nav-link px-2 link-dark"><img src="images/holiday-packages.png" alt="" /> Holiday Packages</Link></li>
                                    
                                    
                                </ul>
                            </div>

                            <div className="col-md-3 text-end hdRight">
                                <button type="button" className="btn btn-outline-primary me-2">
                                    <img src="images/home/user-icon.png" alt="" /> Login
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
	);
}