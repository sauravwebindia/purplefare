import React from 'react'; 
import Head from 'next/head';
import { baseStoreURL } from '@/repositories/Repository';
import { useRouter } from 'next/router';
import $ from 'jquery';
global.jQuery = $;
const jQuery = require('jquery');
const Header = (props) => {
	console.log(props);
	const Router = useRouter();
	let completePath = Router.asPath;
	let PathArray = completePath.split("?");
	let currentPath = PathArray[0];		
	return(
		<Head>
			<title>PurpleFare.com</title>
			<meta name="description" content="PurpleFare.com"/>
			<meta name="keywords" content="PurpleFare.com"/>
			<meta name="twitter:card" content="summary_large_image"/>
			<meta name="twitter:site" content="@purplefare"/>
			<meta name="twitter:creator" content="@purplefare"/>
			<meta name="twitter:title" content="PurpleFare.com"/>
			<meta name="twitter:description" content="PurpleFare.com"/>
			<meta name="twitter:image" content="PurpleFare.com"/>
			<meta property="og:type" content="website"/>
			<meta property="og:url" content={`${baseStoreURL}${currentPath}`}/>
			<meta property="fb:app_id" content="427240167666665"/>
			<meta property="og:title" content="PurpleFare.com"/>
			<meta property="og:image" content="PurpleFare.com"/>
			<meta property="og:site_name" content="PurpleFare.com"/>
			<meta property="og:description" content="PurpleFare.com"/>
			<link rel="canonical" href={`${baseStoreURL}${currentPath}`}/>			
		</Head>
	);
}

export default Header;