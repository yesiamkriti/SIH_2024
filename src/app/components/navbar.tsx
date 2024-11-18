import Image from "next/image";
import './navbar.css';
import React, { useContext, useEffect, useState } from "react";
import { HamburgerMenu, AboutUsButton, HomeButton, ServicesButton, HospitalsButton, AppointmentsButton, ResourcesButton, ContactUs, FaqButton } from "./svg";
import Link from "next/link";
import axios from "axios";
import { ProfileContext } from "../profileContext";

export default function Navbar({ showLogo=true }) {
  const [isExpanded, setIsExpanded] = useState(false); // State to track if the menu is expanded
  const profileContext = useContext(ProfileContext);
  if (!profileContext) {
      throw new Error('ProfileContext is not provided');
    }
    const { profileData,setProfileData } = profileContext;

  useEffect(()=>{
    const getProfileData= async()=>{
      try{
          const response= await axios.get('/api/profile/patient');
          if(response.data.success){
             
              setProfileData((response.data.reports))
          }
      }catch(e){}
  }
  getProfileData();
  },[])
  console.log(profileData)
 

  const toggleMenu = () => {
    setIsExpanded(!isExpanded); // Toggle the menu state
  
  };

  return (
    <div className="side-navbar-cont" style={{width:`${isExpanded ? '100vw':''}`,backdropFilter:`${isExpanded ? 'blur(5px)':''}`}}>
      <div className={`side-navbar ${isExpanded ? "expanded" : ""}`}> {/* Toggle the class based on state */}
        <div className="ayuraksha-logo-cont">
        <Image
          src={!isExpanded ? '/ayuraksha-logo.svg' : '/ayuraksha-logo-full.svg'} // Use the logo state variable
          alt="Ayuraksha Logo"
          height={isExpanded ? 50: 80}
          width={isExpanded ? 190 : 50}
          priority
          className="ayuraksha-logo"
        />
        </div>
        <div className="hamburger-icon" onClick={toggleMenu}> {/* Click event to toggle the menu */}
          <div className="menu-item">
            <HamburgerMenu/>
            {isExpanded && <span className="icon-label">Menu</span>}
          </div>
        </div>
        
        {/* Icons and their labels (conditionally rendered) */}
        <Link href={'#'} className="menu-item">
          <AboutUsButton />
          {isExpanded && <span className="icon-label">About Us</span>}
        </Link>
        <Link href={'/'} className="menu-item">
          <HomeButton />
          {isExpanded && <span className="icon-label">Home</span>}
        </Link>
        <Link href={'#'} className="menu-item">
          <ServicesButton />
          {isExpanded && <span className="icon-label">Services</span>}
        </Link>
        <Link href={'#'} className="menu-item">
          <HospitalsButton />
          {isExpanded && <span className="icon-label">Hospitals</span>}
        </Link>
        <Link href={'/appointment'} className="menu-item">
          <AppointmentsButton />
          {isExpanded && <span className="icon-label">Appointments</span>}
        </Link>
        <Link href={'#'} className="menu-item">
          <ResourcesButton />
          {isExpanded && <span className="icon-label">Resources</span>}
        </Link>
        <Link href={'/contact'} className="menu-item">
          <ContactUs />
          {isExpanded && <span className="icon-label">Contact Us</span>}
        </Link>
        <Link href={'/faq'} className="menu-item">
          <FaqButton />
          {isExpanded && <span className="icon-label">FAQ</span>}
        </Link>
      </div>
    </div>
  );
}
