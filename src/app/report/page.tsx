"use client"
import Navbar from "../components/navbar";
import Ehr from "../components/ehr";
import '@fontsource/poppins'
import './style.css'
// import './style.css'
export default function Reports() {
    return (
        <main className="report-main">
            <Navbar />
        <h1 className="ehr-heading">EHR (Electronic Health Record)</h1>
        <div className="report-cont">

            <Ehr show={true}/>
        </div>
        </main>
    )
}