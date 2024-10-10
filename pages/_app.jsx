import App from 'next/app';
import React from 'react';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from "@/store/store";
import Header from '@/components/layouts/Header';
import Router from 'next/router';
import NProgress from 'nprogress';
const jQuery = require('jquery');
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'animate.css';
import "@/styles/style.css";
import "@/styles/style-mobile.css";
import "@/styles/slider.css";
import "@/styles/nprogress.css";
import { v4 } from "uuid";


class MyApp extends App {	
	componentDidMount() {
		setTimeout(function () {
            document.getElementById('__next').classList.add('loaded');
			if(localStorage.getItem('uuid')==null || localStorage.getItem('uuid')==undefined || localStorage.getItem('uuid')==''){
				localStorage.setItem('uuid',v4());
			}
        }, 100);

		const handleRouteChange = (url) => {	
			
		}

		Router.events.on('routeChangeComplete', handleRouteChange);        
		Router.events.on('routeChangeStart', (url) => {
		  NProgress.start()
		})
		Router.events.on('routeChangeComplete', () => NProgress.done())
		Router.events.on('routeChangeError', () => NProgress.done())
		return () => {
            Router.events.off('routeChangeComplete', handleRouteChange);
        };
	}
	render() {
        const { Component, pageProps } = this.props;
        return (
			<Provider store={store}>
				<Header metaInfo={pageProps} />
				<Component {...pageProps} />
			</Provider>
		);
    }
}

export default MyApp;
		
/*export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}*/
