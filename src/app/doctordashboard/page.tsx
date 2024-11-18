"use client"
import './style.css'
import DoctorProfile from "../components/doctorprofile";
import Navbar from "../components/navbar";
import PatientsChart from "../components/patientvisit"
// import Appointment from '../components/appointment';
import DoctorAppointment from '../components/doctorappointment';

export default function DoctorDashboard(){
    return(
        <main>
            <Navbar/>
            <div className="doctor-dashboard-main-cont">
            <div className="patients-chart-cont">
            <DoctorProfile/>
            <PatientsChart/>
            </div>
            <div className='doctor-appointment-cont'>
            <DoctorAppointment/>
            </div>
            </div>
        </main>
    );
}