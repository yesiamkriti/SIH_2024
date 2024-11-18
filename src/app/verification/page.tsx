'use client';

import { useState, ChangeEvent, useEffect, useContext } from 'react';
import './style.css';
import Image from 'next/image';
import '@fontsource/poppins'
import { useRouter, useSearchParams } from 'next/navigation';
import axios from 'axios';
import { ProfileContext } from '../profileContext';
export default function Verification() {
    const searchParams=useSearchParams();
    const email = searchParams.get('id');
    const [otp, setOtp] = useState('');
    const [isOtpVisible, setOtpVisible] = useState(false);
    const [timer,setTimer]=useState(60);
    const profileContext = useContext(ProfileContext);
    if (!profileContext) {
        throw new Error('ProfileContext is not provided');
      }
      const { profileData, setProfileData } = profileContext;
    const router=useRouter();
    useEffect(() => {
        let interval: NodeJS.Timeout | null = null;
        if (timer > 0) {
            interval = setInterval(() => {
                setTimer((prevTimer) => prevTimer - 1);
            }, 1000);
        } else if (timer === 0) {
            router.push('/login');
        }

        return () => {
            if (interval) {
                clearInterval(interval);
            }
        };
    }, [timer]);

    const handleOtpChange = (e: ChangeEvent<HTMLInputElement>) => {
        setOtp(e.target.value);
    };

    const handleVerify = async() => {
        if(otp){
            try{
                const response = await axios.post('/api/login',{email:email,otp:otp})
                if(response.data.success){
                  setProfileData(response.data.profile_data)
                  setTimeout(() => {
                    router.push('/profile');
                }, 1000);
                }else if(response.data.message){
                    alert(response.data.message);
                }
            }catch(e){

            }
        }
    };
    return (
        <main className="verification-main">
            <div className="verification-form">
                <div className="verification-headContainer">
                    <div className="verification-heading">
                        <h1>Verification</h1>
                        <hr className="verification-roundLine" />
                    </div>

                    <div className="otp-input">
                        {timer && <p style={{color:'red',fontWeight:'bold'}}>otp expired in {timer}s</p>}
                        {isOtpVisible && <p className="otp-label">Enter OTP</p>}
                        <br />
                        <input
                            type="text"
                            className="verification-input"
                            value={otp}
                            onChange={handleOtpChange}
                            placeholder={isOtpVisible ? "" : "Enter OTP"}
                            onClick={() => setOtpVisible(true)}
                            onBlur={() => setOtpVisible(false)}
                        />
                        <hr className="otp-underline" />
                    </div>

                    <div className='verification-submit_button-cont'>
                        <button type="button" className="verification-submit_button" onClick={handleVerify}>Verify</button>
                    </div>
                </div>
            </div>

            <div className="verification-image">
                <Image src={'/login-image.svg'} alt="verification" height={1000} width={1000} priority className="verification-logo" />
            </div>
        </main>
    );
}