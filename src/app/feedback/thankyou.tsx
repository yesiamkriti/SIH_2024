'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import "./style.css";

export const ThankYouPage = () => {
  const router = useRouter();

  useEffect(() => {
    // Redirect to homepage after 5 seconds
    const timer = setTimeout(() => {
      router.push('/');
    }, 5000);

    return () => clearTimeout(timer); // Clear timeout if the component unmounts
  }, [router]);

  return (
    <div className="thankyou-container">
      <h1>Thank You for Your Feedback!</h1>
      <p>You will be redirected to the homepage shortly.</p>
    </div>
  );
};

export default ThankYouPage;
