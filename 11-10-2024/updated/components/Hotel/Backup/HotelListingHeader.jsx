import React from 'react';

export default function HotelListingHeader(){
	return (
		<header className="headerLine">
			<div className="container">
				<div className="row">
					<div className="col-md-12">
						<div className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between hder">
							<a href="/" className="d-flex align-items-center col-md-3 mb-2 mb-md-0 text-dark text-decoration-none">
								<img src="images/home/logo.png" alt="" className="hdLogo" />
							</a>
							<ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
								<li><a href="#" className="nav-link px-2 link-secondary">Flights</a></li>
								<li><a href="#" className="nav-link px-2 link-dark">Hotels</a></li>
								<li><a href="#" className="nav-link px-2 link-dark">Cruise</a></li>
								<li><a href="#" className="nav-link px-2 link-dark">Holiday Packages</a></li>
							</ul>
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