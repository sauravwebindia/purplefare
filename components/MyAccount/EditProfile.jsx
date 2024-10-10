import React, { useEffect, useState, Fragment, CSSProperties  } from 'react';
import { useRouter } from 'next/router';
import { connect,useDispatch } from 'react-redux';
import { generateTempArray } from '@/utilities/common-helpers';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import Link from 'next/link';
import { DatePicker } from 'rsuite';
import { logOut } from '@/store/auth/action';
import {baseStoreURL} from '@/repositories/Repository';
import ProfileSideBar from '@/components/MyAccount/ProfileSideBar';
import AuthRepository from '@/repositories/AuthRepository';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ClipLoader from "react-spinners/ClipLoader";

function EditProfile(props){
    const router = useRouter();
	const { auth,hotelBooking } = props;
    const [profile,setProfile] = useState(null);
    const [loading,setLoading] = useState(false);
    const [updateLoading, setUpdateLoading] = useState(false);
    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [phone,setPhone] = useState("");
    const [address,setAddress] = useState("");
    const [city, setCity] = useState("");
    const [zipCode,setZipCode] = useState("");
    const [province,setProvince] = useState("");
    const [gender,setGender] = useState("");
    const [dob, setDOB] = useState("");
    const [marital_status,setMaritalStatus] = useState("");
	const dispatch = useDispatch();
    const [color, setColor] = useState("#ffffff");
    const override = {
        display: "block",
        margin: "0 auto",
        borderColor: "red",
    };

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
            setName(responseData.data.user.name);
            setEmail(responseData.data.user.email);
            setPhone(responseData.data.user.phone);
            setAddress(responseData.data.user.address);
            setCity(responseData.data.user.city);
            setZipCode(responseData.data.user.zipcode);
            setProvince(responseData.data.user.province);
            setGender(responseData.data.user.gender);
            let dob = responseData.data.user.dob;
            if(dob!=null && dob!='' && dob!=undefined){
                setDOB(new Date(dob));
            }
            setMaritalStatus(responseData.data.user.marital_status);
            setLoading(false);
        }else{
            dispatch(logOut());
            router.back() ?? router.push('/');
        }
    }

    async function updateProfile() {
        setUpdateLoading(true);
        const params = { 'token': auth.user.access_token, 'name': name, 'address': address, 'city': city, 'province': province, 'zipcode': zipCode, 'dob': dob, 'gender': gender, 'marital_status': marital_status};
        const responseData = await AuthRepository.updateProfile(params);
        if (!responseData.error) {
          toast.success(responseData.message);
          setTimeout(
            function () {
              router.push('/account/profile');
            }.bind(this),
            250
          );
        } else {
          toast.error(responseData.message);
        }
        setUpdateLoading(false);
    }

    const handleProfile = (e) => {
        e.preventDefault();
        let flag = true;
        if (name == '') {
          flag = false;
          toast.error('Name field is required.');
          return false;
        }
        
        if(flag){
            updateProfile();
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
                            <ProfileSideBar profile={profile} active="Profile"/>
                            <div className="col-md-8">
                                <div className="myaccRight">
                                    <div className="myaccBox">
                                        <div className="myaccHd">
                                            <h2>Edit Profile</h2>
                                        </div>
                                        <div className="editProfile">
                                            <form onSubmit={handleProfile}>
                                                <div className="row">
                                                    <div className="col-md-6">
                                                        <label>Name</label>
                                                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} name="name" maxLength={191} id="name" required={true}/>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <label>Birthday</label>
                                                        <DatePicker name="dob" oneTap defaultValue={dob} onChange={(date) => setDOB(date)} value={dob} className="form-control here" format="MM/dd/yyyy" maxDate={new Date()} inputReadOnly={true}/>
                                                    </div>
                
                                                    <div className="col-md-6">
                                                        <label>Gender</label>
                                                        <select name="gender" className="form-control here" defaultValue={gender} value={gender} onChange={(e) => setGender(e.target.value)}>
                                                            <option value="">Select</option>
                                                            <option value="Male">Male</option>
                                                            <option value="Female">Female</option>
                                                            <option value="Other">Other</option>
                                                        </select>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <label>Marital Status</label>
                                                        <select name="marital_status" className="form-control here" defaultValue={marital_status} value={marital_status} onChange={(e) => setMaritalStatus(e.target.value)}>
                                                            <option value="">Select</option>
                                                            <option value="Married">Married</option>
                                                            <option value="Unmarried">Unmarried</option>
                                                            <option value="Divorce">Divorce</option>
                                                        </select>
                                                    </div>

                                                    <div className="col-md-12">
                                                        <label>Address</label>
                                                        <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} name="address" maxLength={191} id="address"/>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <label>Zip Code</label>
                                                        <input type="text" value={zipCode} onChange={(e) => setZipCode(e.target.value)} name="zipcode" maxLength={191} id="zipcode"/>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <label>City</label>
                                                        <input type="text" value={city} onChange={(e) => setCity(e.target.value)} name="city" maxLength={191} id="city"/>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <label>Province</label>
                                                        <input type="text" value={province} onChange={(e) => setProvince(e.target.value)} name="province" maxLength={191} id="province"/>
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
                                                </div>
                                            </form>
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

export default connect((state) => state)(EditProfile);