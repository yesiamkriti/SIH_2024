"use client"
import Image from "next/image";
import "./style.css";
import '@fontsource/poppins'
import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import axios from 'axios'
import { useRouter } from "next/navigation";

interface FormData {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    aadhar: string;
    otp: string;
}

export default function Register() {
    const [formData, setFormData] = useState<FormData>({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        aadhar: "",
        otp: "",
    });
    const [timer, setTimer] = useState(0);
    const [isOtpButtonDisabled, setIsOtpButtonDisabled] = useState(false);
    const [warning,setWarning]=useState('')
    const router =useRouter();
    const verifyForm= formData.aadhar && formData.email && formData.firstName && formData.lastName && formData.phone;

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

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async(e: FormEvent) => {
        if(verifyForm && formData.otp && formData.otp.length===6){
            if(!(formData.aadhar.length === 12)) {setWarning('aadhar number should be 12 digits')
                setTimeout(() => {
                    setWarning('');
                }, 3000);
            };
            if(!(formData.phone.length === 10)) {setWarning('mobile number should be 10 digits')
                setTimeout(() => {
                    setWarning('');
                }, 3000);
            };
        e.preventDefault();
        try{
            const res =await axios.post('/api/register',formData);
            if(res.data.success){setWarning('');router.push('/login')}
            else{setWarning((timer?`${res.data.message}`:' Invalid otp'))
                setTimeout(() => {
                setWarning('');
            }, 3000);}
        }catch(e){}
        }
        else{
            setWarning('Please fill out all the fields')
            setTimeout(() => {
                setWarning('');
            }, 3000);
        }
    };

    const handleGetOtp = async (e: FormEvent) => {
        e.preventDefault();
        if(verifyForm && formData.email){
        try{
            const response =await axios.post('/api/getotp',formData)
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

    return (
        <main className="register-main">
            <form className="register-form" onSubmit={handleSubmit}>
                <div className="register-headContainer">
                    <h1 className="register-heading">Registration
                        <div className="register-roundLine" />
                    </h1>
                    
                    {warning &&<p style={{color:'red',fontWeight:'bold'}}>{warning}</p>}
                </div>
                <input
                    type="text"
                    className="register-input"
                    placeholder="First Name"
                    name="firstName"
                    onChange={handleChange}
                    value={formData.firstName}
                />
                <input
                    type="text"
                    className="register-input"
                    placeholder="Last Name"
                    name="lastName"
                    onChange={handleChange}
                    value={formData.lastName}
                />
                <input
                    type="email"
                    className="register-input"
                    placeholder="Email"
                    name="email"
                    onChange={handleChange}
                    value={formData.email}
                />
                <input
                    type="tel"
                    className="register-input"
                    placeholder="Phone Number"
                    name="phone"
                    onChange={handleChange}
                    value={formData.phone}
                />
                <input
                    type="number"
                    className="register-input"
                    placeholder="Licence no."
                    name="aadhar"
                    onChange={handleChange}
                    value={formData.aadhar}
                />
                <input
                    type="number"
                    className="register-input"
                    placeholder="OTP"
                    name="otp"
                    onChange={handleChange}
                    value={formData.otp}
                />
               {(!isOtpButtonDisabled)? <button
                    type="button"
                    className="register-input register-otp_button"
                    onClick={handleGetOtp}
                >
                    Get OTP
                </button>:<p className="register-timer-text">Resend Otp in {timer}s</p>}
                <button
                    type="submit"
                    className="register-input register-submit_button"
                    disabled={!(verifyForm)}
                >
                    Submit
                </button>
            </form>
            <div className="register-image">
                <Image
                    src={'/login-image.svg'}
                    priority
                    alt="logo"
                    height={1000}
                    width={1000}
                    className="register-logo"
                />
            </div>
        </main>
    );
}