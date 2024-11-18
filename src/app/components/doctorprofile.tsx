'use client'
import './doctorprofile.css'
import Image from 'next/image';

export default function DoctorProfile() {
    return (
        <main>
            <div className="doctorprofile-main-cont">
                <div className="doctorprofile-heading-cont">
                    <h1 className='doctorprofile-heading'>Profile</h1>
                </div>
                <div className="doctorprofile-content-cont">
                    <div className="doctor-profile-photo">
                        <Image src={'/profile-image.svg'} priority alt="Photo" height={140} width={140} />
                    </div>
                    <div className="doctor-description">
                        <div className="doctor-name-cont">
                            <p className='doctor-name-heading'>Name: </p> &nbsp;&nbsp;&nbsp;
                            <p className="doctor-name">Dr. Ram</p>
                        </div>
                        <div className="doctor-speciality-cont">
                            <p className='doctor-speciality'>Doctor Speciality: </p>&nbsp;&nbsp;&nbsp;
                            <p className='speciality-name'>ENT</p>
                        </div>
                        <div className="doctor-number-cont">
                            <p className='number'>Number: </p>&nbsp;&nbsp;&nbsp;
                            <p className='doctor-number'>+91 1234567890</p>
                        </div>
                        <div className="current-working-place-cont">
                            <p className='current-working-place'>Current Working Place: </p>&nbsp;&nbsp;&nbsp;
                            <p className='current-working-place-name'>Civil Hospital</p>
                        </div>
                        <div className="woking-experience-cont">
                            <p className='working-experience-title'>Working Expereience: </p>&nbsp;&nbsp;&nbsp;
                            <p className='working-experience-year'>5 Years</p>
                        </div>
                        <div className="certificates-cont">
                            <p className='certificates-title'>Certificates: </p>&nbsp;&nbsp;&nbsp;
                            <p className='certificates'>asdvb</p>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}