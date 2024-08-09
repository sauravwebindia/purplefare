import App from 'next/app';
import React from 'react';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from "@/store/store";
import Header from '@/components/layouts/Header';
import Router from 'next/router';
const jQuery = require('jquery');
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'animate.css';
import "@/styles/style.css";
import "@/styles/style-mobile.css";
import "@/styles/slider.css";


class MyApp extends App {	
	componentDidMount() {
		setTimeout(function () {
            document.getElementById('__next').classList.add('loaded');
        }, 100);
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
