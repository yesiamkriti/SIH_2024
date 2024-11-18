"use client";  // Ensures the code runs on the client side
import React, { useState, useEffect, useContext } from "react";  // Import React hooks
import Image from "next/image";
import "./style.css";
import "@fontsource/poppins";
import axios from "axios";
import Navbar from "./components/navbar";
import TopBar from "./components/topbar";


export default function PatientDashboard() {
    return (
        <main className="home-main">
            <Navbar showLogo={false} />
            <TopBar />
            <div  className="home-sub-cont">
                <div className="home-sub-heading">
                    <h1>“For your health, we stand with pride, with accurate info right by your side”</h1>
                    <button className="home-sub-button">About Us</button>
                </div>
                <div className="home-heading-image">
                    <Image
                        src={'/Laptop-Image.svg'}
                        priority
                        alt="logo"
                        height={900}
                        width={1000}
                        className="home-heading-image-position"
                    />
                </div>
            </div>
            <div  className="home-sub-cont home-no-bg">
                <div>
                    <h1>Features</h1>
                </div>
                <div className="home-roundLine" />
                <div className="home-features-outer-box">
                    <div className="home-features-inner-box"></div>
                    <div className="home-features-inner-box"></div>
                    <div className="home-features-inner-box"></div>
                </div>
            </div>
        </main>
    );
}