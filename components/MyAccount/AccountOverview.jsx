import React, { useEffect, useState, Fragment } from 'react';
import { useRouter } from 'next/router';
import { connect,useDispatch } from 'react-redux';
import { generateTempArray } from '@/utilities/common-helpers';
import Skeleton from 'react-loading-skeleton';
import { logOut } from '@/store/auth/action';
import 'react-loading-skeleton/dist/skeleton.css';
import ProfileSideBar from '@/components/MyAccount/ProfileSideBar';
import Link from 'next/link';
import {baseStoreURL} from '@/repositories/Repository';
import AuthRepository from '@/repositories/AuthRepository';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ClipLoader from "react-spinners/ClipLoader";

function AccountOverview(props){
    const router = useRouter();
	const { auth,hotelBooking } = props;
    const [profile,setProfile] = useState(null);
    const [loading,setLoading] = useState(false);
    const [updateLoading,setUpdateLoading] = useState(false);
    const [email,setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [pwdInput,setPwdInput] = useState("password");
    const [password,setPassword] = useState("");
    const [password_confirmation,setConfirmPassword] = useState("");
    const [loginPopupDisplay,seLoginPopupDisplay] = useState(false);
    const [changePwdPopupDisplay, setChangePasswordPopupDisplay] = useState(false);
    let [color, setColor] = useState("#ffffff");
    const override = {
        display: "block",
        margin: "0 auto",
        borderColor: "red",
    };
	const dispatch = useDispatch();
    useEffect(() => {  
        let mounted = true;
        setLoading(true);
        if(auth.isLoggedIn){
            fetchMyProfileOverview(auth.user.access_token);
        }else{
            router.push('/');
        }
        return () => mounted = false;
    }, []); 

    async function fetchMyProfileOverview(token){
        let params = {'token':token};
        const responseData = await AuthRepository.MyProfile(params);
        if(responseData.success==1){
            setProfile(responseData.data.user);
            setEmail(responseData.data.user.email);
            setPhone(responseData.data.user.phone);
            setLoading(false);
        }else{
            dispatch(logOut());
            router.back() ?? router.push('/');
        }
    }

    const handleLoginDisplay = () => {
        seLoginPopupDisplay(!loginPopupDisplay);
    }

    const handleChangePasswordDisplay = () => {
        setChangePasswordPopupDisplay(!changePwdPopupDisplay);
    }

    const handleUpdatePassword = (e) => {
        e.preventDefault();
        let flag = true;
        if (password == '') {
          flag = false;
          toast.error('Password field is required.');
          return false;
        }

        if (password_confirmation == '') {
            flag = false;
            toast.error('Confirm Password field is required.');
            return false;
        }

        if(password!=password_confirmation){
            flag = false;
            toast.error("Confirm Password should be match with Password");
            return false;
        }
        
        if(flag){
            updatePassword();
        }else{
            setLoading(false);
        }
    }

    async function updatePassword() {
        setUpdateLoading(true);
        const params = { 'token': auth.user.access_token, 'password': password, 'password_confirmation':password_confirmation};
        const responseData = await AuthRepository.updatePassword(params);
        if (responseData.success) {
          toast.success(responseData.message);
          setTimeout(
            function () {
                setChangePasswordPopupDisplay(!changePwdPopupDisplay);
                fetchMyProfileOverview(auth.user.access_token);
                setPassword("");
                setConfirmPassword("");
            }.bind(this),
            250
          );
        } else {
          toast.error(responseData.message);
        }
        setUpdateLoading(false);
    }

    async function updateLoginDetails() {
        setUpdateLoading(true);
        const params = { 'token': auth.user.access_token, 'email': email, 'phone':phone};
        const responseData = await AuthRepository.updateLoginDetails(params);
        if (responseData.success==1) {
            toast.success(responseData.message);
            setTimeout(
                function () {
                    seLoginPopupDisplay(!loginPopupDisplay);
                    fetchMyProfileOverview(auth.user.access_token);
                }.bind(this),
                250
            );
        } else {
            toast.error(responseData.message);
        }
        setUpdateLoading(false);
    }

    const handleUpdateLoginDetails = (e) => {
        e.preventDefault();
        let flag = true;
        if (email == '') {
          flag = false;
          toast.error('Email field is required.');
          return false;
        }else{
            if (!/^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/.test(email)){
                flag = false;
                toast.error('Please enter valid email.');
                return false;
            }
        }

        if (phone == '') {
            flag = false;
            toast.error('Mobile field is required.');
            return false;
        }
        
        if(flag){
            updateLoginDetails();
        }else{
            setLoading(false);
        }
    }

    if(!loading && profile!=null){
        return (
            <Fragment>
            <section className="innerPage">
                <section className="commanSpace comanTopSpace">
                    <div className="container myproPage">
                        <div className="row">
                            <ProfileSideBar profile={profile} active="Login Details"/>
                            <div className="col-md-8">
                                <div className="myaccRight">
                                    <div className="myaccBox mb-3">
                                        <div className="myaccHd">
                                            <h2>Login Details</h2>
                                            <Link href="javascript:;" onClick={() => handleLoginDisplay()} className="editbtnhd" id="open-modal">Edit</Link>
                                        </div>
                                        <div className="profileInfo">
                                            <table>                                                
                                                <tbody>
                                                    <tr>
                                                        <td>Mobile Number</td>
                                                        <td>{profile.phone}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Email</td>
                                                        <td>{profile.email}</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                    <div className="myaccBox">
                                        <div className="myaccHd">
                                            <h2>Change Password</h2>
                                            <Link href="javascript:;" onClick={()=>handleChangePasswordDisplay()} className="editbtnhd" id="open-password">Change Password</Link>
                                        </div>
                                        <div className="profileInfo">
                                            <table>                                                
                                                <tbody>
                                                    <tr>
                                                        <td>Password</td>
                                                        <td><span className="">●●●●●●●●●●</span></td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </section>
            {/*** LOGIN DETAILS POPUP ***/}
            <div className={`modal__container ${loginPopupDisplay==true?`show-modal logdetlPopup`:`logdetlPopup`}`} id="modal-container">
                <div className="modal__content">
                    <div className="modal__close close-modal" title="Close" onClick={() => handleLoginDisplay()}>
                        <img src={`${baseStoreURL}/images/close.png`} alt="close.png" className="modal__img"/>
                    </div>
                    <h2 className="modal__title">Login details</h2>
                    <div className="modelInContent">
                        <div className="row">
                            <form onSubmit={handleUpdateLoginDetails}>
                            <div className="col-md-12">
                                <label>Mobile Number</label>
                                <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} maxLength={20} id="phone" name="phone" required={true}/>
                            </div>
                            <div className="col-md-12">
                                <label>Email</label>
                                <input type="email"  value={email} onChange={(e) => setEmail(e.target.value)} maxLength={191} id="email" name="email" required={true}/>
                            </div>

                            <div className="col-md-12">
                               <input type="submit" id="submit" value="Update" className="proUpdateBtn"/>
                            </div>
                            <ClipLoader
                                color={color}
                                loading={updateLoading}
                                cssOverride={override}
                                size={35}
                                aria-label="Please wait"
                                data-testid="loader"
                            />
                            </form>
                        </div>
                    </div>

                    
                </div>
            </div>
            {/*** END OF LOGIN DETAILS POPUP ***/}
            {/*** CHANGE PASSWORD POPUP ***/}
            <div className={`modal__container ${changePwdPopupDisplay==true?`show-modal changePawrdPopup`:`changePawrdPopup`}`} id="modal-container-password">
                <div className="modal__content">
                    <div className="modal__close close-modal2" title="Close" onClick={() => handleChangePasswordDisplay()}>
                    <img src={`${baseStoreURL}/images/close.png`} alt="close.png" className="modal__img"/>
                    </div>

                    <h2 className="modal__title">Change Password</h2>
                    <div className="modelInContent">
                        <div className="row">
                            <form onSubmit={handleUpdatePassword}>
                                <div className="col-md-12">
                                    <label>New Password</label>
                                    <input type="password" value={password} onChange={(e)=> setPassword(e.target.value)} id="password" name="password" maxLength={20} required={true}/>
                                </div>
                                <div className="col-md-12">
                                    <label>Confirm Password</label>
                                    <input type="password" value={password_confirmation} onChange={(e)=> setConfirmPassword(e.target.value)} id="password_confirmation" name="password_confirmation" maxLength={20} required={true}/>
                                </div>
                                <div className="col-md-12">
                                    <input type="submit" id="submit" value="Update Password" className="proUpdateBtn"/>
                                </div>
                            </form>
                        </div>
                    </div>

                    
                </div>
            </div>
            {/** END OF CHANGE PASSWORD POPUP ***/}
            <ToastContainer autoClose={2000} closeOnClick draggable theme="light"/>
            </Fragment>
        );
    }else{
        const skeletonView = generateTempArray(2).map((i) => (
            <Skeleton/>
        ));
        const skeletonTenView = generateTempArray(10).map((i) => (
            <Skeleton height={30}/>
        ));
        const skeletonThreeView = generateTempArray(3).map((i) => (
            <Skeleton/>
        ));
        return (
            <section className="innerPage">
                <section className="commanSpace comanTopSpace">
                    <div className="container myproPage">
                        <div className="row">
                            <div className="col-md-4">
                                <div className="myaccSidebar">
                                    <div className="myaccSidebarInn">
                                        <div className="panel">
                                            <div className="user-heading round"> 
                                                <div className="userImg">
                                                    <Skeleton circle={true}/>
                                                </div>
                                                {skeletonView}
                                            </div>
                                            <ul className="nav-pills nav-stacked">
                                                {skeletonThreeView}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-8">
                                {skeletonTenView}
                            </div>
                        </div>
                    </div>
                </section>
            </section>
        );
    }
}

export default connect((state) => state)(AccountOverview);