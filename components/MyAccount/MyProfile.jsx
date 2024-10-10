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

function MyProfile(props){
    const router = useRouter();
	const { auth,hotelBooking } = props;
    const [profile,setProfile] = useState(null);
    const [loading,setLoading] = useState(false);
	const dispatch = useDispatch();
    useEffect(() => {  
        let mounted = true;
        setLoading(true);
        if(auth.isLoggedIn){
            fetchMyProfile(auth.user.access_token);
        }else{
            router.push('/');
        }
        return () => mounted = false;
    }, []); 

    async function fetchMyProfile(token){
        let params = {'token':token};
        const responseData = await AuthRepository.MyProfile(params);
        if(responseData.success==1){
            setProfile(responseData.data.user);
            setLoading(false);
        }else{
            dispatch(logOut());
            router.back() ?? router.push('/');
        }
    }

    if(!loading && profile!=null){
        return (
            <Fragment>
            <section className="innerPage">
                <section className="commanSpace comanTopSpace">
                    <div className="container myproPage">
                        <div className="row">
                            <ProfileSideBar profile={profile} active="Profile"/>
                            <div className="col-md-8">
                                <div className="myaccRight">
                                    <div className="myaccBox">
                                        <div className="myaccHd">
                                            <h2>Basic information</h2>
                                            <p>Basic information for a faster booking experience</p>
                                            <Link href={`${baseStoreURL}/account/edit-profile`} className="editbtnhd">Edit</Link>
                                        </div>
                                        <div className="profileInfo">
                                            <table>                                                
                                                <tbody>
                                                <tr>
                                                    <td>Name</td>
                                                    <td>{profile.name}</td>
                                                </tr>
                                                <tr>
                                                    <td>Birthday</td>
                                                    <td>{profile.dob}</td>
                                                </tr>
                                                <tr>
                                                    <td>Gender</td>
                                                    <td>{profile.gender}</td>
                                                </tr>
                                                <tr>
                                                    <td>Marital Status</td>
                                                    <td>{profile.marital_status}</td>
                                                </tr>
                                                <tr>
                                                    <td>Address</td>
                                                    <td>{profile.address}</td>
                                                </tr>
                                                <tr>
                                                    <td>Pincode</td>
                                                    <td>{profile.zipcode}</td>
                                                </tr>
                                                <tr>
                                                    <td>City</td>
                                                    <td>{profile.city}</td>
                                                </tr>
                                                <tr>
                                                    <td>Province</td>
                                                    <td>{profile.province}</td>
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

export default connect((state) => state)(MyProfile);