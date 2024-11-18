'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import './style.css';
import Image from 'next/image';
import Register from '../register/page';
import axios from 'axios';
import '@fontsource/poppins'
export default function Login() {
    const router = useRouter();
    const [isEmailVisible, setEmailVisible] = useState(false);
    const [aadhar,setAadar]=useState('');
    const [warning,setWarning]=useState('')
    const [timer, setTimer] = useState(0);
    const [otp,setOtp]=useState('')
    const [isOtpButtonDisabled, setIsOtpButtonDisabled] = useState(false);

    function validateNumber(input:any) {
        return !isNaN(input) && Number.isFinite(Number(input));
      }
    
    useEffect(() => {
        let interval: NodeJS.Timeout | null = null;
        if (timer > 0) {
            interval = setInterval(() => {
                setTimer((prevTimer) => prevTimer - 1);
            }, 1000);
        } else if (timer === 0 && isOtpButtonDisabled) {
            setIsOtpButtonDisabled(false);
        }

        return () => {
            if (interval) {
                clearInterval(interval);
            }
        };
    }, [timer, isOtpButtonDisabled]);
    const handleGetOtp = async () => {
        if(!validateNumber(aadhar)){
            setWarning('Aadhar Number should be digit not alphabet')
            setTimeout(() => {
                setWarning('');
            }, 3000); 
            return  ;
        }
        if(aadhar.length !== 12){
            setWarning('Aadhar Number should be 12 digit')
            setTimeout(() => {
                setWarning('');
            }, 3000); 
            return  ;
        }
       
        if(aadhar){
        try{
            const response =await axios.post('/api/getotp/login',{aadhar:aadhar})
            if(response.data.success){
                setTimer(60);
                setIsOtpButtonDisabled(true)

            }
            if(response.data.message === 'Aadhar not found'){
                setWarning('Invalid Aadhar Number')
                setTimeout(() => {
                    setWarning('');
                }, 3000); 
            }
            if(response.data.message === 'name not matched'){
                setWarning('Please check your name not matched with Aadhar')
                setTimeout(() => {
                    setWarning('');
                }, 3000); 
            }
           
        }catch(e){}
    }
    else{
        setWarning('Fill the form first')
        setTimeout(() => {
            setWarning('');
        }, 3000); 
    }
        
    };

    const handleLogin = async ()=>{
        if(otp.length !==6){
            setWarning('otp must be 6 digit')
            setTimeout(() => {
                setWarning('');
            }, 3000); 
        }
        try{
            const response = await axios.post('/api/login',{aadhar:aadhar,otp:otp});
            if(response.data.success){
                router.push('/profile')
            }
        }catch(e){

        }
    }

    return (
        <main className="login-main">
            <div className="login-image">
                <Image src={'/login-image.svg'} alt="logo" height={1000} width={1000} priority className="login-image-main" />
            </div>
            <div className="login-form">
                <div className="login-heading">
                    <h1>Login</h1>
                    <hr className="login-underline" />
                </div>
                <div className="login-user-input">
                {warning &&<p style={{color:'red',fontWeight:'bold'}}>{warning}</p>}
                    {isEmailVisible && <p className="login-email">Adhar Number</p>}
                    <br />
                    <input
                        type="text"
                        className="user-email"
                        placeholder={isEmailVisible ? "" : "Adhar Number"}
                        onClick={() => setEmailVisible(true)}
                        onBlur={() => setEmailVisible(false)}
                        onChange={(e)=>setAadar(e.target.value)}
                    />
                    <hr className="email-underline" />
                </div>
                {(isOtpButtonDisabled) &&<div className="login-user-input">
                    <input
                        type="text"
                        className="user-email"
                        placeholder='OTP'
                        onChange={(e)=>setOtp(e.target.value)}
                    />
                    <hr className="email-underline" />
                    <p>Resend otp in {timer}s</p>
                </div>}
                <div className='register-button-cont'>
                    {(isOtpButtonDisabled)?<button className="register-button" onClick={handleLogin}>Login</button>:<button className="register-button"  onClick={handleGetOtp}>Get Otp</button>}
    
                    <p className='dont-have-account'>Don't have account?</p>
                    <button className="register-button" onClick={() => router.push('/register')}>Register</button>
                </div>
            </div>
        </main>
    );
}
 