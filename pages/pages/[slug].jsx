import React, {useEffect, Fragment} from 'react';
import { baseUrl } from '@/repositories/Repository';
import NavHeader from '@/components/layouts/NavHeader';
import parse from 'html-react-parser';
import Footer from "@/components/layouts/Footer";
const Page = (props) => {
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
                        <Footer/>
                    </Fragment>
                );
            }else if(page_props.data.page.slug=='contact-us'){
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
                                                                            <span className="position-absolute"><i className="fas fa-envelope"></i></span> Help@vacationum.com
                                                                        </li>
                                                                        <li className="mb-4 pl-4">
                                                                            <span className="position-absolute"><i className="fas fa-phone"></i></span> 
                                                                            +91-9871190075 (India) <br/>
                                                                            +1-7868865306 (USA)
                                                                        </li>
                                                                        <li className="mb-4 pl-4">
                                                                            <span className="position-absolute">
                                                                            <i className="fas fa-map-marker-alt"></i></span> 
                                                                            India Office : Suite 104, C-104,<br/> 
                                                                            Sector 65 Noida 201301<br/><br/>
                                                                            
                                                                            <span className="position-absolute">
                                                                                <i className="fas fa-map-marker-alt"></i></span>
                                                                            SA Office : Findlay, OH, USA
                                                                            
                                                                        </li>
                                                                    </ul>
                                                        
                                                                    
                                                                </div>
                                                        
                                                                <div className="col-lg-7 contact-form__wrapper p-5 order-lg-1">
                                                                    <form action="#" className="contact-form form-validate" novalidate="novalidate">
                                                                        <div className="row">
                                                                            <div className="col-sm-12 mb-3">
                                                                                <div className="form-group">
                                                                                    <label className="required-field" for="firstName">Name</label>
                                                                                    <input type="text" className="form-control" id="firstName" name="firstName" placeholder=""/>
                                                                                </div>
                                                                            </div>
                                                        
                                                                            <div className="col-sm-12 mb-3">
                                                                                <div className="form-group">
                                                                                    <label className="required-field" for="email">Email</label>
                                                                                    <input type="text" className="form-control" id="email" name="email" placeholder=""/>
                                                                                </div>
                                                                            </div>
                                                        
                                                                            <div className="col-sm-12 mb-3">
                                                                                <div className="form-group">
                                                                                    <label for="phone">Phone</label>
                                                                                    <input type="tel" className="form-control" id="phone" name="phone" placeholder=""/>
                                                                                </div>
                                                                            </div>
                                                        
                                                                            <div className="col-sm-12 mb-3">
                                                                                <div className="form-group">
                                                                                    <label className="required-field" for="message">Message</label>
                                                                                    <textarea className="form-control" id="message" name="message" rows="4" placeholder=""></textarea>
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
                        <Footer/>
                    </Fragment>
                );
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