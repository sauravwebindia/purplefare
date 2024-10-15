import React, {useEffect, useState,Fragment} from 'react';
import { baseUrl } from '@/repositories/Repository';
import { baseStoreURL } from '@/repositories/Repository';
import NavHeader from '@/components/layouts/NavHeader';
import parse from 'html-react-parser';
import Footer from "@/components/layouts/Footer";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
config.autoAddCss = false;
import { faEnvelope, faMapMarkedAlt, faPhone } from '@fortawesome/free-solid-svg-icons'
import StoreRepository from '@/repositories/StoreRepository';
const Page = (props) => {
    const [name, setName] = useState("");
    const [email,setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [message, setMessage] = useState("");
    const [loading,setLoading] = useState(false);
    useEffect(() => {  
        let mounted = true;
        return () => mounted = false;
    }, []);

    const handleContactForm = (e) => {
        e.preventDefault();
        let flag=true;
        if(name==''){
            toast.error("Name is required");
            flag = false;
            return false;
        }

        if(email==''){
            toast.error("Email is required");
            flag = false;
            return false;
        }

        if(phone==''){
            toast.error("Phone is required");
            flag = false;
            return false;
        }

        if(message==''){
            toast.error("Message is required");
            flag = false;
            return false;
        }

        if(flag){
            saveContact();
        }else{
            setLoading(false);
        }
    }

    async function saveContact() {
        setLoading(true);
        let params = {  'name':name,'email':email,'phone':phone,'message':message};
        const responseData = await StoreRepository.saveContactQuery(params);
        if (responseData.success==1) {
            setLoading(false);
            setTimeout(function(){
                toast.success(responseData.message);            
                setName("");
                setEmail("");
                setPhone("");
                setMessage("");
            },300);
        } else {
            setLoading(false);
            toast.error(responseData.message);
            return false;
        }
        setLoading(false);
    }

    let page_props = props.props.data;
    if(page_props!='' && page_props!=undefined && page_props!=null){
        if(page_props.data.page!=null && page_props.data.page!=undefined && page_props.data.page!=''){
            if(page_props.data.page.slug!='contact-us'){
                return (            
                    <Fragment>
                        <NavHeader/>
                        <section className="innerPage">
                            <section className="commanSpace comanTopSpace">
                                <div className="container">
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="contentPage">
                                                <h1>{page_props.data.page.heading_h1}</h1>
                                                {parse(page_props.data.page.content)}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </section>
                        <ToastContainer autoClose={2000} closeOnClick draggable theme="light"/>
                        <Footer/>
                    </Fragment>
                );
            }else if(page_props.data.page.slug=='contact-us'){
                if(loading){
                    return (
                        <Fragment>
                            <section className="innerPage">
                                <section className="commanSpace comanTopSpace">
                                    <div className="container">
                                        <div className="row">
                                            <div className="col-md-12">
                                                <div className="contentPage">
                                                    <h1>{page_props.data.page.heading_h1}</h1>
                                                    <div className="contactPage">
                                                        <div className="container">
                                                            <div className="loaderbg">
                                                                <img src={`${baseStoreURL}/images/purplefare-loader.gif`} alt="purplefare-loader.gif" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </section>
                            </section>
                        <ToastContainer autoClose={2000} closeOnClick draggable theme="light"/>
                        </Fragment>
                    );
                }else{
                    return (
                        <Fragment>
                            <NavHeader/>
                            <section className="innerPage">
                                <section className="commanSpace comanTopSpace">
                                    <div className="container">
                                        <div className="row">
                                            <div className="col-md-12">
                                                <div className="contentPage">
                                                    <h1>{page_props.data.page.heading_h1}</h1>
                                                    <div className="contactPage">
                                                        <div className="container">
                                                            <div className="contact__wrapper formShadow mt-n9">
                                                                <div className="row no-gutters">
                                                                    <div className="col-lg-5 contact-info__wrapper gradient-brand-color p-5 order-lg-2">
                                                                        <h3 className="color--white mb-5">Contact</h3>
                                                            
                                                                        <ul className="contact-info__list list-style--none position-relative z-index-101">
                                                                            <li className="mb-4 pl-4">
                                                                                <span className="position-absolute"><FontAwesomeIcon icon={faEnvelope} /></span> help@purplefare.com
                                                                            </li>
                                                                            <li className="mb-4 pl-4">
                                                                                <span className="position-absolute"><FontAwesomeIcon icon={faPhone} /></span> 
                                                                                +1-7868865306 (USA)                                                                            
                                                                            </li>
                                                                            <li className="mb-4 pl-4">
                                                                                <span className="position-absolute">
                                                                                <FontAwesomeIcon icon={faMapMarkedAlt} /></span> 
                                                                                2228 bluestone drive Findlay,<br/> 
                                                                                Ohio 45840 USA                                                                            
                                                                            </li>
                                                                        </ul>
                                                            
                                                                        
                                                                    </div>
                                                            
                                                                    <div className="col-lg-7 contact-form__wrapper p-5 order-lg-1">
                                                                        <form onSubmit={handleContactForm} className="contact-form form-validate" novalidate="novalidate">
                                                                            <div className="row">
                                                                                <div className="col-sm-12 mb-3">
                                                                                    <div className="form-group">
                                                                                        <label className="required-field" for="contact-name">Name</label>
                                                                                        <input type="text" className="form-control" id="contact-name" name="name" onChange={(e) => setName(e.target.value)} value={name} maxLength={191} required={true} placeholder=""/>
                                                                                    </div>
                                                                                </div>
                                                            
                                                                                <div className="col-sm-12 mb-3">
                                                                                    <div className="form-group">
                                                                                        <label className="required-field" for="contact-email">Email</label>
                                                                                        <input type="text" className="form-control" id="contact-email" name="email" onChange={(e) => setEmail(e.target.value)} value={email} maxLength={191} required={true} placeholder=""/>
                                                                                    </div>
                                                                                </div>
                                                            
                                                                                <div className="col-sm-12 mb-3">
                                                                                    <div className="form-group">
                                                                                        <label for="contact-phone">Phone</label>
                                                                                        <input type="tel" className="form-control" id="contact-phone" name="phone" onChange={(e) => setPhone(e.target.value)} value={phone} maxLength={20} required={true} placeholder=""/>
                                                                                    </div>
                                                                                </div>
                                                            
                                                                                <div className="col-sm-12 mb-3">
                                                                                    <div className="form-group">
                                                                                        <label className="required-field" for="contact-message">Message</label>
                                                                                        <textarea className="form-control" id="contact-message" name="message" onChange={(e) => setMessage(e.target.value)} value={message} maxLength={500} required={true} rows="4" placeholder=""></textarea>
                                                                                    </div>
                                                                                </div>
                                                            
                                                                                <div className="col-sm-12 mb-3">
                                                                                    <button type="submit" name="submit" className="btn btn-primary btn hButton border-0 ctBtn">Submit</button>
                                                                                </div>
                                                            
                                                                            </div>
                                                                        </form>
                                                                    </div>
                                                            
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </section>
                            </section>
                            <ToastContainer autoClose={2000} closeOnClick draggable theme="light"/>
                            <Footer/>
                        </Fragment>
                    );
                }
            }else{
                return "";
            }
        }else{
            return "";
        }
    }else{
        return "";
    }
}


Page.getInitialProps = async(context) => {
    let slug = context.query.slug;
    const settings = {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Il9eRmkWQSO8WC0HGO3cwr5LmKvtJA90'
        },
        body: JSON.stringify({'slug':slug})
    };
    const data = await fetch(`${baseUrl}/fetch-page`,settings)
    .then(response => response.json());
    return {
		props: { data },
	}
}

export default Page;