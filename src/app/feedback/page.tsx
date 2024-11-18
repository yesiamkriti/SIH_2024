'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import './style.css';

const FeedbackPage = () => {
  const [option, setOption] = useState('doctor');
  const [doctorUid, setDoctorUid] = useState('');
  const [hospitalName, setHospitalName] = useState('');
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [rating, setRating] = useState(0);
  const [error, setError] = useState(''); // Track error messages
  const router = useRouter(); // Use Next.js router for redirection

  const handleOptionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setOption(e.target.value);
    setError(''); // Reset error on option change
  };

  const handleRatingChange = (index: number) => {
    setRating(index);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!subject || !description || rating === 0 || (option === 'doctor' && !doctorUid) || (option === 'hospital' && !hospitalName)) {
      setError('Please fill out all fields before submitting.');
      return;
    }

    const feedbackData = {
      option,
      doctorUid: option === 'doctor' ? doctorUid : undefined,
      hospitalName: option === 'hospital' ? hospitalName : undefined,
      subject,
      description,
      rating,
    };

    try {
      const response = await fetch('/api/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(feedbackData),
      });

      if (response.ok) {
        // Redirect to thank you page
        router.push('/thank-you');
      } else {
        console.error('Failed to submit feedback');
        setError('Failed to submit feedback. Please try again later.');
      }
    } catch (error) {
      console.error('Error submitting feedback:', error);
      setError('An error occurred. Please try again later.');
    }
  };

  return (
    <div>
      <div className='feedback-container'>
        <h1 style={{ textAlign: 'center' }}>Feedback Form</h1>

        {error && <p className="error-message">{error}</p>} {/* Display error message */}

        <form onSubmit={handleSubmit}>
          <label>
            <b>Options:</b>
            <select value={option} onChange={handleOptionChange} className='feedback-input'>
              <option value="doctor">Doctor</option>
              <option value="hospital">Hospital</option>
            </select>
          </label>

          {option === 'doctor' ? (
            <label>
              <b>Doctor UID:</b>
              <input
                type="text"
                placeholder="Enter UID"
                className='feedback-input'
                value={doctorUid}
                onChange={(e) => setDoctorUid(e.target.value)}
              />
            </label>
          ) : (
            <label>
              <b>Hospital Name:</b>
              <input
                type="text"
                placeholder="Enter Hospital Name"
                className='feedback-input'
                value={hospitalName}
                onChange={(e) => setHospitalName(e.target.value)}
              />
            </label>
          )}

          <label>
            <b>Subject:</b>
            <input
              type="text"
              placeholder="Subject"
              className='feedback-input'
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
          </label>

          <label>
            <textarea
              placeholder="Description"
              className='feedback-textarea'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </label>

          <div className='feedback-stars'>
            {[1, 2, 3, 4, 5].map((index) => (
              <span
                key={index}
                onClick={() => handleRatingChange(index)}
                className={index <= rating ? 'feedback-filledStar' : 'feedback-emptyStar'}
              >
                ★
              </span>
            ))}
          </div>

          <button type="submit" className='feedback-button'>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default FeedbackPage;
