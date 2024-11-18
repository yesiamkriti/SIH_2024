"use client"
import Navbar from "../components/navbar";
import AppointmentStatus from "../components/appointmentStatus";
import '@fontsource/poppins'
import Appointment from "../components/appointment";
export default function Appointments() {
    return (
        <main>
            <Navbar/>
            <Appointment/>
        </main>
    );
}