import React, { useEffect, useState, Fragment } from 'react';
import { useRouter } from 'next/router';
import { connect,useDispatch } from 'react-redux';
import 'react-loading-skeleton/dist/skeleton.css';
import AuthRepository from '@/repositories/AuthRepository';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import parse from 'html-react-parser';
import ClipLoader from "react-spinners/ClipLoader";

function ForgotPassword(props){
    const router = useRouter();
	const { auth } = props;
    const [email,setEmail] = useState("");
    const [loading,setLoading] = useState(false);
    const [message, setMessage] = useState("");
	const dispatch = useDispatch();
    const [color, setColor] = useState("#ffffff");
    const override = {
        display: "block",
        margin: "0 auto",
        borderColor: "red",
    };
    useEffect(() => {  
        let mounted = true;
        if(auth.isLoggedIn){
            router.push('/');
        }
        return () => mounted = false;
    }, []); 

    async function forgotPassword(){
        let params = {'email':email};
        setLoading(true);
        const responseData = await AuthRepository.ForgotPassword(params);
        if(responseData.success==1){
            setMessage("<span style='color:green'>"+responseData.message+"</span>");
            setEmail("");
            toast.success(responseData.message);
            setLoading(false);
        }else{
            setMessage("<span style='color:red'>"+responseData.message+"</span>");
            toast.error(responseData.message);
            setLoading(false);
        }
    }

    const handleForgotPassword = (e) => {
        e.preventDefault();
        setMessage("");
        let flag = true;
        if (email == '') {
          flag = false;
          toast.error('Email field is required.');
          return false;
        }
        
        if(flag){
            forgotPassword();
        }else{
            setLoading(false);
        }
    }
    
    return (
        <Fragment>
        <section className="innerPage">
            <section className="commanSpace comanTopSpace">
                <div className="container bookingSucessPage">                      
                    <div className="row">                        
                        <div className="col-md-5 m-auto">
                            <div className="boxWithShadow frgtPassword">
                                <h2>Forgot Password</h2>
                                <span className="fgtTxt">Lost your password? Please enter your username or email address.<br/> You will receive a link to create a new password via email.</span>
                                <form onSubmit={handleForgotPassword}>
                                    <label for="email">Email:</label>
                                    <input type="text" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} maxLength={191} required={true}/>
                                    <input type="submit" id="submit" value="Reset Password" className="fgtBtn"/>
                                </form>
                                {message!=''?parse(message):''}
                                <ClipLoader
                                    color={color}
                                    loading={loading}
                                    cssOverride={override}
                                    size={35}
                                    aria-label="Please wait"
                                    data-testid="loader"
                                />
                            </div>                                
                        </div>
                    </div>
                </div>
            </section>
        </section>
        <ToastContainer autoClose={2000} closeOnClick draggable theme="light"/>
        </Fragment>
    );    
}

export default connect((state) => state)(ForgotPassword);