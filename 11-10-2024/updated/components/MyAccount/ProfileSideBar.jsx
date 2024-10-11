import React, { useEffect, useState, Fragment, useRef } from 'react';
import { useRouter } from 'next/router';
import { connect,useDispatch } from 'react-redux';
import { generateTempArray } from '@/utilities/common-helpers';
import Skeleton from 'react-loading-skeleton';
import { logOut } from '@/store/auth/action';
import 'react-loading-skeleton/dist/skeleton.css';
import Link from 'next/link';
import {baseStoreURL} from '@/repositories/Repository';
import AuthRepository from '@/repositories/AuthRepository';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ClipLoader from "react-spinners/ClipLoader";

function ProfileSideBar(props){
    const router = useRouter();
	const { auth,hotelBooking } = props;
    const [updateLoading, setUpdateLoading] = useState(false);
    const [profilePic, setProfilePic] = useState(props.profile.profile_pic);
    const [profile,setProfile] = props.profile!=null?useState(props.profile):useState(null);
    const [loading,setLoading] = useState(false);
    const fileInput = useRef(); /* create a ref*/
    let [color, setColor] = useState("#ffffff");
    const override = {
        display: "block",
        margin: "0 auto",
        borderColor: "red",
    };
    useEffect(() => {  
        let mounted = true;
        if(auth.isLoggedIn){
            fetchMyProfile(auth.user.access_token);
        }
        return () => mounted = false;
    }, []); 

    async function fetchMyProfile(token){
        let params = {'token':token};
        const responseData = await AuthRepository.MyProfile(params);
        if(responseData.success==1){
            setProfilePic(responseData.data.user.profile_pic);
            setLoading(false);
        }else{
            dispatch(logOut());
            router.back() ?? router.push('/');
        }
    }

    const handleLogout = (e) => {
		e.preventDefault();
		dispatch(logOut());
		router.push('/');
	};

    const handleProfilePicUpload = (e) => {
        e.preventDefault();
        /* get current files using ref */
        const formData = new FormData();
        formData.append('token',auth.user.access_token);
		formData.append('profile_pic', fileInput.current.files[0]);
        updateProfilePic(formData);
    }

    async function updateProfilePic(params) {	
        setUpdateLoading(true);	
		const responseData = await AuthRepository.updateProfilePic(params);
		if (responseData.success) {			
			setTimeout(
				function () {
					fetchMyProfile(auth.user.access_token);
                    toast.success(responseData.message);
				}.bind(this),
				250
			);
		} else {
			toast.error(responseData.message);
		}
		setUpdateLoading(false);
	}

    if(profile!=null){
        return (
            <Fragment>
            <ClipLoader
                color={color}
                loading={updateLoading}
                cssOverride={override}
                size={35}
                aria-label="Please wait"
                data-testid="loader"
            />
            <div className="col-md-4">
                <div className="myaccSidebar">
                    <div className="myaccSidebarInn">
                        <div className="panel">
                            <div className="user-heading round"> 
                                <div className="userImg">
                                    <Link href="javascript:;" className="uploadPic"><input type="file" name="profile_pic" accept='image/jpeg,image/png' ref={fileInput} id="my-file" onChange={handleProfilePicUpload} style={{display:"none"}}/><label for="my-file" style={{display:"block"}}><img src={`${baseStoreURL}/images/camera-icon.png`} alt="camera-icon.png" /></label></Link>
                                    <img src={profilePic} alt={profile.name} /> 
                                </div>
                                <h2>{profile.name}</h2>
                                <p>{profile.email}</p>
                            </div>
                            <ul className="nav-pills nav-stacked">
                                <li className={props.active=="Profile"?"active":""}><Link href={`${baseStoreURL}/account/profile`}> <i className="fa fa-user"></i> Profile</Link></li>
                                <li className={props.active=="Login Details"?"active":""}><Link href={`${baseStoreURL}/account/overview`}><i className="fas fa-user-edit"></i> Login Details</Link></li>
                                <li><Link href="javascript:;" onClick={(e) => handleLogout(e)}> <i className="fas fa-sign-out-alt"></i> Logout</Link></li>
                            </ul>
                        </div>
                    </div>                                
                </div>
            </div>            
            </Fragment>
        );
    }else{
        const skeletonView = generateTempArray(2).map((i) => (
            <Skeleton/>
        ));
        const skeletonThreeView = generateTempArray(3).map((i) => (
            <Skeleton/>
        ));
        return (
            <div className="col-md-4">
                <div className="myaccSidebar">
                    <div className="myaccSidebarInn">
                        <div className="panel">
                            <div className="user-heading round"> 
                                <div className="userImg">
                                    <Skeleton.Avatar active={true} size={30} style={{width:50,height: 50}} />
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
        );
    }
}

export default connect((state) => state)(ProfileSideBar);