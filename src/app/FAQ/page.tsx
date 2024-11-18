'use client';
import './style.css';
import '@fontsource/poppins';
import { useState } from 'react';

export default function FAQ() {
    const [openFAQ, setOpenFAQ] = useState<number | null>(null); // State type is number or null

    const toggleFAQ = (index: number) => { // Explicitly set 'index' as number
        setOpenFAQ(openFAQ === index ? null : index); // Toggle the clicked FAQ
    };

    return (
        <main className="faq-main">
            <div className="faq-section">
                <div className="faq-header">
                    <h1>FAQs</h1>
                    <p>Have questions about our healthcare services? <br/>Here you'll find answers to the most common questions patients ask, along with guidance on how to manage your health with us.</p>
                </div>
            </div>

            <div className="faq-question">
                <div className="about-section">
                    <h2>About Our Services</h2>
                    <ul>
                        <li><a href="#">Appointment Scheduling</a></li>
                        <li><a href="#">Telemedicine</a></li>
                        <li><a href="#">Medical Records Access</a></li>
                        <li><a href="#">Billing and Insurance</a></li>
                        <li><a href="#">Prescriptions and Refills</a></li>
                    </ul>
                </div>

                <div className="faq-items">
                    {/* FAQ Item 1 */}
                    <div className="faq-item">
                        <h3 onClick={() => toggleFAQ(1)}>
                            How do I book an appointment with a doctor?
                        </h3>
                        {openFAQ === 1 && (
                            <ul className="faq-subquestions">
                                <li>Can I schedule appointments online?</li>
                                <li>How far in advance can I book?</li>
                                <li>Can I book emergency consultations?</li>
                                <li>Is same-day booking available?</li>
                                <li>What information do I need to provide?</li>
                            </ul>
                        )}
                        <p>You can easily book appointments through our online portal, by phone, or using our mobile app.</p>
                    </div>

                    {/* FAQ Item 2 */}
                    <div className="faq-item">
                        <h3 onClick={() => toggleFAQ(2)}>
                            How does telemedicine work?
                        </h3>
                        {openFAQ === 2 && (
                            <ul className="faq-subquestions">
                                <li>What conditions can be treated via telemedicine?</li>
                                <li>How do I prepare for a virtual consultation?</li>
                                <li>What technology do I need?</li>
                                <li>Can I get prescriptions via telemedicine?</li>
                                <li>Is my telemedicine appointment confidential?</li>
                            </ul>
                        )}
                        <p>Telemedicine allows you to consult with our doctors from the comfort of your home through secure video calls.</p>
                    </div>

                    {/* FAQ Item 3 */}
                    <div className="faq-item">
                        <h3 onClick={() => toggleFAQ(3)}>
                            How can I access my medical records?
                        </h3>
                        {openFAQ === 3 && (
                            <ul className="faq-subquestions">
                                <li>Can I view my records online?</li>
                                <li>How can I request a copy of my records?</li>
                                <li>Who has access to my medical records?</li>
                                <li>Can I share my records with another doctor?</li>
                                <li>How long are my records stored?</li>
                            </ul>
                        )}
                        <p>Access your medical records securely through our patient portal or request physical copies from our office.</p>
                    </div>
                </div>
            </div>
        </main>
    );
}
