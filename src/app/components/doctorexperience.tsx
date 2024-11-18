'use state'
import './doctorexperience.css';
import Image from 'next/image';
export default function Doctorexperience() {
    return (
        <main>
            <div className="experience-main-cont">
                <div className="experience-heading">
                    <h1>Experience:</h1>
                </div>
                <div className="currenet-experience-heading">
                    <h3>Current Experience:</h3>
                </div>
                <div className="current-experience-details">
                    <p>Senior Cardiologist at HeartCare Hospital</p>
                    <ul>
                        <li>Duration: June 2021 - Present</li>
                    <Image src ={'/hospitalimage.svg'} priority alt='certificate' height={80} width={80}/>
                    </ul>
                </div>

                <div className="past-experience-heading">
                    <h3>Past Experience:</h3>
                </div>
                <div className="past-experience-details">
                    <p>Senior Cardiologist at HeartCare Hospital</p>
                    <ul  className='past-working-duration'>
                        <li>Duration: June 2021 - Present</li>
                    </ul>
                    <Image src ={'/hospitalimage.svg'} priority alt='certificate' height={80} width={80}/>
                </div>
            </div>
        </main>
    );
}