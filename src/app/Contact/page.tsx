'use client';
import './style.css';
import Image from 'next/image';
import { useState } from 'react';
import '@fontsource/poppins';

export default function Contact() {
    const [showContactDetails, setShowContactDetails] = useState(false);

    const handleContactClick = () => {
        setShowContactDetails(!showContactDetails);
    };

    return (
        <main className="contact-main">
            <div className="contact-section">
                <div className="contact-info">
                    <h1>Contact Us</h1>
                    <p>We’re here to help! Get in touch with us through any of the channels below for quick support.</p>
                    <button onClick={handleContactClick} className="btn">
                        Contact
                    </button>

                    {showContactDetails && (
                        <div className="contact-details">
                            <p><strong>Address:</strong> 1234 Andherinagar, Style City, NNKK 56432</p>
                            <p><strong>Helpline Number:</strong> XXXX-123-4567</p>
                        </div>
                    )}
                </div>
                <div className="contact-image">
                    <Image
                        src={'/contact-image.svg'}
                        alt="Contact Illustration"
                        height={500}
                        width={500}
                        priority
                        className="contact-image-main"
                    />
                </div>
            </div>
        </main>
    );
}
