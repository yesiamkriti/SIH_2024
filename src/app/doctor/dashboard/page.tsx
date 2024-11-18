"use client"
import './style.css'
import DoctorProfile from '../profile/page';
import Navbar from '@/app/components/navbar';
import PatientsChart from '@/app/components/patientvisit';
// import Appointment from '../components/appointment';
import DoctorAppointment from '@/app/components/doctorappointment';

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