'use client'
import { use } from "react";
import './style.css';
import Navbar from "@/app/components/navbar";
import DoctorProfile from "@/app/components/doctorprofile";
import Doctorceritificate from "@/app/components/doctorcertificate";
import Doctorexperience from "@/app/components/doctorexperience";
import DoctorAppointment from "@/app/components/doctorappointment";
export default function Doctorprofile() {
    return (
        <main>
            <Navbar />
            <div className="doctor-profile-main-cont">
                <div className="doctor-profile-left-cont">
                    <div className="doctor-profile-cont">
                        <DoctorProfile/>
                    </div>&nbsp;
                    <div className="doctor-certificate-cont">
                        <Doctorceritificate />
                    </div>
                </div>
                <div className="doctor-profile-right-cont">
                    <div className="doctor-experience-cont">
                        <Doctorexperience/>
                    </div>
                </div>
                <div className="doctor-appointment-cont">
                    <DoctorAppointment/>
                </div>
            </div>
        </main>
    );
}