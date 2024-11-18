"use client";  // Ensures the code runs on the client side
import React, { useState, useEffect, useContext } from "react";  // Import React hooks
import Image from "next/image";
import "./style.css";
import "@fontsource/poppins";
import axios from "axios";
import { ProfileContext } from "../profileContext";
import Navbar from "../components/navbar";
import PatientAppointment from '../components/patientappointment';
import Ehr from "../components/ehr";
import MedicineComponent from "../components/medicineComp";


export default function PatientDashboard() {
    // State to control modal visibility
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Function to open modal
    const openModal = () => {
        setIsModalOpen(true);
    };

    // Function to close modal
    const closeModal = () => {
        setIsModalOpen(false);
    };

    // Close modal when clicking outside of it
    useEffect(() => {
        // Add 'MouseEvent' type to the event parameter
        const handleOutsideClick = (event: MouseEvent) => {
            const modal = document.getElementById("miniModal");
            // Use `event.target` as a type-safe element
            if (modal && !modal.contains(event.target as Node) && (event.target as HTMLElement).id !== "openModalBtn") {
                setIsModalOpen(false);
            }
        };
        // Add event listener for clicks
        window.addEventListener("click", handleOutsideClick);
        return () => {
            // Cleanup the event listener on component unmount
            window.removeEventListener("click", handleOutsideClick);
        };
    }, []);
    return (
        <main className="patient-dashboard-main">
            <Navbar />
            <div className="patient-dashboard-main-container">
                <div className="patient-dashboard-headContainer">
                    <h1 className="patient-dashboard-heading">Dashboard
                        <div className="patient-dashboard-roundLine" />
                    </h1>
                </div>
                <div className="patient-dashboard-details-cont">
                    <div className="patient-dashboard-contact-details-cont patient-dashboard-box-border">
                        <div className="patient-dashboard-image-name">
                            <div className="patient-dashboard-photo">
                                <Image
                                    src={'profile-image.svg'}
                                    priority
                                    alt="photo"
                                    height={140}
                                    width={140}
                                    className="patient-dashboard-photo-class"
                                />
                            </div>
                            <div className="patient-dashboard-name">
                                <h1 className="patient-dashboard-class-pink">Ms. Neha</h1>
                            </div>
                        </div>
                        <div className="patient-dashboard-emergency-contact">
                            <div>
                                <h2>Contact Details:</h2>
                                <div className="patient-dashboard-emergency-contact-heading">Emergency contact</div>
                                <div className="patient-dashboard-number patient-dashboard-class-pink">
                                    <Image
                                        src={'icon-Phone.svg'}
                                        priority
                                        alt="photo"
                                        height={20}
                                        width={20}
                                        className="patient-dashboard-photo-phone"
                                    /> &nbsp;1234567898
                                </div>
                                <div className="patient-dashboard-number patient-dashboard-class-pink">
                                    <Image
                                        src={'icon-house.svg'}
                                        priority
                                        alt="photo"
                                        height={20}
                                        width={20}
                                        className="patient-dashboard-photo-house"
                                    /> &nbsp;Jalandhar
                                </div>
                            </div>
                            <div>
                            <h2>Age:</h2>
                            <div className="patient-dashboard-number patient-dashboard-class-pink">
                                20
                            </div>
                            </div>
                        </div>
                    </div>
                    <div className="patient-dashboard-info-cont">
                        <h3 className="patient-dashboard-class-pink patient-dashboard-personl-info-heading">APPOINTMENTS</h3>
                        <div className="patient-dashboard-patient-appointments">
                            <PatientAppointment/>
                        </div>
                    </div>

                </div>
                <div className="ehrd-cont">
                    <h2>EHR</h2>
                    <Ehr/>
                    </div>
                    <br/>
                <div className="ehrd-cont">
                    <h2>Medication</h2>
                  <MedicineComponent/>
                    </div>
            </div>
        </main>
    );
}