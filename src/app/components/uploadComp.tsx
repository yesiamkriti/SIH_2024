'use client'
import React, { useState } from "react";
import { Close } from "./ehraction";
import axios from "axios";
import './uploadComp.css';
interface UploadForm {
  issue: string;
  doctorName: string;
  consultedBy: string;
  file: string;
}

export default function UploadComponent() {
  const [uploadForm, setUploadForm] = useState<UploadForm>({
    issue: '',
    doctorName: '',
    consultedBy: '',
    file: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    if (name === 'file' && files && files.length > 0) {
      const file = files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result && typeof reader.result === "string") {
          setUploadForm((prevForm) => ({
            ...prevForm,
            file: reader.result // Safely assigning as a string
          }));
        }
      };
      reader.readAsDataURL(file); // Reading the file as Base64 string
    } else {
      setUploadForm((prevForm) => ({
        ...prevForm,
        [name]: value
      }));
    }
  };

  const handleFormSubmit = async () => {
    if (!uploadForm.issue || !uploadForm.doctorName || !uploadForm.consultedBy || !uploadForm.file) {
      alert('Please fill in all fields and select a file');
      return;
    }

    try {
      const response = await axios.post('/api/ehr/upload', uploadForm);
      console.log(response.data)
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="upload-form">
      <input
        type="text"
        name="issue"
        value={uploadForm.issue}
        placeholder="Issue"
        onChange={handleInputChange}
      />
      <input
        type="text"
        name="doctorName"
        value={uploadForm.doctorName}
        placeholder="Doctor Name"
        onChange={handleInputChange}
      />
      <input
        type="text"
        name="consultedBy"
        value={uploadForm.consultedBy}
        placeholder="Consulted By"
        onChange={handleInputChange}
      />
      <input
        type="file"
        name="file"
        onChange={handleInputChange}
        accept="application/pdf,image/jpeg,image/png"
      />
      <button onClick={handleFormSubmit}>Upload Report</button>
    </div>
  );
}
