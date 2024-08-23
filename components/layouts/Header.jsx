import React from 'react'; 
import Head from 'next/head';
import { baseStoreURL } from '@/repositories/Repository';
import { useRouter } from 'next/router';
import $ from 'jquery';
global.jQuery = $;
const jQuery = require('jquery');
const Header = (props) => {
	let meta_title = "PurpleFare.com";
	let meta_description = "PurpleFare.com";
	let meta_keywords = "PurpleFare.com";
	let metaInfo = props.metaInfo;
	if(metaInfo!='' && metaInfo!=undefined && metaInfo!=null){
		let metaProps = metaInfo.props;
		if(metaProps!='' && metaProps!=undefined && metaProps!=null){
			let metaPropsData = metaProps.data;
			if(metaPropsData!='' && metaPropsData!=undefined && metaPropsData!=null){
				let metaPropsDatawithData = metaPropsData.data;
				if(metaPropsDatawithData!='' && metaPropsDatawithData!=undefined && metaPropsDatawithData!=null){
					let meta_details = metaPropsDatawithData.meta_details;
					if(meta_details!='' && meta_details!=undefined && meta_details!=null){
						meta_title = meta_details.meta_title;
						meta_description = meta_details.meta_description;
						meta_keywords = meta_details.meta_keywords;
					}
				}
			}
		}
	}
	const Router = useRouter();
	let completePath = Router.asPath;
	let PathArray = completePath.split("?");
	let currentPath = PathArray[0];		
	return(
		<Head>
			<title>{`${meta_title}`}</title>
			<meta name="description" content={`${meta_description}`}/>
			<meta name="keywords" content={`${meta_keywords}`}/>
			<meta name="twitter:card" content="summary_large_image"/>
			<meta name="twitter:site" content="@purplefare"/>
			<meta name="twitter:creator" content="@purplefare"/>
			<meta name="twitter:title" content={`${meta_title}`}/>
			<meta name="twitter:description" content={`${meta_description}`}/>
			<meta name="twitter:image" content="PurpleFare.com"/>
			<meta property="og:type" content="website"/>
			<meta property="og:url" content={`${baseStoreURL}${currentPath}`}/>
			<meta property="fb:app_id" content="427240167666665"/>
			<meta property="og:title" content="PurpleFare.com"/>
			<meta property="og:image" content="PurpleFare.com"/>
			<meta property="og:site_name" content="PurpleFare.com"/>
			<meta property="og:description" content={`${meta_description}`}/>
			<link rel="canonical" href={`${baseStoreURL}${currentPath}`}/>			
		</Head>
	);
}

export default Header;