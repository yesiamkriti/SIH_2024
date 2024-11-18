import React, { useState, useEffect } from 'react';
import './ehr.css';
import { Download, Preview, Close, Printout } from './ehraction';
import axios from 'axios';
import UploadComponent from './uploadComp';
import CryptoJS from 'crypto-js';
import '@fontsource/poppins'
import UploadMedComponent from './uploadMedicine';


// Define the type for a report

function formatTimestamp(timestampStr: string): string {
  const timestamp = Number(timestampStr); // Convert the string timestamp to a number
  const date = new Date(timestamp); // Create a Date object from the timestamp

  const day = String(date.getDate()).padStart(2, '0'); // Get the day and pad with leading zero if needed
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Get the month (0-based index) and pad with leading zero
  const year = date.getFullYear(); // Get the full year

  return `${day}/${month}/${year}`; // Return in dd, mm, yyyy format
}
function convertIpfsUriToHttp(ipfsUri:any) {
  if (ipfsUri.startsWith('ipfs://')) {
    return ipfsUri.replace('ipfs://', 'https://rose-supposed-gamefowl-223.mypinata.cloud/ipfs/');
  }
  return ipfsUri; // Return the original URI if it's not IPFS format
}
function getMimeTypeFromBase64(base64String:string) {
  const mimeType = base64String.match(/^data:(.*);base64,/);
  return mimeType ? mimeType[1] : null;
}
export default function MedicineComponent({show}:any) {
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedReport, setSelectedReport] = useState('');
  const [report,setReport]=useState<Report[] | null>(null)
  const [showUploadModel,setUploadModel]=useState(false);
   const [uploadForm, setUploadForm] = useState({
    issue: '',
    doctorName: '',
    consultedBy: '',
    file: null,
  });

  // Function to handle the preview action
  const handlePreview = async(report:any) => {
    try{
      const httpUrl = convertIpfsUriToHttp(report[2]);
      const response = await fetch(httpUrl);
      const blob = await response.blob(); // Get the file as a Blob
      console.log(await blob.text())
      const mimeType = blob.type; // Get the MIME type of the blob
      if(!process.env.NEXT_PUBLIC_END_KEY){
        return
      }
      const content = CryptoJS.AES.decrypt(await blob.text(),process.env.NEXT_PUBLIC_END_KEY)
      console.log(content)
      const decryptedText = content.toString(CryptoJS.enc.Utf8);
      console.log(decryptedText)

      setSelectedReport(decryptedText);
    }catch(e){}
    setModalOpen(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setModalOpen(false);
    setSelectedReport('');
  };

  // Add an event listener for the Escape key
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeModal();
      }
    };

      const fetchReports= async() =>{
        try{
          const response= await axios.get('/api/medicine');
          if(response.data.success){
            setReport(response.data.reports.reverse())
          }
        }catch(e){}
      }
      fetchReports()
 

    // Add event listener
    document.addEventListener('keydown', handleKeyDown);

    // Cleanup event listener on unmount
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Dummy download function (replace with real logic)
  const mimeToExtensionMap: { [key: string]: string } = {
    'application/pdf': '.pdf',
    'image/jpeg': '.jpg',
    'image/png': '.png',
    'application/json': '.json',
    'text/plain': '.txt',
    // Add more MIME types and their corresponding extensions as needed
  };
  
  const handleDownload = async (ipfsUri: string) => {
    try {
      const httpUrl = convertIpfsUriToHttp(ipfsUri[2]); // Convert IPFS URI to HTTP

   
  
      // Fetch the file
      const response = await fetch(httpUrl);
      const blob = await response.blob(); // Get the file as a Blob
      console.log(await blob.text())
      const mimeType = blob.type; // Get the MIME type of the blob
      if(!process.env.NEXT_PUBLIC_END_KEY){
        return
      }
      const content = CryptoJS.AES.decrypt(await blob.text(),process.env.NEXT_PUBLIC_END_KEY)
  console.log(content)
  const decryptedText = content.toString(CryptoJS.enc.Utf8);
  const byteCharacters = atob(decryptedText.split(',')[1]); // Extract the Base64 string
  const byteNumbers = new Array(byteCharacters.length);
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }
  const byteArray = new Uint8Array(byteNumbers);
  const decryptedBlob = new Blob([byteArray], { type: `${getMimeTypeFromBase64(decryptedText)}` });

      // Determine the file extension based on the MIME type
      const extension = mimeToExtensionMap[`${getMimeTypeFromBase64(decryptedText)}`] || ''; // Default to an empty string if MIME type not mapped
      const url = window.URL.createObjectURL(decryptedBlob); // Create a download link
  
      // Create a temporary anchor element for downloading
      const a = document.createElement('a');
      a.href = url;
  
      // Set the filename dynamically with the correct extension
      a.download = `${ipfsUri[0]}${extension || '.bin'}`; // Fallback to '.bin' if extension is not recognized
      document.body.appendChild(a);
      a.click(); // Trigger the download
      a.remove(); // Clean up the DOM
    } catch (error) {
      console.error('Error downloading the file:', error);
    }
  };
  const handlePrint = async (ipfsUri: string) => {
    try {
      const httpUrl = convertIpfsUriToHttp(ipfsUri[2]); // Convert IPFS URI to HTTP

      const response = await fetch(httpUrl);
      const blob = await response.blob();
      const mimeType = blob.type;

      if(!process.env.NEXT_PUBLIC_END_KEY){
        return
      }
      const content = CryptoJS.AES.decrypt(await blob.text(),process.env.NEXT_PUBLIC_END_KEY)
  console.log(content)
  const decryptedText = content.toString(CryptoJS.enc.Utf8);
  const byteCharacters = atob(decryptedText.split(',')[1]); // Extract the Base64 string
  const byteNumbers = new Array(byteCharacters.length);
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }
  const byteArray = new Uint8Array(byteNumbers);
  const decryptedBlob = new Blob([byteArray], { type: `${getMimeTypeFromBase64(decryptedText)}` });
      // Determine the file extension based on the MIME type
      const extension = mimeToExtensionMap[`${getMimeTypeFromBase64(decryptedText)}`] || ''; // Default to an empty string if MIME type not mapped
      const url = window.URL.createObjectURL(decryptedBlob); // Create a download links

      // Open the file in a new tab for printing
      const newWindow = window.open(url, '_blank');
      if (newWindow) {
        newWindow.onload = () => {
          newWindow.print(); // Automatically trigger print when the window is loaded
        };
      }
    } catch (error) {
      console.error('Error printing the file:', error);
    }
  };
  

  return (
    <div className="ehr-main-cont">

     {show && <button className="upload-report-button" onClick={()=>setUploadModel(true)}>
          Upload Medicine
        </button>}
      <div className="ehr-list-cont">
        <table className="ehr-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Issue/Consult For</th>
              <th>Doctor Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          {(report) && <tbody>
            {report.map((report:any, index) => (
              <tr key={index}>
                <td>{formatTimestamp(report[0])}</td>
                <td>{report[3]}</td>
                <td>{report[1]}</td>
                <td>
                  <button className="btn-preview" onClick={() => handlePreview(report)}>
                    <Preview />
                  </button>
                  <button className="btn-download" onClick={() => handleDownload(report)}>
                    <Download />
                  </button>
                  <button className="btn-download" onClick={() => handlePrint(report)}>
                    <Printout />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>}
        </table>
      </div>

      {/* Modal for previewing the report */}
      {isModalOpen && selectedReport && (
        <div className="preview-popup-overlay">
          <div className="preview-popup-content">
            <h2>Preview of {selectedReport[1]} Report</h2>
            <button className="btn-close" onClick={closeModal}>
              <Close/>
            </button>
            <iframe src={selectedReport} width='800px' height='500px'/>
          </div>
        </div>
      )}

       {showUploadModel && 
               <div className="upload-report-cont">
               <button className="btn-close" onClick={() => setUploadModel(false)}>
                 <Close />
               </button>
               <UploadMedComponent/>
               </div>}
    </div>
  );
}
