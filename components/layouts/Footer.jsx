import React from 'react';

export default function Footer(){
	
	return (
		<>
		<footer className="footerBox">
			<div className="footer">
				<div className="container">
					<div className="row">
						<div className="col-md-6 col-lg-3">
							<div className="ftAbout">
								<div className="btLogo"><img src="images/home/logo.png" alt=""/></div>
								<p>We aim to ensure that you never miss an opportunity to travel.</p>
								<h3>Follow Us</h3>
								<p className="sIcons">
									<a href="#" className="pl-0 p-1"><span className="fa fa-instagram"></span></a>
									<a href="#" className="p-1"><span className="fa fa-facebook"></span></a>
									<a href="#" className="p-1"><span className="fa fa-twitter"></span></a>
									<a href="#" className="p-1"><span className="fa fa-whatsapp"></span></a>
									<a href="#" className="p-1"><span className="fa fa-pinterest"></span></a>
								</p>
							</div>
						</div>
						<div className="col-md-6 col-lg-3">
							<div className="footer-tags">
								<h2>Quick Links</h2>
								<ul>
									<li><a href="#">About us</a></li>
									<li><a href="#">Careers</a></li>
									<li><a href="#">Privacy</a></li>
									<li><a href="#">Terms of use</a></li>
									{/*<li><a href="#">Blog</a></li></div>*/}
								</ul>
							</div>
						</div>
						<div className="col-md-6 col-lg-3">
							<div className="footer-tags">
								<h2>Services</h2>
								<ul>
									<li><a href="#">Flights</a></li>
									<li><a href="#">Hotels</a></li>
									<li><a href="#">Holiday Packages</a></li>
								</ul>
							</div>
						</div>
						<div className="col-md-6 col-lg-3">
							<div className="footer-tags">
								<h2>Customer service</h2>
								<ul>
									<li><a href="#">Contact us</a></li>
									<li><a href="#">Help center</a></li>
									<li><a href="#">Feedback</a></li>
								</ul>
							</div>
						</div>
					</div>			
				</div>
			</div>
		</footer>
		<div className="container">
			<div className="row">
				<div className="col-md-12">
					<p className="mt-3 mb-3 text-center copyRight">Copyright ©2024 All rights reserved Vacationum Trip LLC</p>
				</div>
			</div>
		</div>
		</>
	);
}